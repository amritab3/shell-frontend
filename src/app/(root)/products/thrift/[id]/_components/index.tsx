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

import Button from "@/components/Button";
import { Product } from "@/utils/schema";
import URLS from "@/utils/urls";
import { setChatFromId, setChatToId } from "@/redux/features/miscSlice";

const itemInfoWidth: string = "100px";

const ThriftProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [numberOfItems, setNumberOfItems] = React.useState(0);
  const [product, setProduct] = useState({
    images: [{}],
    sizes: [{ size: "" }],
  } as Product);

  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  const userId = useSelector((state: RootState) => state.user.userID);

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
