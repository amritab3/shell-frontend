"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import {
  Box,
  Grid,
  Typography,
  TextField,
  Breadcrumbs,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import Rating from "@mui/material/Rating";
import Button from "@/components/Button";
import { Product } from "@/utils/schema";
import URLS from "@/utils/urls";

const itemInfoWidth: string = "100px";

const ProductDetail = () => {
  const params = useParams();
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [numberOfItems, setNumberOfItems] = React.useState(0);
  const [product, setProduct] = useState<Product>({
    category: "Category for awesome product",
    color: "Awesome Color",
    description: "Awesome product description",
    gender: "Men",
    id: 0,
    inventory: 0,
    material: "N/A",
    name: "Awesome Product",
    price: 0,
    sizes: [{ size: "N/A", size_inventory: 0 }],
    style: "Cool",
    images: [{ image: "" }],
  });

  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

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

  useEffect(() => {
    //fetch product data here
    fetch(`${URLS.LIST_PRODUCTS}/${params.id}`)
      .then(async (response) => {
        const data: Product = await response.json();
        setProduct(data);
      })
      .catch((error) => {
        console.log("Error while fetching a product.", error);
      });
  }, []);

  return (
    <Grid container item direction="column" flex={1} gap={5}>
      <Grid container item>
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
            alt={product.name}
            src={product.images[0].image}
          />
        </Grid>
        <Grid
          container
          item
          xs={8}
          direction="column"
          justifyContent="space-between"
        >
          <Grid container item spacing={1}>
            <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
              <Breadcrumbs separator="|" aria-label="breadcrumb">
                <Link
                  underline="hover"
                  sx={{ display: "flex", alignItems: "center" }}
                  color="inherit"
                  href="/"
                >
                  <HomeIcon color="primary" sx={{ mr: 0.5 }} fontSize="small" />
                </Link>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  color="text.primary"
                >
                  {product.name}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="product-rating"
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
              />
            </Grid>
          </Grid>

          <Grid item>
            <Typography variant="h6" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Rs. {product.price}
            </Typography>
          </Grid>

          <Grid container item>
            <Grid container item direction="column" spacing={1}>
              <Grid container item>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ width: itemInfoWidth }}
                >
                  Style
                </Typography>
                <Typography>: {product.style}</Typography>
              </Grid>
              <Grid container item>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ width: itemInfoWidth }}
                >
                  Color
                </Typography>
                <Typography>: {product.color}</Typography>
              </Grid>
              <Grid container item>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ width: itemInfoWidth }}
                >
                  Fabric
                </Typography>
                <Typography>: {product.material}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                width: itemInfoWidth,
                fontSize: "1.1rem",
                fontWeight: "bold",
                mt: 4,
              }}
            >
              Size
            </Typography>
            <Grid container item xs={12} sx={{ gap: 2 }}>
              {product.sizes.map((productSize) => {
                return (
                  <Button
                    key={productSize.size}
                    label={productSize.size}
                    variant="outlined"
                    disabled={productSize.size_inventory <= 0}
                  />
                );
              })}
            </Grid>
          </Grid>

          <Grid container item gap={2}>
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
              sx={{ width: "70px", "& input": { textAlign: "center" } }}
            />
            <Button
              label="+"
              variant="outlined"
              sx={{ minHeight: 0, minWidth: 0 }}
              onClick={incrementItemCount}
            />
          </Grid>

          <Grid container item>
            {product.inventory > 0 ? (
              <Button label="Add to Cart" variant="outlined" />
            ) : (
              <Button label="Out of Stock" disabled variant="outlined" />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
            Reviews
          </Typography>
          <Typography variant="subtitle1" component="h2" letterSpacing={0.5}>
            Write comments here
          </Typography>
          {isLoggedIn ? (
            <Typography>COMMENT FORM</Typography>
          ) : (
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ mt: 1, letterSpacing: "0.5px" }}
            >
              Please <Link href="/login">login</Link> to review
            </Typography>
          )}

          <Typography variant="subtitle2" component="h2" sx={{ mt: 2 }}>
            There are no reviews for this product.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
