"use client";

import React, { useEffect, useState } from "react";

import { Grid, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { Product, SelectItemType } from "@/utils/schema";
import ProductCard from "@/components/Card/ProductCard";
import Button from "@/components/Button";
import Select from "@/components/Select";
import URLS from "@/utils/urls";

const sortSelectItems: Array<SelectItemType> = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Name (A-Z)",
    value: "name_asc",
  },
  {
    label: "Name (Z-A)",
    value: "name_desc",
  },
];

const MenProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    fetch(URLS.LIST_PRODUCTS, {
      method: "GET",
    })
      .then(async (response) => {
        const data: Array<Product> = await response.json();
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error while fetching men products", error);
      });
  }, []);

  return (
    <Grid
      container
      item
      justifyContent="center"
      spacing={2}
      xs={12}
      marginLeft={12}
    >
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
          >
            <HomeIcon color="primary" sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            Men
          </Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4"> Men </Typography>
        <Divider sx={{ marginY: 2, width: "93%" }} />
      </Grid>
      <Grid item container xs={12}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "inherit", letterSpacing: 1 }}
        >
          {" "}
          Refine Search{" "}
        </Typography>
        <Grid container item spacing={2} sx={{ mt: "1px" }}>
          <Grid item>
            <Button label="Shirts" variant="outlined" />
          </Grid>
          <Grid item>
            <Button label="Pants" variant="outlined" />
          </Grid>
          <Grid item>
            <Button label="T-Shirts" variant="outlined" />
          </Grid>
          <Grid item>
            <Button label="Jeans" variant="outlined" />
          </Grid>
          <Grid item>
            <Button label="Jackets" variant="outlined" />
          </Grid>
          <Grid item>
            <Button label="Sweater" variant="outlined" />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mr: 10 }}
      >
        <Grid item>
          <Select id="sortBy" label="Sort By" selectItems={sortSelectItems} />
        </Grid>
        <Grid item>
          <Select id="sortBy" label="Sort By" selectItems={sortSelectItems} />
        </Grid>
      </Grid>

      <Grid container item xs={12} direction="row" spacing={4}>
        {products.map((product) => {
          return (
            <Grid item xs={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
        }}
      >
        <Stack spacing={2}>
          <Pagination count={10} color="primary" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MenProducts;
