"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";

import FormInput from "@/components/Form/FormInput";
import { setForgotPasswordEmail } from "@/redux/features/userSlice";
import { openToast } from "@/redux/features/toastSlice";
import URLS from "@/utils/urls";
import { Link, Typography } from "@mui/material";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPasswordPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues: IFormInput = {
    email: "",
  };

  const { handleSubmit, control } = useForm<IFormInput>({
    defaultValues: initialValues,
  });

  const onSubmit = async (formData: IFormInput) => {
    const response = await fetch(URLS.GENERATE_FORGOT_PASSWORD_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();

      console.log("response", responseData);
      dispatch(setForgotPasswordEmail(formData));
      dispatch(
        openToast({
          message: "OTP generated successfully",
          severity: "success",
        }),
      );

      router.push("forgot-password/verify-otp");
    } else {
      dispatch(
        openToast({
          message: "OTP generation failed",
          severity: "error",
        }),
      );
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
            Forgot Password
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
              name={"email"}
              control={control}
              label={"Email"}
              type={"email"}
              StartIcon={PersonIcon}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              label="Generate OTP"
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordPage;
