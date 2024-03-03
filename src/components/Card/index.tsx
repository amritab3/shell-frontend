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
      sx={{ width: 300, borderRadius: 0}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea sx={{
        width: 300,
        position: 'relative',
        overflow: 'hidden',
        transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out',
        opacity: isHovered ? 0.6 : 1,
        borderRadius: 0,
      }}>
        <CardMedia 
          component="img"
          height="350"
          image="https://images.pexels.com/photos/20331062/pexels-photo-20331062/free-photo-of-young-woman-in-a-dress-posing-in-a-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="dress"
          
        />
        <Button variant='outlined' sx = {{ display: isHovered? "block": "none" }}> 
            Order Now
        </Button>

      </CardActionArea>
      <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            floral dress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rs.2,600
          </Typography>
        </CardContent>
    </Card>
  );
}
