"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import NotFound from "@/components/404";
import { Box, Grid, Typography, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@/components/Button";
import Input from "@/components/Input";

const itemInfoWidth: string = "100px";

const ProductDetail = () => {
  const params = useParams();
  const [value, setValue] = React.useState<number | null>(0);
  const [numberOfItems, setNumberOfItems] = React.useState(0);

  const incrementItemCount = () => {
    const newNumberOfItems = numberOfItems + 1;
    setNumberOfItems(newNumberOfItems);
  };

  const decrementItemCount = () => {
    let newNumberOfItems = numberOfItems - 1;
    if (newNumberOfItems < 0) {
      newNumberOfItems = 0;
    }

    setNumberOfItems(newNumberOfItems);
  };

  const productDetails = {
    imageUrl:
      "https://mode23nepal.com/image/catalog/Product/Spring%20godawari%202024/DSC05817%20(2).jpg",
    name: "EYANA VINTAGE FLORAL SHIRT",
    price: "2650",
    styles: "Vintage, Adorable",
    color: "Creamy",
    availability: true,
    numberOfStocks: "15",
    material: "Linen",
    sizes: { S: 5, M: 5, L: 5, XL: 0 },
  };

  useEffect(() => {
    //fetch product data here
    console.log("Product ID: ", params.id);
  }, []);

  return (
    <Grid container item xs={12} sx={{ m: 4, mt: 5 }}>
      <Grid item xs={4}>
        <Box
          component="img"
          sx={{
            height: 550,
            width: 400,
            marginLeft: 10,

            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src={productDetails.imageUrl}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6" component="h2">
          Breadcrumbs
        </Typography>
        <Rating
          name="product-rating"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Box sx={{ width: "100%", maxWidth: 500, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {productDetails.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Rs. {productDetails.price}
          </Typography>
          <Grid container item xs={6}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ width: itemInfoWidth }}
            >
              Style
            </Typography>
            <Typography>: {productDetails.styles}</Typography>
          </Grid>
          <Grid container item xs={6}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ width: itemInfoWidth }}
            >
              Color
            </Typography>
            <Typography>: {productDetails.color}</Typography>
          </Grid>
          <Grid container item xs={6}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ width: itemInfoWidth }}
            >
              Fabric
            </Typography>
            <Typography>: {productDetails.material}</Typography>
          </Grid>

          <Grid container item xs={7}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                width: itemInfoWidth,
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              Size
            </Typography>
            <Grid container item xs={12}>
              {Object.keys(productDetails.sizes).map((size: string) => {
                const numberOfStocks: number = productDetails.sizes[size];
                return (
                  <Button
                    key={size}
                    disabled={
                      !productDetails.availability || numberOfStocks <= 0
                    }
                    label={size}
                    variant="outlined"
                    sx={{ m: 1 }}
                  />
                );
              })}
            </Grid>
          </Grid>

          <Grid container item sx={{ mt: 2, mb: 2 }} gap={1}>
            <Button
              label="-"
              variant="outlined"
              sx={{ minHeight: 0, minWidth: 0 }}
              onClick={decrementItemCount}
            />
            <TextField
              variant="outlined"
              value={numberOfItems}
              size="small"
              sx={{ width: "60px", "& input": { textAlign: "center" } }}
            />
            <Button
              label="+"
              variant="outlined"
              sx={{ minHeight: 0, minWidth: 0 }}
              onClick={incrementItemCount}
            />
          </Grid>

          <Grid container item sx={{ mt: 2 }}>
            {productDetails.availability ? (
              <Button label="Add to Cart" variant="outlined" />
            ) : (
              <Button label="Out of Stock" disabled variant="outlined" />
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
