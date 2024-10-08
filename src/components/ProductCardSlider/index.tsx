"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ProductCardSliderType } from "@/utils/schema";
import { Grid, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import ProductCard from "@/components/Card/ProductCard";
import Button from "@/components/Button";

const ProductCardSlider = (props: ProductCardSliderType) => {
  const { products, autoPlay, title, showViewMore, viewMoreRedirect } = props;
  const router = useRouter();

  function NextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <EastIcon
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black",
          height: "50px",
          width: "40px",
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <WestIcon
        className={className}
        style={{
          ...style,
          display: "block",
          color: "black",
          height: "50px",
          width: "40px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          infinite: false,
          arrows: false,
          swipeToSlide: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <Grid
      container
      item
      sx={{ flexGrow: 1 }}
      justifyContent="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h4" textAlign="initial">
          {title}
        </Typography>
      </Grid>

      <Grid
        container
        item
        xs={12}
        sx={{ display: "inline-block", margin: 1 }}
        justifyContent="flex-start"
      >
        <Slider {...settings}>
          {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </Slider>
      </Grid>

      {showViewMore && (
        <Grid item sx={{ mt: 5 }}>
          <Button
            label="View More"
            variant="contained"
            onClick={() => router.push(viewMoreRedirect!)}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ProductCardSlider;
