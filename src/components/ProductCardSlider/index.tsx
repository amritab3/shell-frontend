"use client";

import React, { useState } from "react";

import { ProductCardSliderType } from "@/utils/schema";
import { Grid, IconButton, Link, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ProductCard from '@/components/Card/ProductCard';



const ProductCardSlider = (props: ProductCardSliderType) => {
    const { products, autoPlay } = props;
    // if (!products || !products.length) {
    //     throw new Error("")
    // }
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,

    }

    const [currentProducts, setCurrentProducts] = useState([]);

    return (
        <Grid container item sx={{ flexGrow: 1 }} >

            <Grid item xs={12}>
                <Typography variant="h5">
                    New Arrivals
                </Typography>
            </Grid>

            <Grid container item xs={12} justifyContent={"space-around"}>
                <IconButton sx={{ borderRadius: '0%' }}> <ArrowBackIosIcon /> </IconButton>
                {products.map(product => {
                    return <ProductCard key={product.id} product={product} />;
                })}
                <IconButton sx={{ borderRadius: '0%' }}> <ArrowForwardIosIcon /> </IconButton>

            </Grid>

        </Grid>
        
    )

}

export default ProductCardSlider;