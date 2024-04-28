"use client";
import React, { useState } from "react";
import Slider from "react-slick";

import { Box } from "@mui/material";

import { BannerContent } from "@/utils/schema";
import "./index.css";

interface CustomBannerProps {
  bannerContents: Array<BannerContent>;
}

export default function WebsiteBanner(props: CustomBannerProps) {
  const { bannerContents, ...rest } = props;

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <Box component="div" className="slider-container">
      <Slider {...settings}>
        {bannerContents.map((bannerContent) => {
          return (
            <Box
              key={bannerContent.id}
              component="img"
              sx={{
                cursor: "pointer",
                height: "auto",
                maxHeight: { xs: 170, sm: 350, md: 460, xl: 550, xxl: 850 },
              }}
              src={bannerContent.imageUrl}
            />
          );
        })}
      </Slider>
    </Box>
  );
}
