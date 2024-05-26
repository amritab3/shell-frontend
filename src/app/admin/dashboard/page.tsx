"use client";

import React from "react";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";

import { Grid, Typography } from "@mui/material";

import Button from "@/components/Button";


const Dashboard = () => {
  const router = useRouter();

  return (
    <Grid container sx={{ height: '60vh', justifyContent: 'center', alignItems: 'center', color: "primary.main" }}>
      <Grid item xs={12} sx={{ textAlign: 'center' }}> {/* Center content horizontally */}
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
          WELCOME TO THE DASHBOARD!
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}> {/* Center content horizontally */}
        <Button
          label="Go To Home"
          variant="contained"
          onClick={() => router.push("/")}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
