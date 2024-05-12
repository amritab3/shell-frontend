"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import FormSelect from "@/components/Form/FormSelect";
import FormInput from "@/components/Form/FormInput";
import MultipleFileUpload from "@/components/Form/MultipleFileUpload";
import URLS from "@/utils/urls";
import Button from "@/components/Button";
import { FormSelectOption, UploadProductSize } from "@/utils/schema";
import UploadSizes from "./UploadSizes";
import { openToast } from "@/redux/features/toastSlice";
import HttpError from "@/utils/HttpError";

export interface IFormInput {
  name: string;
  description: string;
  price: string;
  color: string;
  style: string;
  material: string;
  category: string;
  gender: string;
  uploaded_sizes: Array<UploadProductSize>;
  uploaded_images: Array<any>;
  type: string;
}

const validationSchema = Yup.object({});

const AddProductForm = () => {
  const initialValues: IFormInput = {
    name: "",
    description: "",
    price: "",
    color: "",
    style: "",
    material: "",
    category: "",
    gender: "",
    uploaded_images: [],
    uploaded_sizes: [],
    type: "instore",
  };

  const { handleSubmit, control, reset } = useForm<IFormInput>({
    defaultValues: initialValues,
  });
  const [productGenderChoices, setProductGenderChoices] = useState(
    [] as Array<FormSelectOption>,
  );
  const [productCategoryChoices, setProductCategoryChoices] = useState(
    [] as Array<FormSelectOption>,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    fetch(URLS.PRODUCT_GENDER_CHOICES, {
      method: "GET",
    }).then(async (resp) => {
      const data: Array<FormSelectOption> = await resp.json();
      setProductGenderChoices(data);
    });

    fetch(URLS.PRODUCT_CATEGORY_CHOICES, {
      method: "GET",
    }).then(async (resp) => {
      const data: Array<FormSelectOption> = await resp.json();
      setProductCategoryChoices(data);
    });
  }, []);

  const onSubmit = async (submittedFormData: any) => {
    const { uploaded_images, uploaded_sizes, ...restValues } =
      submittedFormData;

    let formData = new FormData();
    for (let key in restValues) {
      formData.append(key, restValues[key]);
    }
    for (const image of uploaded_images) {
      formData.append("uploaded_images", image, image.name);
    }
    formData.append("uploaded_sizes", JSON.stringify(uploaded_sizes));

    fetch(`${URLS.PRODUCTS_URL}/`, {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) {
          const addProductErrorResponse = await response.json();
          throw new HttpError(
            addProductErrorResponse.detail,
            response.status,
            response.statusText,
            {
              cause: addProductErrorResponse.code,
            },
          );
        }
        dispatch(
          openToast({
            message: "Instore product added successfully",
            severity: "success",
          }),
        );
        router.push("/admin/products/instore");
        reset(initialValues);
      })
      .catch((error) => {
        console.log("Error while adding the product", error);
        dispatch(
          openToast({
            message: "Instore product could not be added",
            severity: "error",
          }),
        );
      });
  };
  return (
    <Grid container item alignItems="center" justifyContent="center" xs={12}>
      <Grid
        container
        item
        sx={{
          width: { xs: 350, sm: 500, md: 600, xl: 1200 },
          boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.4)",
          mb: { xs: 5, sm: 10, md: 20 },
        }}
      >
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              bgcolor: "background.formTitleBg",
              color: "text.onPrimaryBg",
              width: "auto",
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              textAlign: "center",
              height: "50px",
              lineHeight: "50px",
              mb: 2,
            }}
          >
            Add Instore Product
          </Typography>
        </Grid>
        <form>
          <Grid
            container
            item
            xs={12}
            sx={{ p: 2 }}
            flexGrow={1}
            justifyContent={"space-evenly"}
            gap={2}
            flexWrap={"wrap"}
          >
            <Grid item xs={5}>
              <FormInput name={"name"} control={control} label={"Name"} />
            </Grid>
            <Grid item xs={5}>
              <FormInput name={"price"} control={control} label={"Price"} />
            </Grid>
            <Grid item xs={5}>
              <FormInput
                name={"description"}
                control={control}
                label={"Description"}
                multiline
              />
            </Grid>

            <Grid item xs={5}>
              <FormInput name={"color"} control={control} label={"Color"} />
            </Grid>

            <Grid item xs={5}>
              <FormInput name={"style"} control={control} label={"Style"} />
            </Grid>
            <Grid item xs={5}>
              <FormInput
                name={"material"}
                control={control}
                label={"Material"}
              />
            </Grid>

            <Grid item xs={5}>
              <FormSelect
                name={"category"}
                control={control}
                label={"Category"}
                options={productCategoryChoices}
                fullWidth
              />
            </Grid>
            <Grid item xs={5}>
              <FormSelect
                name={"gender"}
                control={control}
                label={"Gender"}
                options={productGenderChoices}
                fullWidth
              />
            </Grid>

            <Grid container item xs={5} sx={{ flex: 0 }}>
              <UploadSizes
                name={"uploaded_sizes"}
                control={control}
                label={"Product Sizes"}
              />
            </Grid>

            <Grid
              container
              item
              xs={5}
              sx={{
                flex: 0,
              }}
            >
              <MultipleFileUpload
                label="Upload"
                name="uploaded_images"
                control={control}
                variant="contained"
              />
            </Grid>

            <Grid container item xs={12} gap={2}>
              <Grid item xs={2}>
                <Button
                  label="Submit"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  label="Reset"
                  fullWidth
                  variant="contained"
                  onClick={() => reset(initialValues)}
                />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddProductForm;
