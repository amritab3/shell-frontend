"use client";
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

export default function ProductCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{ width: 300, borderRadius: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea
        sx={{
          width: 300,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 0,
        }}
      >
        <CardMedia
          component="img"
          height="350"
          image="https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg"
          alt="dress"
          sx={{
            transform: isHovered ? 'scale(1.1)' : 'none', // Updated to 'none' on the server
            transition: 'all 1s ease',
          }}
        />

        <Button
          variant="contained"
          sx={{
            display: 'block',
            opacity: isHovered ? '1.2' : '0',
            height: '50px',
            width: '500px',
            position: 'absolute',
            borderRadius: 0,
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'all 1s ease',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'black',
            fontSize: 'medium',
            fontFamily: 'sans-serif',
            letterSpacing: '2.7px',
          }}
        >
          Order Now
        </Button>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Floral Dress
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rs.2,600
        </Typography>
      </CardContent>
    </Card>
  );
}
