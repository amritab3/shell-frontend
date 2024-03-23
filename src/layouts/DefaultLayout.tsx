import React from "react";
import type { Metadata } from "next";

import Grid from "@mui/material/Grid";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ThreadSwap",
  description: "An eCommerce platform",
};

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Grid
        container
        sx={{
          height: "100vh",
          flexGrow: 1,
        }}
      >
        <Grid item xs={12} alignSelf="flex-start">
          <Header />
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
        <Grid item xs={12} alignSelf="flex-end">
          <Footer />
        </Grid>
      </Grid>
    </section>
  );
};

export default DefaultLayout;
