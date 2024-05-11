"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/redux/store";

import { openToast } from "@/redux/features/toastSlice";

import {
  Box,
  Grid,
  Typography,
  TextField,
  Breadcrumbs,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Rating from "@mui/material/Rating";
import Button from "@/components/Button";
import { Product, ProductSize } from "@/utils/schema";
import URLS from "@/utils/urls";
import { objectExists } from "@/utils/Utils";
import { CartItem } from "@/utils/schema";
import { addToCart } from "@/redux/features/cartSlice";

const itemInfoWidth: string = "100px";

const ThriftProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [numberOfItems, setNumberOfItems] = React.useState(0);
  const [product, setProduct] = useState({
    images: [{}],
    sizes: [{ size: "" }],
  } as Product);
  const [selectedSize, setSelectedSize] = useState({} as ProductSize);

  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const accessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );
  const userId = useSelector((state: RootState) => state.user.userID);
  const incrementItemCount = () => {
    if (objectExists(selectedSize)) {
      let newNumberOfItems = numberOfItems + 1;
      if (newNumberOfItems > selectedSize.size_inventory) {
        newNumberOfItems = selectedSize.size_inventory;
      }
      setNumberOfItems(newNumberOfItems);
    } else {
      dispatch(
        openToast({
          message: "Please select the size first.",
          severity: "error",
        }),
      );
    }
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
    fetch(`${URLS.THRIFT_PRODUCTS_URL}/${params.id}`)
      .then(async (response) => {
        const data: Product = await response.json();
        setProduct(data);
      })
      .catch((error) => {
        console.log("Error while fetching a product.", error);
      });
  }, [params.id]);

  const handleAddToCart = () => {
    if (!objectExists(selectedSize)) {
      dispatch(
        openToast({
          message: "Please select the size first.",
          severity: "error",
        }),
      );
      return;
    }

    if (numberOfItems <= 0) {
      dispatch(
        openToast({
          message: "Quantity should be more than 0",
          severity: "error",
        }),
      );
      return;
    }

    if (!isLoggedIn) {
      dispatch(
        openToast({
          message: "Please login to continue",
          severity: "info",
        }),
      );
      router.push("/login");
      return;
    }

    const cartItem = {
      product: product.id!,
      quantity: numberOfItems,
      size: selectedSize.size,
      price: product.price,
    };

    fetch(URLS.ADD_ITEM_TO_CART.replace(":userId", userId), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then(async (resp) => {
        const addedCart = await resp.json();
        dispatch(addToCart(addedCart));
        dispatch(
          openToast({
            message: "Item added to cart",
            severity: "success",
          }),
        );
        setSelectedSize({} as ProductSize);
        setNumberOfItems(0);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

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
                    variant={
                      productSize.size === selectedSize.size
                        ? "contained"
                        : "outlined"
                    }
                    disabled={productSize.size_inventory <= 0}
                    onClick={() => {
                      if (productSize.size !== selectedSize.size) {
                        setSelectedSize(productSize);
                        setNumberOfItems(0);
                      } else if (productSize.size === selectedSize.size) {
                        setSelectedSize({} as ProductSize);
                        setNumberOfItems(0);
                      }
                    }}
                  />
                );
              })}
            </Grid>
            {objectExists(selectedSize) && (
              <Typography variant="subtitle1">
                In Stock: {selectedSize.size_inventory}
              </Typography>
            )}
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
            {product.inventory! > 0 ? (
              <Button
                label="Add to Cart"
                variant="contained"
                onClick={handleAddToCart}
              />
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

export default ThriftProductDetail;
