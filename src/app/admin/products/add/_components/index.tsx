"use client";

import React from "react";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import FormInput from "@/components/Form/FormInput";
import MultipleFileUpload from "@/components/Form/MultipleFileUpload";
import URLS from "@/utils/urls";
import Button from "@/components/Button";
import { UploadProductSize } from "@/utils/schema";
import UploadSizes from "./UploadSizes";

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
  };

  const { handleSubmit, control, reset } = useForm<IFormInput>({
    defaultValues: initialValues,
  });

  const onSubmit = async (submittedFormData: any) => {
    console.log("Data: ", submittedFormData);
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
        const responseData = await response.json();
        console.log("response", responseData);
        reset(initialValues);
      })
      .catch((error) => {
        console.log("Error while fetching adding the product", error);
      });
  };
  return (
    <Grid container item alignItems="center" justifyContent="center" xs={12}>
      <Grid
        container
        item
        sx={{
          width: { xs: 350, sm: 500, md: 600 },
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
            Add Product
          </Typography>
        </Grid>
        <Grid container item xs={12} sx={{ p: 2 }} flexGrow={1}>
          <Grid container item xs={5} gap={3} marginRight={2}>
            <Grid item xs={12}>
              <FormInput name={"name"} control={control} label={"Name"} />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name={"description"}
                control={control}
                label={"Description"}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Grid container item xs={5} gap={2}>
            <Grid
              container
              item
              spacing={1}
              xs={12}
              justifyContent="space-evenly"
            >
              <Grid item xs={6}>
                <FormInput name={"price"} control={control} label={"Price"} />
              </Grid>
              <Grid item xs={6}>
                <FormInput name={"color"} control={control} label={"Color"} />
              </Grid>
            </Grid>

            <Grid
              container
              item
              spacing={1}
              xs={12}
              justifyContent="space-evenly"
            >
              <Grid item xs={6}>
                <FormInput name={"style"} control={control} label={"Style"} />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name={"material"}
                  control={control}
                  label={"Material"}
                />
              </Grid>
            </Grid>

            <Grid
              container
              item
              spacing={1}
              xs={12}
              justifyContent="space-evenly"
            >
              <Grid item xs={6}>
                <FormInput
                  name={"category"}
                  control={control}
                  label={"Category"}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput name={"gender"} control={control} label={"Gender"} />
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <UploadSizes
              name={"uploaded_sizes"}
              control={control}
              label={"Product Sizes"}
            />
          </Grid>

          <Grid item xs={12}>
            <MultipleFileUpload
              label="Upload"
              name="uploaded_images"
              control={control}
              variant="contained"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              label="Submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            />
            <Button
              label="Reset"
              fullWidth
              variant="contained"
              onClick={() => reset(initialValues)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddProductForm;
