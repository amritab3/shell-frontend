"use client";

import * as crypto from "crypto";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import {
  Avatar,
  Divider,
  Grid,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@/components/Button";
import { RootState } from "@/redux/store";
import URLS from "@/utils/urls";
import withAuth from "@/hoc/withAuth";
import { removeCartItem } from "@/redux/features/cartSlice";
import { openToast } from "@/redux/features/toastSlice";
import { CartItem } from "@/utils/schema";

interface CartItemToShow {
  id: string;
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
  const userId = useSelector((state: RootState) => state.user.userID);
  const dispatch = useDispatch();

  const deliveryCharge: number = 100;

  useEffect(() => {
    const cart = cartItems.map((cartItem: CartItem) => {
      return {
        id: cartItem.id,
        quantity: cartItem.quantity,
        size: cartItem.size,
        price: cartItem.product.price,
        name: cartItem.product.name,
        imageUrl: cartItem.product.images[0].image,
      };
    });
    setCartToShow(cart as CartItemToShow[]);
  }, [cartItems]);

  useEffect(() => {
    const subTotal = cartToShow.reduce(
      (total, { price, quantity }) => total + quantity * price,
      0,
    );

    setSubTotalPrice(subTotal);
    setTotalPrice(subTotal + deliveryCharge);
  }, [cartToShow]);

  const onClickCheckout = () => {
    const productsForOrder = cartItems.map((cartItem: CartItem) => ({
      product: cartItem.product.id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    const orderItem = {
      amount: subTotalPrice,
      products: productsForOrder,
    };

    fetch(URLS.CREATE_ORDER, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderItem),
    })
      .then(async (orderResp: any) => {
        const orderRespData = await orderResp.json();
        esewaCall(orderRespData["paymentFormData"]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const esewaCall = (paymentFormData: any) => {
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    paymentFormData["signature"] = createSignature(
      `total_amount=${paymentFormData["total_amount"]},transaction_uuid=${paymentFormData["transaction_uuid"]},product_code=EPAYTEST`,
    );

    console.log("Form Data: ", paymentFormData);

    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (let key in paymentFormData) {
      let hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", paymentFormData[key].toString());
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const createSignature = (message: string) => {
    const secret = "8gBm/:&EnhH.1/q";

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(message);

    return hmac.digest("base64");
  };

  const deleteItemFromCart = async (cartItemId: string) => {
    const cartItemDeleteUrl = new URL(
      URLS.DELETE_CART_ITEM.replace(":userId", userId),
    );
    cartItemDeleteUrl.search = new URLSearchParams({
      id: cartItemId,
    }).toString();

    const cartItemDeleteResp = await fetch(cartItemDeleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });

    if (cartItemDeleteResp.ok) {
      dispatch(removeCartItem(cartItemId));
      dispatch(
        openToast({
          message: "Cart item deleted successfully",
          severity: "success",
        }),
      );
    }
  };

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
                <ListItem key={cartItem.id}>
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
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteItemFromCart(cartItem.id)}
                      >
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
          <Button
            label="Checkout and pay with eSewa"
            fullWidth
            variant="contained"
            onClick={onClickCheckout}
          />
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

export default withAuth(ViewCart);
