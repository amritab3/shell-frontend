"use client";

import React, { useEffect, useState } from "react";

import { Grid, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import {
  FormSelectOption,
  SelectItemType,
  ProductPaginatedResponseType,
  Product,
} from "@/utils/schema";
import ProductCard from "@/components/Card/ProductCard";
import Button from "@/components/Button";
import Select from "@/components/Select";
import URLS from "@/utils/urls";
import { objectExists } from "@/utils/Utils";
import Input from "@/components/Input";

interface ProductFilterType {
  category?: string;
}

const sortSelectItems: Array<SelectItemType> = [
  {
    label: "Name (A-Z)",
    value: "name",
  },
  {
    label: "Name (Z-A)",
    value: "-name",
  },
  {
    label: "Price (High-Low)",
    value: "-price",
  },
  {
    label: "Price (Low-High)",
    value: "price",
  },
];

interface ProductsPage {
  productsUrl: string;
  pageTitle: string;
}

const Products = (props: ProductsPage) => {
  const { productsUrl, pageTitle } = props;
  const [products, setProducts] = useState<Array<Product>>([]);
  const [productCategories, setProductCategories] = useState(
    [] as Array<FormSelectOption>,
  );

  const [filterByCategory, setFilterByCategory] = useState("");
  const [sortByValue, setSortByValue] = useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  useEffect(() => {
    fetch(URLS.PRODUCT_CATEGORY_CHOICES, {
      method: "GET",
    }).then(async (resp) => {
      const data: Array<FormSelectOption> = await resp.json();
      setProductCategories(data);
    });
  }, []);

  useEffect(() => {
    const listProductsUrl = new URL(productsUrl);

    listProductsUrl.search = new URLSearchParams({
      page: page.toString(),
    }).toString();

    if (objectExists(filterByCategory)) {
      listProductsUrl.search = new URLSearchParams({
        page: page.toString(),
        category: filterByCategory,
      }).toString();
    }

    if (sortByValue) {
      listProductsUrl.search = new URLSearchParams({
        page: page.toString(),
        category: filterByCategory,
        ordering: sortByValue,
      }).toString();
    }

    fetch(listProductsUrl, {
      method: "GET",
    })
      .then(async (response) => {
        const data: ProductPaginatedResponseType = await response.json();
        setProducts(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
        console.log("Error while fetching products", error);
      });
  }, [filterByCategory, sortByValue, page]);

  const handleCategoryFilterSelectChange = (e: any) => {
    setFilterByCategory(e.target.value);
  };

  const handleSortSelectChange = (e: any) => {
    setSortByValue(e.target.value);
  };

  return (
    <Grid
      container
      item
      justifyContent="center"
      spacing={2}
      xs={12}
      marginX={8}
    >
      <Grid item container>
        <Grid item xs={12} marginBottom={2}>
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
              {pageTitle}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4"> {pageTitle} </Typography>
          <Divider sx={{ marginY: 2 }} />
        </Grid>
        <Grid item container xs={12}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "inherit", letterSpacing: 1 }}
          >
            Refine Search
          </Typography>
          <Grid
            container
            item
            spacing={2}
            sx={{ mt: "1px" }}
            xs={12}
            justifyContent={"space-between"}
          >
            <Grid item container xs={7} alignItems={"center"} gap={5}>
              <Grid item xs={5}>
                <Input
                  size={"small"}
                  label="Search"
                  variant="outlined"
                  placeholder={"Search by name"}
                />
              </Grid>
              <Grid item xs={2}>
                <Button label={"Search"} variant={"contained"} fullWidth />
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={3}
              alignItems="center"
              justifyContent="flex-end"
              gap={5}
            >
              <Grid item>
                <Select
                  id="sortBy"
                  label="Filter By Category"
                  selectItems={productCategories}
                  value={filterByCategory}
                  onChange={handleCategoryFilterSelectChange}
                  fullWidth
                />
              </Grid>

              <Grid item>
                <Select
                  id="sortBy"
                  label="Sort By"
                  selectItems={sortSelectItems}
                  value={sortByValue}
                  onChange={handleSortSelectChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={4} justifyContent="flex-start">
        {products.map((product) => {
          return (
            <Grid
              item
              xs={3}
              key={product.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: 2,
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Products;
