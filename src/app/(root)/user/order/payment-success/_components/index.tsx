"use client";

import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Button from "@/components/Button";


const PaymentSuccess = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} display="flex" justifyContent="center">
            <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              Payment successful
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Payment type:</strong> Net banking</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Bank:</strong> HDFC</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Mobile:</strong> 8897131444</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Email:</strong> sudheerreddy.ui@gmail.com</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Amount paid:</strong> 500.00</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Transaction id:</strong> 125478965698</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between" mt={2}>
          <Grid item xs={12}>
            <Button
              label="Print"
              fullWidth
              variant="contained"
              // onClick={handleSubmit(onSubmit)}
              onClick={() => window.print()}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              label="Close"
              fullWidth
              variant="contained"
              // onClick={handleSubmit(onSubmit)}
            />
          </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;
