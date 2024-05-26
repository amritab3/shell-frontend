"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider, Paper, TextField, Avatar } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";

import Input from "@/components/Input";
import { RootState } from "@/redux/store";
import URLS from "@/utils/urls";
import { ChatRoomType, ChatMessageType } from "@/utils/schema";
import withAuth from "@/hoc/withAuth";

const ChatWithSeller = () => {
  const [message, setMessage] = useState("");
  const webSocketRef = useRef<WebSocket | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [messages, setMessages] = useState<Array<ChatMessageType>>([]);

  const fromId = useSelector((state: RootState) => state.misc.chatFromId);
  const toId = useSelector((state: RootState) => state.misc.chatToId);
  const userAccessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );

  const [chatReceiver, setChatReceiver] = useState(toId);

  useEffect(() => {
    fetch(URLS.GET_USER_CHAT_ROOMS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const responseData: ChatRoomType[] = await response.json();
          setChatRooms(responseData);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  useEffect(() => {
    const webSocket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/from/${fromId}/to/${chatReceiver}`,
    );
    webSocketRef.current = webSocket;

    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.on_connect) {
        fetch(URLS.GET_ROOM_MESSAGES.replace(":roomID", data.room), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        }).then(async (res) => {
          if (res.ok) {
            const existingMessages = await res.json();
            setMessages(existingMessages);
          }
        });
      }
      console.log("Message Data: ", data);
    };
  }, [fromId, chatReceiver, userAccessToken]);

  const sendChatMessage = () => {
    if (message) {
      const chatMessage = {
        message: message,
        sender: fromId,
      };
      webSocketRef.current?.send(JSON.stringify(chatMessage));
    }
  };

  const selectChat = () => {};

  return (
    <Grid container item sx={{ marginX: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        component={Paper}
        sx={{ width: "100%", height: "80vh" }}
      >
        <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {chatRooms.map((chatRoom: ChatRoomType) => (
              <ListItemButton key={chatRoom.id} onClick={selectChat}>
                <ListItemIcon>
                  <Avatar
                    alt={chatRoom.receiver.name}
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary={chatRoom.receiver.name}>
                  {chatRoom.receiver.name}
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List sx={{ height: "70vh", overflowY: "auto" }}>
            {messages.map((existingMessage: ChatMessageType) => (
              <ListItem key={existingMessage.id}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      sx={{
                        textAlign:
                          existingMessage.sender === fromId ? "right" : "left",
                      }}
                      primary={existingMessage.message}
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      sx={{
                        textAlign:
                          existingMessage.sender === fromId ? "right" : "left",
                      }}
                      secondary={existingMessage.timestamp}
                    ></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container>
            <Grid item xs={11}>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message..."
                label={"Type Something"}
              />
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fab color="primary" aria-label="add" onClick={sendChatMessage}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withAuth(ChatWithSeller);
