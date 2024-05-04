"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import {
  Divider,
  Grid,
  Typography,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@/components/Button";
import { RootState } from "@/redux/store";
import URLS from "@/utils/urls";

interface CartItemToShow {
  quantity: number;
  size: string;
  name: string;
  imageUrl: string;
  price: number;
}

const ViewCart = () => {
  const [subTotalPrice, setSubTotalPrice] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [cartToShow, setCartToShow] = React.useState<Array<CartItemToShow>>([]);

  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const userAccessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );

  const deliveryCharge: number = 100;

  if (!isLoggedIn) {
    router.push("/login");
  }

  useEffect(() => {
    const cart = cartItems.map(async (cartItem) => {
      try {
        const response = await fetch(
          `${URLS.PRODUCTS_URL}/${cartItem.product}`,
          {
            method: "GET",
          },
        );
        const respBody = await response.json();
        return {
          quantity: cartItem.quantity,
          size: cartItem.size,
          price: respBody.price,
          name: respBody.name,
          imageUrl: respBody.images[0].image,
        };
      } catch (error) {
        console.log("Error: ", error);
      }
    });

    Promise.all(cart).then((res) => {
      setCartToShow(res as Array<CartItemToShow>);
    });
  }, [cartItems]);

  useEffect(() => {
    const subTotal = cartToShow.reduce(
      (total, { price, quantity }) => total + quantity * price,
      0,
    );

    setSubTotalPrice(subTotal);
    setTotalPrice(subTotal + deliveryCharge);
  }, [cartToShow]);

  return (
    <Grid container item xs={12} marginX={4}>
      <Grid container item xs={9} direction={"column"} spacing={3}>
        <Grid item>
          <Typography variant="h4" component="h5" sx={{ fontWeight: "bold" }}>
            Cart
          </Typography>
        </Grid>
        <Grid item flex={1}>
          <List>
            <ListItem>
              <Grid container justifyContent="space-between">
                <Grid item xs={6}>
                  <ListItemText
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      "& span": { fontWeight: "bold" },
                    }}
                    primary="Products"
                  />
                </Grid>

                <Grid item xs={2}>
                  <ListItemText
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      "& span": { fontWeight: "bold" },
                    }}
                    primary="Quantity"
                  />
                </Grid>

                <Grid item xs={2}>
                  <ListItemText
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      "& span": { fontWeight: "bold" },
                    }}
                    primary="Total"
                  />
                </Grid>

                <Grid item xs={2}>
                  <ListItemText
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      "& span": { fontWeight: "bold" },
                    }}
                    primary="Actions"
                  />
                </Grid>
              </Grid>
            </ListItem>

            {cartToShow.map((cartItem, index) => {
              const totalPriceForAnItem = cartItem.quantity * cartItem.price;
              return (
                <ListItem key={index}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid container item xs={6} alignItems="center">
                      <ListItemAvatar>
                        <Avatar
                          alt="Image"
                          src={cartItem.imageUrl}
                          sx={{ width: 80, height: 90, borderRadius: 0 }} // Adjust width and height as needed
                        />
                      </ListItemAvatar>
                      <ListItemText sx={{ ml: 2 }} primary={cartItem.name} />
                    </Grid>
                    <Grid item xs={2}>
                      <ListItemText primary={cartItem.quantity} />
                    </Grid>

                    <Grid item xs={2}>
                      <ListItemText primary={`Rs. ${totalPriceForAnItem}`} />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon sx={{ color: "#D11A2A" }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={3}
        sx={{
          padding: 2,
          height: "250px",
          fontSize: "medium",
          bgcolor: "white",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" component="h5" sx={{ fontWeight: "medium" }}>
            Order Summary
          </Typography>
        </Grid>
        <Divider style={{ width: "100%" }} />
        <Grid container item xs={12} justifyContent="space-between">
          <Typography
            variant="h6"
            component="h5"
            sx={{ letterSpacing: 1, fontSize: "14px" }}
          >
            Delivery Charge
          </Typography>
          <Typography variant="h6" component="h5">
            Rs. {deliveryCharge}
          </Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="space-between">
          <Typography
            variant="h6"
            component="h5"
            sx={{ letterSpacing: 1, fontSize: "14px" }}
          >
            Subtotal
          </Typography>
          <Typography variant="h6" component="h5">
            Rs. {subTotalPrice}
          </Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="space-between">
          <Typography
            variant="h6"
            component="h5"
            sx={{ letterSpacing: 1, fontSize: "14px" }}
          >
            Total
          </Typography>
          <Typography variant="h6" component="h5">
            Rs. {totalPrice}
          </Typography>
        </Grid>
        <Grid container item gap={2} marginTop={2}>
          <Button label="Proceed to checkout" fullWidth variant="contained" />
          <Button
            label="Continue Shopping"
            fullWidth
            variant="contained"
            onClick={() => router.push("/")}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewCart;
