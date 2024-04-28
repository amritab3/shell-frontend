"use client";

import React from "react";

import * as Yup from "yup";
import Grid from "@mui/material/Grid";

import CustomForm from "@/components/Form";
import FormInput from "@/components/Form/FormInput";
import FormButton from "@/components/Form/FormButton";
import MultipleFileUpload from "@/components/MultipleFileUpload";
import URLS from "@/utils/urls";

const validationSchema = Yup.object({});

const AddProductForm = () => {
  const initialValues = {
    name: "",
    description: "",
    price: "",
    color: "",
    style: "",
    material: "",
    category: "",
    gender: "",
    uploaded_images: [],
    uploaded_sizes: [
      { size: "M", size_inventory: 5 },
      { size: "L", size_inventory: 7 },
    ],
  };

  const handleSubmit = async (values: any, actions: any) => {
    const { uploaded_images, uploaded_sizes, ...restValues } = values;

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
        actions.setSubmitting(false);
        actions.resetForm();
      })
      .catch((error) => {
        console.log("Error while fetching user details", error);
        actions.setSubmitting(false);
      });
  };
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="center"
      xs={12}
      width="100%"
    >
      <CustomForm
        title="Add Product"
        initialValues={initialValues}
        submitHandler={handleSubmit}
        validationSchema={validationSchema}
      >
        <Grid container item>
          <Grid container item sx={{ margin: 2 }} xs={12} direction={"column"}>
            <Grid item>
              <FormInput
                variant="outlined"
                label="Name"
                type="text"
                name="name"
              />
            </Grid>
            <Grid item>
              <FormInput
                variant="outlined"
                label="Description"
                type="text"
                name="description"
              />
            </Grid>

            <Grid container item spacing={4}>
              <Grid item xs={4}>
                <FormInput
                  variant="outlined"
                  label="Price"
                  type="text"
                  name="price"
                />
              </Grid>

              <Grid item xs={4}>
                <FormInput
                  variant="outlined"
                  label="Color"
                  type="text"
                  name="color"
                />
              </Grid>

              <Grid item xs={4}>
                <FormInput
                  variant="outlined"
                  label="Style"
                  type="text"
                  name="style"
                />
              </Grid>
            </Grid>

            <Grid container item spacing={4}>
              <Grid item xs={4}>
                <FormInput
                  variant="outlined"
                  label="Material"
                  type="text"
                  name="material"
                />
              </Grid>

              <Grid item xs={4}>
                <FormInput
                  variant="outlined"
                  label="Category"
                  type="text"
                  name="category"
                />
              </Grid>

              <Grid item xs={4}>
                <FormInput
                  variant="outlined"
                  label="Gender"
                  type="text"
                  name="gender"
                />
              </Grid>
            </Grid>
            <Grid item>
              <MultipleFileUpload
                label="Upload"
                name="uploaded_images"
                variant="contained"
              />
            </Grid>
            <Grid item sx={{ mt: 5 }}>
              <FormButton variant="contained" type="submit" label="Submit" />
            </Grid>
          </Grid>
        </Grid>
      </CustomForm>
    </Grid>
  );
};

export default AddProductForm;
