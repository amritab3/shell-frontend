'use client';

import React, { useState } from 'react';

import { ProductCardSliderType } from '@/utils/schema';
import { Grid, IconButton, Link, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ProductCard from '@/components/Card/ProductCard';
import Button from '@/components/Button';

const ProductCardSlider = (props: ProductCardSliderType) => {
    const { products, autoPlay, title } = props;
    // if (!products || !products.length) {
    //     throw new Error("")
    // }
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const [currentProducts, setCurrentProducts] = useState([]);

    return (
        <Grid
            container
            item
            sx={{ flexGrow: 1 }}
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={12}>
                <Typography variant="h4" textAlign="initial">
                    {title}
                </Typography>
            </Grid>

            <Grid
                container
                item
                xs={12}
                justifyContent={'space-around'}
                alignItems="center"
                sx={{ margin: 1 }}
            >
                <IconButton sx={{ borderRadius: 0, height: '80%' }}>
                    <ArrowBackIosIcon />
                </IconButton>
                {products.map(product => {
                    return <ProductCard key={product.id} product={product} />;
                })}
                <IconButton sx={{ borderRadius: 0, height: '80%' }}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid>

            <Grid item>
                <Button label="View More" variant="outlined" />
            </Grid>
        </Grid>
    );
};

export default ProductCardSlider;
