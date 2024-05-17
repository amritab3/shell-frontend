"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

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
import {
  CommentsPaginatedResponseType,
  Product,
  ProductComment,
  ProductSize,
} from "@/utils/schema";
import URLS from "@/utils/urls";
import { objectExists } from "@/utils/Utils";
import { addToCart } from "@/redux/features/cartSlice";
import FormInput from "@/components/Form/FormInput";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

const itemInfoWidth: string = "100px";

interface IFormInput {
  message: string;
}

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [numberOfItems, setNumberOfItems] = React.useState(0);
  const [product, setProduct] = useState({
    images: [{}],
    sizes: [{ size: "" }],
    comments: [{ id: "" }],
  } as Product);
  const [selectedSize, setSelectedSize] = useState({} as ProductSize);
  const [comments, setComments] = React.useState([
    { id: "" } as ProductComment,
  ]);
  const [commentPage, setCommentPage] = React.useState(1);
  const [commentTotalPages, setCommentTotalPages] = React.useState(0);

  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const accessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );
  const userId = useSelector((state: RootState) => state.user.userID);

  const handleCommentPageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCommentPage(value);
  };

  const initialValues: IFormInput = {
    message: "",
  };
  const { handleSubmit, control, setError, reset } = useForm<IFormInput>({
    defaultValues: initialValues,
  });
  const onCommentSubmit = async (formData: IFormInput) => {
    const commentResponse = await fetch(
      `${URLS.PRODUCT_COMMENT_URL}/`.replace(
        ":productId",
        params.id.toString(),
      ),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message: formData.message }),
      },
    );

    if (commentResponse.status === 201) {
      const addedComment: ProductComment = await commentResponse.json();
      setComments([addedComment, ...comments]);
      dispatch(
        openToast({
          message: "Comment successfully added",
          severity: "success",
        }),
      );
      reset(initialValues);
    } else {
      dispatch(
        openToast({
          message: "Comment could not be added",
          severity: "error",
        }),
      );
    }
  };

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
    fetch(`${URLS.LIST_PRODUCTS}/${params.id}`)
      .then(async (response) => {
        const data: Product = await response.json();
        setProduct(data);
      })
      .catch((error) => {
        console.log("Error while fetching a product.", error);
      });

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
  }, [params.id, accessToken]);

  useEffect(() => {
    const listCommentsUrl = new URL(
      `${URLS.PRODUCT_COMMENT_URL}/`.replace(
        ":productId",
        params.id.toString(),
      ),
    );
    listCommentsUrl.search = new URLSearchParams({
      page: commentPage.toString(),
    }).toString();

    fetch(listCommentsUrl, {
      method: "GET",
    })
      .then(async (response) => {
        const data: CommentsPaginatedResponseType = await response.json();
        setComments(data.results);
        setCommentTotalPages(data.total_pages);
      })
      .catch((error) => {
        console.log("Error while fetching comments.", error);
      });
  }, [params.id, commentPage]);

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
      product: product.id,
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

  const handleRatingChange = (event: any, newValue: number | null) => {
    console.log(newValue);
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
          {isLoggedIn ? (
            <Grid
              container
              item
              sx={{
                width: { xs: 350, sm: 500, md: 700 },
              }}
            >
              <Grid
                container
                item
                xs={12}
                sx={{ p: 2 }}
                gap={{ xs: 2, sm: 3, md: 2 }}
              >
                <Grid item xs={12}>
                  <FormInput
                    name={"message"}
                    control={control}
                    label={"Comment"}
                    type={"text"}
                    multiline
                    rows={2}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Button
                    label="Add Comment"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit(onCommentSubmit)}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ mt: 1, letterSpacing: "0.5px" }}
            >
              Please <Link href="/login">login</Link> to review
            </Typography>
          )}

          {comments.length ? (
            <Grid
              container
              item
              direction={"column"}
              alignItems={"start"}
              justifyContent={"center"}
              gap={2}
              sx={{
                ml: 2,
                mb: 3,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                width: { xs: 350, sm: 500, md: 700 },
              }}
            >
              {comments.map((comment, index) => (
                <React.Fragment key={index}>
                  <Grid
                    key={comment.id}
                    item
                    sx={{
                      px: 2,
                      height: "50px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <Typography variant="body1" component="p" letterSpacing="1">
                      {comment.message}
                    </Typography>
                    <Typography variant="body1" component="p">
                      {comment.created_date}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
              <Grid
                item
                xs={12}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  my: 1,
                }}
              >
                <Stack
                  spacing={2}
                  sx={{ display: "flex", justifySelf: "center" }}
                >
                  <Pagination
                    count={commentTotalPages}
                    page={commentPage}
                    onChange={handleCommentPageChange}
                    color="primary"
                  />
                </Stack>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="subtitle2" component="h2" sx={{ mt: 2 }}>
              There are no reviews for this product.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
