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
        "https://static.zara.net/photos///contents/mkt/spots/ss24-studio-collection-maintenance/subhome-xmedia-worldwide//w/1920/IMAGE-landscape-0224cf8b-a2e1-4ab7-a5a3-6c8d4923289b-default_0.jpg?ts=1710158285323",
      redirectUrl: "",
    },
    {
      id: 2,
      imageUrl:
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-dresses/subhome-xmedia-13//w/1920/IMAGE-landscape-fill-6d47abd7-4a4e-4580-b8d4-fc1b9d1970fc-default_0.jpg?ts=1711560554796",
      redirectUrl: "",
    },
    {
      id: 3,
      imageUrl:
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-shoes/subhome-xmedia-13-2//w/1920/IMAGE-landscape-fill-735480c8-6d15-4139-bc45-8c96bb41dc17-default_0.jpg?ts=1711557494527",
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
        xs={11}
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
