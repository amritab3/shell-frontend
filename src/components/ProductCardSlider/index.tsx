'use client';

import React from 'react';

import { ProductCardSliderType } from '@/utils/schema';
import { Grid, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

import ProductCard from '@/components/Card/ProductCard';
import Button from '@/components/Button';

const ProductCardSlider = (props: ProductCardSliderType) => {
    const { products, autoPlay, title } = props;
    // if (!products || !products.length) {
    //     throw new Error("")
    // }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: autoPlay,
        autoplaySpeed: 3000,

        // nextArrow: <ArrowForwardIosIcon />,
        // prevArrow: <ArrowBackIosIcon />,
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 1,
        //             infinite: true,
        //             dots: true,
        //         },
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //             initialSlide: 1,
        //         },
        //     },
        // ],
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
                sx={{ display: 'inline-block', margin: 1 }}
                justifyContent="center"
            >
                <Slider {...settings}>
                    {products.map(product => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        );
                    })}
                </Slider>
            </Grid>

            <Grid item>
                <Button label="View More" variant="outlined" />
            </Grid>
        </Grid>
    );
};

export default ProductCardSlider;
