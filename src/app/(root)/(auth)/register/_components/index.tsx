"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"


import { openToast } from "@/redux/features/toastSlice";
import URLS from "@/utils/urls";
import { Link, Typography } from "@mui/material";
import FormInput from "@/components/Form/FormInput";
import Button from "@/components/Button";

interface IFormInput {
  first_name: string,
  last_name: string,
  email: string;
  mobile_no: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password should be 6 characters minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character.",
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const initialValues: IFormInput = {
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    password: "",
    confirmPassword: "",
  };
  const { handleSubmit, control } = useForm<IFormInput>({
    defaultValues: initialValues,

  });

  const onSubmit = async (formData: IFormInput) => {
    const response = await fetch(URLS.USER_REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      dispatch(
        openToast({
          message: "User Registration Successful",
          severity: "success",
        }),
      );

      router.push("/");
    } else {
      dispatch(
        openToast({
          message: "User Registration Failed",
          severity: "error",
        }),
      );
      console.log("ERROR ENCOUNTERED");
    }
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
              width: "100%",
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              textAlign: "center",
              height: "50px",
              lineHeight: "50px",
              mb: 2,
            }}
          >
            Register
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sx={{ p: 2 }}
          gap={{ xs: 2, sm: 3, md: 5 }}
        >
          <Grid item xs={12}>
            <FormInput
              name={"first_name"}
              control={control}
              label={"First Name"}
              type={"text"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name={"last_name"}
              control={control}
              label={"Last Name"}
              type={"text"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name={"email"}
              control={control}
              label={"Email"}
              type={"email"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name={"mobile_no"}
              control={control}
              label={"Mobile Number"}
              type="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name={"password"}
              control={control}
              label={"Password"}
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              name={"confirmPassword"}
              control={control}
              label={"Confirm Password"}
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              label="Register"
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            />
          </Grid>
        </Grid>

        <Grid container item sx={{ margin: 2 }} justifyContent="center">
          <Grid item>
            <Link href="/login/" variant="body2">
              {"Already have an account?"}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
