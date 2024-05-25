"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Button from "@/components/Button";
import { decodeFromBase64 } from "next/dist/build/webpack/loaders/utils";

import {
  EsewaPaymentSuccessResponse,
  PaymentOrderDetails,
} from "@/utils/schema";
import URLS from "@/utils/urls";
import { openToast } from "@/redux/features/toastSlice";
import { RootState } from "@/redux/store";

const PaymentSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [dataFromEsewa, setDataFromEsewa] =
    useState<EsewaPaymentSuccessResponse>();
  const [orderDetails, setOrderDetails] = useState<PaymentOrderDetails>();

  const accessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );

  useEffect(() => {
    const esewaResponse = searchParams.get("data");
    const decodedData: EsewaPaymentSuccessResponse = decodeFromBase64(
      esewaResponse!,
    );
    setDataFromEsewa(decodedData);

    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;
    const transactionUuid = decodedData.transaction_uuid;

    fetch(URLS.ORDER_DATA.replace(":orderID", transactionUuid), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        const orderData = await response.json();
        setOrderDetails(orderData);
      }
    });

    fetch(URLS.ORDER_PAYMENT_SUCCESS_URL.replace(":orderID", transactionUuid), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(async (response) => {
      if (response.ok) {
        dispatch(
          openToast({
            message: "Payment details updated",
            severity: "success",
          }),
        );
      }
    });
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000); // Stop confetti after 4 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid
      container
      item
      justifyContent="center"
      alignItems="center"
      spacing={2}
      xs={12}
      marginX={8}
      marginBottom={3}
    >
      {showConfetti && <Confetti />}
      <Grid
        container
        item
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 4, maxWidth: { lg: 500 }, backgroundColor: "#fff" }}
      >
        <Grid
          container
          xs={12}
          item
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              <strong>Payment Successful</strong>
            </Typography>
          </Grid>
          <Grid container item spacing={2}>
            <Grid container item justifyContent="space-between">
              <Grid item>
                <Typography variant="body1" textAlign="initial">
                  Payment type
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" textAlign="initial">
                  Online
                </Typography>
              </Grid>
            </Grid>
            <Grid container item justifyContent="space-between">
              <Grid item>
                <Typography variant="body1" textAlign="initial">
                  Channel
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" textAlign="initial">
                  Esewa
                </Typography>
              </Grid>
            </Grid>
            <Grid container item justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">Mobile</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {orderDetails?.user_phone}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">Email</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {orderDetails?.user_email}
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ width: "100%", my: 1 }} />
            <Grid container item justifyContent="space-between">
              <Grid item>
                <Typography variant="h6">
                  <strong>Amount paid</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {dataFromEsewa?.total_amount}
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ width: "100%", my: 1 }} />
            <Grid container item justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">Order id</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {dataFromEsewa?.transaction_uuid}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item justifyContent="center" gap={4}>
              <Grid item xs={4}>
                <Button
                  label="My Orders"
                  fullWidth
                  variant="contained"
                  onClick={() => router.push("/")}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  label="Shop More"
                  fullWidth
                  variant="contained"
                  onClick={() => router.push("/")}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentSuccess;
