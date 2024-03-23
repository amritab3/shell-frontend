import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Grid from "@mui/material/Grid";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "An eCommerce platform",
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        flexGrow: 1,
      }}
    >
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
