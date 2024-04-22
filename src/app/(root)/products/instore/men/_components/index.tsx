"use client";

import React from "react";
import router from "next/router";

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

const products: Array<Product> = [
  {
    id: 1,
    imageUrl:
      "https://static.zara.net/assets/public/1eec/f89d/8d444af59363/fb6a65279c57/04043049711-p/04043049711-p.jpg?ts=1711021465352&w=563",
    productName: "Floral Dress",
    productPrice: "2300",
  },
  {
    id: 2,
    imageUrl:
      "https://static.zara.net/assets/public/e183/9b45/b23c4299a2e7/bfd49a6de5b6/04661318250-a2/04661318250-a2.jpg?ts=1711034076959&w=563",
    productName: "Floral Dress",
    productPrice: "2300",
  },
  {
    id: 3,
    imageUrl:
      "https://static.zara.net/assets/public/4c11/32d5/bbe541b5a4c3/d8e288844546/05854025712-p/05854025712-p.jpg?ts=1710435725117&w=563",
    productName: "Floral Dress",
    productPrice: "2300",
  },
  {
    id: 4,
    imageUrl:
      "https://static.zara.net/assets/public/c29c/f5db/967040f996bc/185cc2fe26c1/03992466822-p/03992466822-p.jpg?ts=1711442578008&w=364",
    productName: "Floral Dress",
    productPrice: "2300",
  },
  {
    id: 5,
    imageUrl:
      "https://static.zara.net/assets/public/54a3/d631/c1c24f0c87a0/47823813eafe/05755430712-p/05755430712-p.jpg?ts=1711383520850&w=364",
    productName: "Floral Dress",
    productPrice: "2300",
  },
  {
    id: 6,
    imageUrl:
      "https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg",
    productName: "Floral Dress",
    productPrice: "2300",
  },
  {
    id: 7,
    imageUrl:
      "https://mode23nepal.com/image/cache/catalog/Product/COOFY/DSC04560-700x1098.jpg",
    productName: "Floral Dress",
    productPrice: "2300",
  },
  {
    id: 8,
    imageUrl:
      "https://mode23nepal.com/image/cache/catalog/Product/COOFY/DSC04936-700x1098.jpg",
    productName: "Floral Dress",
    productPrice: "2300",
  },
  {
    id: 9,
    imageUrl:
      "https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg",
    productName: "Floral Dress",
    productPrice: "2300",
  },
];

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
