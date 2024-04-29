"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import * as Yup from "yup";

import FormInput from "@/components/Form/FormInput";
import FormButton from "@/components/Form/FormButton";
import CustomForm from "@/components/Form";
import { openToast } from "@/redux/features/toastSlice";
import URLS from "@/utils/urls";
import { RootState } from "@/redux/store";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";

interface IFormInput {
  otp_code: string;
  email: string;
}

const validationSchema = Yup.object({
  otp_code: Yup.string().required("OTP code is required").length(6),
});

const VerifyOTPPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const forgotPasswordEmail = useSelector(
    (state: RootState) => state.user.forgotPasswordEmail,
  );

  const initialValues: IFormInput = {
    otp_code: "",
    email: forgotPasswordEmail,
  };

  const { handleSubmit, control } = useForm<IFormInput>({
    defaultValues: initialValues,
  });

  const onSubmit = async (formData: IFormInput) => {
    const response = await fetch(URLS.VERIFY_FORGOT_PASSWORD_OTP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      dispatch(
        openToast({
          message: "OTP verified",
          severity: "success",
        }),
      );

      router.push("/forgot-password/new-password");
    } else {
      dispatch(
        openToast({
          message: "OTP verification failed",
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
            Verify OTP
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
              name={"otp_code"}
              control={control}
              label={"OTP Code"}
              type={"text"}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              label="Verify OTP"
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

export default VerifyOTPPage;
