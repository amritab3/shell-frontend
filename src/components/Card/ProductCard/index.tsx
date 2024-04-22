'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';

import Button from '@/components/Button';
import { Product } from '@/utils/schema';

interface CustomCardProps {
    product: Product;
}

export default function ProductCard(props: CustomCardProps & CardProps) {
    const { product, ...rest } = props;
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    return (
        <Card
            sx={{ width: 350, borderRadius: 0 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Grid container direction="column" sx={{ position: 'relative' }}>
                <Grid item>
                    <CardActionArea
                        onClick={() => router.push(`/products/instore/${product.id}`)}
                        sx={{
                            overflow: 'hidden',
                            borderRadius: 0,
                            boxShadow: 'none',
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="400"
                            image={product.imageUrl}
                            alt="dress"
                            sx={{
                                transform: isHovered ? 'scale(1.1)' : 'none', // Updated to 'none' on the server
                                transition: 'all 1s ease',
                            }}
                        />
                    </CardActionArea>
                </Grid>
                <Grid
                    item
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                        opacity: isHovered ? '1' : '0',
                        transition: 'all 0.6s ease',
                    }}
                >
                    <Button
                        fullWidth
                        label="Order Now"
                        sx={{
                            borderRadius: 0,
                            boxShadow: 'none',
                            height: '50px',
                            background: 'rgba(255,255,255,0.5)',
                            fontSize: 'medium',
                            color: 'black',
                            letterSpacing: '2.7px',
                            '&:hover': {
                                background: 'rgba(255,255,255,0.6)',
                                boxShadow: 'none',
                            },
                        }}
                    />
                </Grid>
            </Grid>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rs.{product.productPrice}
                </Typography>
            </CardContent>
        </Card>
    );
}
