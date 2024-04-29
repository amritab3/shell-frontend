"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";

import FormInput from "@/components/Form/FormInput";
import FormButton from "@/components/Form/FormButton";
import CustomForm from "@/components/Form";
import { openToast } from "@/redux/features/toastSlice";
import { removeForgotPasswordEmail } from "@/redux/features/userSlice";
import URLS from "@/utils/urls";
import { RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@/components/Button";

interface IFormInput {
  new_password: string;
  confirm_new_password: string;
  email: string;
}

const validationSchema = Yup.object({
  new_password: Yup.string()
    .required("Password is required.")
    .min(6, "Password should be 6 characters minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character.",
    ),
  confirm_new_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_password")], "Passwords must match"),
});

const NewPasswordPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const forgotPasswordEmail = useSelector(
    (state: RootState) => state.user.forgotPasswordEmail,
  );

  const initialValues: IFormInput = {
    email: forgotPasswordEmail,
    new_password: "",
    confirm_new_password: "",
  };

  const { handleSubmit, control } = useForm<IFormInput>({
    defaultValues: initialValues,
  });

  const onSubmit = async (formData: IFormInput) => {
    const response = await fetch(URLS.UPDATE_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      dispatch(removeForgotPasswordEmail());
      dispatch(
        openToast({
          message: "Password successfully updated",
          severity: "success",
        }),
      );

      router.push("/login");
    } else {
      dispatch(
        openToast({
          message: "Password update failed",
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
              name={"new_password"}
              control={control}
              label={"New Password"}
              type={"password"}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              name={"confirm_new_password"}
              control={control}
              label={"Confirm New Password"}
              type={"password"}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              label="Change Password"
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

export default NewPasswordPage;
