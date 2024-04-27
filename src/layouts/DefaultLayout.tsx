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
        direction="column"
        alignItems="stretch"
        style={{ minHeight: "100vh" }}
      >
        <Grid container item sx={{ mb: 2, position: "relative" }}>
          <Header />
        </Grid>
        <Grid container item flex={1}>
          {children}
        </Grid>
        <Grid container item sx={{ mt: "auto" }}>
          <Footer />
        </Grid>
      </Grid>
    </section>
  );
};

export default DefaultLayout;
