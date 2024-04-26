"use client";

import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import { Product, BannerContent } from "@/utils/schema";
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
        const data: Array<Product> = await response.json();
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error while fetching products", error);
      });

    fetch(URLS.LIST_MEN_PRODUCTS, {
      method: "GET",
    })
      .then(async (response) => {
        const data: Array<Product> = await response.json();
        setMenProducts(data);
      })
      .catch((error) => {
        console.log("Error while fetching men products", error);
      });

    fetch(URLS.LIST_WOMEN_PRODUCTS, {
      method: "GET",
    })
      .then(async (response) => {
        const data: Array<Product> = await response.json();
        setWomenProducts(data);
      })
      .catch((error) => {
        console.log("Error while fetching women products", error);
      });

    fetch(URLS.LIST_KIDS_PRODUCTS, {
      method: "GET",
    })
      .then(async (response) => {
        const data: Array<Product> = await response.json();
        setKidsProducts(data);
      })
      .catch((error) => {
        console.log("Error while fetching kids products", error);
      });
  }, []);

  return (
    <Grid container item justifyContent="center" gap={2}>
      <Grid item sx={{ width: "95%", margin: 2 }}>
        <WebsiteBanner bannerContents={bannerContents} />
      </Grid>

      <Grid item sx={{ width: "95%", margin: 2 }}>
        <ProductCardSlider title="New Arrivals" products={products} />
      </Grid>

      <Grid item sx={{ width: "95%", margin: 2 }}>
        <ProductCardSlider title="Men's Wear" products={menProducts} />
      </Grid>

      <Grid item sx={{ width: "95%", margin: 2 }}>
        <ProductCardSlider title="Women's Wear" products={womenProducts} />
      </Grid>

      <Grid item sx={{ width: "95%", margin: 2 }}>
        <ProductCardSlider title="Kid's Wear" products={kidsProducts} />
      </Grid>
    </Grid>
  );
}
