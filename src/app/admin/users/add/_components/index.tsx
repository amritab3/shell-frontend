"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import FormSelect from "@/components/Form/FormSelect";
import FormMultiSelect from "@/components/Form/FormMultiSelect";
import FormInput from "@/components/Form/FormInput";
import Button from "@/components/Button";
import URLS from "@/utils/urls";
import { openToast } from "@/redux/features/toastSlice";

export interface IFormInput {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  gender: string;
  roles: Array<number>;
}

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name can only contain letters"),
  last_name: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name can only contain letters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile_no: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Mobile number can only contain digits")
    .min(10, "Mobile number should be at least 10 digits")
    .max(15, "Mobile number should not exceed 15 digits"),
    gender: Yup.string()
    .required("Gender is required"), 
    roles: Yup.string()
    .required("Roles is required"),
}).required();

const AddUserForm = () => {
  const initialValues: IFormInput = {
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    gender: "",
    roles: [],
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (submittedFormData: any) => {
    let formData = new FormData();
    for (let key in submittedFormData) {
      formData.append(key, submittedFormData[key]);
    }

    fetch(URLS.ADMIN_ADD_USER, {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        dispatch(
          openToast({
            message: "User added successfully",
            severity: "success",
          }),
        );
        router.push("/admin/users/");
      })
      .catch((error) => {
        console.log("Error: ", error);
        dispatch(
          openToast({
            message: "User could not be added",
            severity: "error",
          }),
        );
      });
  };

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const roleOptions = [
    { label: "Admin", value: 1 },
    { label: "Shop Admin", value: 2 },
    { label: "Customer", value: 3 },
  ];

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
            Add User
          </Typography>
        </Grid>
        <Grid container item xs={12} sx={{ p: 2 }} flexGrow={1}>
          <Grid container spacing={3} marginRight={2}>
            <Grid item xs={6}>
              <FormInput
                name={"first_name"}
                control={control}
                label={"First Name"}
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                name={"last_name"}
                control={control}
                label={"Last Name"}
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput name={"email"} control={control} label={"Email"} />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                name={"mobile_no"}
                control={control}
                label={"Mobile Number"}
              />
            </Grid>

            <Grid item xs={6}>
              <FormSelect
                label={"Gender"}
                name={"gender"}
                control={control}
                options={genderOptions}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <FormMultiSelect
                label={"Roles"}
                name={"roles"}
                control={control}
                options={roleOptions}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid item xs={12} marginTop={5}>
            <Grid container gap={2}>
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
    </Grid>
  );
};

export default AddUserForm;
