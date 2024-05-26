import React from "react";
import type { Metadata } from "next";

import NotFound from "@/components/404";
import { Grid, Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "An eCommerce platform",
};

const Dashboard = () => {
  return (
    <Grid container sx={{ height: '60vh', justifyContent: 'center', alignItems: 'center',color: "primary.main" }}>
      <Grid item>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
          WELCOME TO THE DASHBOARD!
        </Typography>
      </Grid>
    </Grid>



  );
};

export default Dashboard;
