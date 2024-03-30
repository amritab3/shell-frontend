'use client';
import React, { useState } from 'react';
import Slider from "react-slick";

import { Box } from '@mui/material';

import { BannerContent } from '@/utils/schema';
import './index.css';


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
        autoplaySpeed: 5000,
        pauseOnHover: true
    };

    return (
        <Box component="div" className="slider-container banner-parent">
             <Slider {...settings}>
                {bannerContents.map(bannerContent => {
                    return (
                        <Box
                            key={bannerContent.id}
                            component="img"
                            sx={{
                                cursor: "pointer",
                                height:"auto",
                                width: "auto",
                                maxHeight: { xs: 233, md: 167, lg: 600 },
                                maxWidth: { xs: 350, md: 250, lg: 1443 },
                            }}
                            src= {bannerContent.imageUrl}
                        />
                        );
                    })
                }
      </Slider>
    </Box>
    );
}
