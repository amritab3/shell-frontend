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
  Breadcrumbs,
  Link,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeIcon from "@mui/icons-material/Home";
import Rating from "@mui/material/Rating";
import Button from "@/components/Button";
import { Product } from "@/utils/schema";
import URLS from "@/utils/urls";
import { setChatFromId, setChatToId } from "@/redux/features/miscSlice";

const itemInfoWidth: string = "100px";

const ThriftProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [product, setProduct] = useState({
    images: [{}],
    sizes: [{ size: "" }],
    // seller_details: { id: "", name: "", contact: "", email: "" },
  } as Product);

  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const accessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );
  const userId = useSelector((state: RootState) => state.user.userID);

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

    if (isLoggedIn) {
      fetch(URLS.GET_USER_RATING.replace(":productId", params.id.toString()), {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
        .then(async (response) => {
          const ratingData = await response.json();
          setRatingValue(ratingData["rating"]);
        })
        .catch((error) => {
          console.log("Error while fetching user product rating.", error);
        });
    }
  }, [params.id]);

  const handleRatingChange = (event: any, newValue: number | null) => {
    setRatingValue(newValue);
    fetch(URLS.ADD_RATING.replace(":productId", params.id.toString()), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating_value: newValue ? newValue : 0 }),
    })
      .then(async (resp) => {
        const ratingCreateData = await resp.json();
        setRatingValue(ratingCreateData["rating_value"]);
      })
      .catch((error) => {
        console.log("Error while adding rating", error);
      });
  };

  const handleChatWithSeller = () => {
    dispatch(setChatToId(product.seller_details?.id));
    dispatch(setChatFromId(userId));
    router.push("/chat");
  };

  return (
    <Grid
      container
      item
      flex={1}
      gap={5}
      xs={12}
      justifyContent="center"
      alignItems="center"
    >
      <Grid container item justifyContent={"center"}>
        <Grid item xs={4}>
          <Box
            component="img"
            sx={{
              width: 400,
              marginLeft: 10,
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

          <Box sx={{ height:"28%" ,padding: 1, border: '1px solid #ccc', borderRadius: 2, boxShadow: 2, width: "40%" }}>
            <Grid container item>
              <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  name="product-rating"
                  value={ratingValue}
                  onChange={handleRatingChange}
                  disabled={!isLoggedIn}
                />
                {!isLoggedIn ? (
                  <Tooltip title="Login to rate">
                    <InfoOutlinedIcon fontSize="small" />
                  </Tooltip>
                ) : null}
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary"marginBottom={1}>
              Avg Rating: 3/5
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Seller Details:
            </Typography>
            <Grid container >
              <Grid item xs={12} display="flex" >
                <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold', mr: 1 }}>
                  Name:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Amrita Bhattarai
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex">
                <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold',mr: 1 }}>
                  Contact:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  981111111
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex">
                <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold',mr: 1 }}>
                  Email:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  aaa@gmail.com                
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Grid container item>
            {product.inventory! > 0 ? (
              <Button
                label="Chat with seller"
                variant="contained"
                onClick={handleChatWithSeller}
              />
            ) : (
              <Button label="Out of Stock" disabled variant="outlined" />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ThriftProductDetail;
