"use client";

import React, { useEffect, useState } from "react";

import { Grid, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { FormSelectOption, Product, SelectItemType } from "@/utils/schema";
import ProductCard from "@/components/Card/ProductCard";
import Button from "@/components/Button";
import Select from "@/components/Select";
import URLS from "@/utils/urls";
import { objectExists } from "@/utils/Utils";

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

const KidsProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [productCategories, setProductCategories] = useState(
    [] as Array<FormSelectOption>,
  );
  const [productFilters, setProductFilters] = useState({} as ProductFilterType);
  const [sortByValue, setSortByValue] = useState("");

  useEffect(() => {
    fetch(URLS.PRODUCT_CATEGORY_CHOICES, {
      method: "GET",
    }).then(async (resp) => {
      const data: Array<FormSelectOption> = await resp.json();
      setProductCategories(data);
    });
  }, []);

  useEffect(() => {
    const listKidsProductsUrl = new URL(URLS.LIST_KIDS_PRODUCTS);

    if (objectExists(productFilters)) {
      listKidsProductsUrl.search = new URLSearchParams({
        ...productFilters,
      }).toString();
    }

    if (sortByValue) {
      listKidsProductsUrl.search = new URLSearchParams({
        ordering: sortByValue,
      }).toString();
    }

    fetch(listKidsProductsUrl, {
      method: "GET",
    })
      .then(async (response) => {
        const data: Array<Product> = await response.json();
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error while fetching Kids products", error);
      });
  }, [productFilters, sortByValue]);

  const filterWithCategory = (category: string) => {
    if (productFilters.category === category) {
      const existingProductFilters = { ...productFilters };
      delete existingProductFilters["category"];
      setProductFilters({ ...existingProductFilters });
      return;
    }
    setProductFilters({ ...productFilters, category });
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
              Kids
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4"> Kids </Typography>
          <Divider sx={{ marginY: 2 }} />
        </Grid>
        <Grid item container xs={12}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "inherit", letterSpacing: 1 }}
          >
            Refine Search
          </Typography>
          <Grid container item spacing={2} sx={{ mt: "1px" }}>
            {productCategories.map((productCategory) => {
              return (
                <Grid item key={productCategory.value}>
                  <Button
                    label={productCategory.label}
                    variant={
                      productFilters["category"] === productCategory.value
                        ? "contained"
                        : "outlined"
                    }
                    onClick={() =>
                      filterWithCategory(productCategory.value.toString())
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid
          container
          item
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          marginY={2}
        >
          <Select
            id="sortBy"
            label="Sort By"
            selectItems={sortSelectItems}
            value={sortByValue}
            onChange={handleSortSelectChange}
          />
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
          <Pagination count={10} color="primary" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default KidsProducts;
