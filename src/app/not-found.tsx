import React from "react";

import Grid from "@mui/material/Grid";

import NotFound from "@/components/404";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFoundPage = () => {
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
          <NotFound />
        </Grid>
        <Grid item xs={12} alignSelf="flex-end">
          <Footer />
        </Grid>
      </Grid>
    </section>
  );
};

export default NotFoundPage;
