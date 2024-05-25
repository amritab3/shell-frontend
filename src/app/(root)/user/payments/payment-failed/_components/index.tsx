"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Grid, Typography, Divider } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  EsewaPaymentSuccessResponse,
  PaymentOrderDetails,
} from "@/utils/schema";
import { RootState } from "@/redux/store";
import { decodeFromBase64 } from "next/dist/build/webpack/loaders/utils";
import URLS from "@/utils/urls";
import { openToast } from "@/redux/features/toastSlice";

const PaymentFailed = () => {
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

    fetch(URLS.ORDER_PAYMENT_FAILED_URL.replace(":orderID", transactionUuid), {
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
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <CancelIcon color="error" sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              <strong>Payment Failed</strong>
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
              {/*<Grid item xs={4}>*/}
              {/*  <Button*/}
              {/*    label="Try Again"*/}
              {/*    fullWidth*/}
              {/*    variant="contained"*/}
              {/*    onClick={() => router.push("/")}*/}
              {/*  />*/}
              {/*</Grid>*/}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentFailed;
