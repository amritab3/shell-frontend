"use client";

import React from 'react';
import { useRouter } from 'next/navigation';


import { Grid, Typography, Divider } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from "@/components/Button";

const PaymentFailed = () => {
  const router = useRouter();

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
        sx={{ padding: 4, maxWidth: {lg:500}, backgroundColor: '#fff'}}
      >
        <Grid container xs={12} spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <CancelIcon color="error" sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              <strong>Payment Failed</strong>
            </Typography>
          </Grid>
          <Grid container item spacing={2}>
            <Grid container item  justifyContent="space-between">
              <Grid item>
                <Typography variant="body1" textAlign="initial">Payment type</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" textAlign="initial">Net banking</Typography>
              </Grid>
            </Grid>
            <Grid container item  justifyContent="space-between">
              <Grid item>
                <Typography variant="body1" textAlign="initial">Bank</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" textAlign="initial">HDFC</Typography>
              </Grid>
            </Grid>
            <Grid container item  justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">Mobile</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">8897131444</Typography>
              </Grid>
            </Grid>
            <Grid container item  justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">Email</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">sudheerreddy.ui@gmail.com</Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ width: '100%', my: 1 }} />
            <Grid container item  justifyContent="space-between">
              <Grid item>
                <Typography variant="h6"><strong>Amount paid</strong></Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>500.00</Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ width: '100%', my: 1 }} />
            <Grid container item  justifyContent="space-between">
              <Grid item>
                <Typography variant="body1">Order id</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">125478965698</Typography>
              </Grid>
            </Grid>
            <Grid container item  justifyContent="center" gap={4}>
              <Grid item xs={4}>
                <Button
                  label="My Orders"
                  fullWidth
                  variant="contained"
                  onClick={()=>router.push('/')}

                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  label="Try Again"
                  fullWidth
                  variant="contained"
                  onClick={()=>router.push('/')}
                />
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentFailed;