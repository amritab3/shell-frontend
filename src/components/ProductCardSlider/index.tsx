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

    const sleep = (ms = 0) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const keys = Array.from(Array(products.length).keys());

    const [items, setItems] = React.useState(keys);
    const [isTicking, setIsTicking] = React.useState(false);
    const [activeIdx, setActiveIdx] = React.useState(0);
    const bigLength = items.length;
    console.log('Items: ', items);

    const createItem = (idx: number) => {
        const item = products[idx];

        return item;
    };

    interface CarouselSlideItemProps {
        idx: number;
        pos: number;
        activeIdx: number;
    }

    const CarouselSlideItem = (props: CarouselSlideItemProps) => {
        const { idx } = props;
        const item = createItem(idx);

        return <ProductCard product={item} />;
    };

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems(prev => {
                return prev.map((_, i) => prev[(i + jump) % bigLength]);
            });
        }
    };

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems(prev => {
                return prev.map(
                    (_, i) => prev[(i - jump + bigLength) % bigLength],
                );
            });
        }
    };

    React.useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false));
    }, [isTicking]);

    React.useEffect(() => {
        setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
    }, [items]);

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

            <Grid container item xs={12} sx={{ margin: 1 }}>
                <IconButton
                    sx={{ borderRadius: 0 }}
                    onClick={() => prevClick()}
                >
                    <ArrowBackIosIcon />
                </IconButton>

                <Grid item container>
                    {items.map((pos, index) => {
                        return (
                            <CarouselSlideItem
                                key={index}
                                idx={index}
                                pos={pos}
                                activeIdx={activeIdx}
                            />
                        );
                    })}
                </Grid>

                <IconButton
                    sx={{ borderRadius: 0 }}
                    onClick={() => nextClick()}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid>

            <Grid item xs={12}>
                <Button label="View More" variant="outlined" />
            </Grid>
        </Grid>
    );
};

export default ProductCardSlider;
