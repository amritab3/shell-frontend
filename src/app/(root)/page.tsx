"use client";

import { useEffect, useState } from "react";

import { Grid, formLabelClasses } from "@mui/material";

import {
  Product,
  BannerContent,
  ProductPaginatedResponseType,
} from "@/utils/schema";
import ProductCardSlider from "@/components/ProductCardSlider";
import WebsiteBanner from "@/components/Banner";
import URLS from "@/utils/urls";

export default function Home() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [menProducts, setMenProducts] = useState<Array<Product>>([]);
  const [womenProducts, setWomenProducts] = useState<Array<Product>>([]);
  const [kidsProducts, setKidsProducts] = useState<Array<Product>>([]);

  const bannerContents: Array<BannerContent> = [
    {
      id: 1,
      imageUrl:
        "https://static.zara.net/assets/public/af28/ab86/96b84a599ab0/70c870b82dca/image-landscape-fill-a9e43b43-d3b2-4c52-98d9-14cba8263329-default_0.jpg?ts=1716465577594&w=1920",
      redirectUrl: "",
    },
    {
      id: 2,
      imageUrl:
        "https://static.zara.net/assets/public/0fdb/f1cd/7a8045b8bfc1/290d30d97471/image-landscape-fill-9aa604cb-8877-4977-bb68-4d3af48f97eb-default_0.jpg?ts=1716550054926&w=1920",
      redirectUrl: "",
    },
    {
      id: 3,
      imageUrl:
        "https://static.zara.net/assets/public/d04d/9ed3/5501493b96a4/ae5e882bb924/image-landscape-default-fill-17cceacf-5191-4374-817f-088ee8cd8b2c-default_0.jpg?ts=1716478734743&w=1920",
      redirectUrl: "",
    },
  ];

  useEffect(() => {
    fetch(URLS.LIST_PRODUCTS, {
      method: "GET",
    })
      .then(async (response) => {
        const data: ProductPaginatedResponseType = await response.json();
        setProducts(data.results);
      })
      .catch((error) => {
        console.log("Error while fetching products", error);
      });

    fetch(URLS.LIST_MEN_PRODUCTS, {
      method: "GET",
    })
      .then(async (response) => {
        const data: ProductPaginatedResponseType = await response.json();
        setMenProducts(data.results);
      })
      .catch((error) => {
        console.log("Error while fetching men products", error);
      });

    fetch(URLS.LIST_WOMEN_PRODUCTS, {
      method: "GET",
    })
      .then(async (response) => {
        const data: ProductPaginatedResponseType = await response.json();
        setWomenProducts(data.results);
      })
      .catch((error) => {
        console.log("Error while fetching women products", error);
      });

    fetch(URLS.LIST_KIDS_PRODUCTS, {
      method: "GET",
    })
      .then(async (response) => {
        const data: ProductPaginatedResponseType = await response.json();
        setKidsProducts(data.results);
      })
      .catch((error) => {
        console.log("Error while fetching kids products", error);
      });
  }, []);

  return (
    <Grid container item xs={12} justifyContent="center" alignItems="center">
      <Grid
        item
        xs={12}
        sx={{
          height: {
            xs: "26vh",
            sm: "33vh",
            md: "35vh",
            lg: "50vh",
            xl: "90vh",
          },
        }}
      >
        <WebsiteBanner bannerContents={bannerContents} />
      </Grid>

      <Grid item xs={11} sx={{ mb: 6 }}>
        <ProductCardSlider
          title="New Arrivals"
          products={products}
          showViewMore={false}
        />
      </Grid>

      <Grid item xs={11} sx={{ mb: 4 }}>
        <ProductCardSlider
          title="Men's Wear"
          products={menProducts}
          showViewMore={true}
          viewMoreRedirect="/products/instore/men"
        />
      </Grid>

      <Grid item xs={11} sx={{ mb: 4 }}>
        <ProductCardSlider
          title="Women's Wear"
          products={womenProducts}
          showViewMore={true}
          viewMoreRedirect="/products/instore/women/"
        />
      </Grid>

      <Grid item xs={11} sx={{ mb: 4 }}>
        <ProductCardSlider
          title="Kid's Wear"
          products={kidsProducts}
          showViewMore={true}
          viewMoreRedirect="/products/instore/kids/"
        />
      </Grid>
    </Grid>
  );
}
