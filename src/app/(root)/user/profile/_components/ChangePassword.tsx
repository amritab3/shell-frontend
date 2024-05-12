"use client";

import * as Yup from "yup";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";

import { RootState } from "@/redux/store";
import FormButton from "@/components/Form/FormButton";
import FormInput from "@/components/Form/FormInput";
import { openToast } from "@/redux/features/toastSlice";
import { removeForgotPasswordEmail } from "@/redux/features/userSlice";
import URLS from "@/utils/urls";
import Button from "@/components/Button";
import React from "react";

interface IFormInput {
  new_password: string;
  confirm_new_password: string;
  email: string;
}

const ChangePassword = () => {
  const dispatch = useDispatch();

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

  const forgotPasswordEmail = useSelector(
    (state: RootState) => state.user.userEmail,
  );

  const initialValues: IFormInput = {
    email: forgotPasswordEmail,
    new_password: "",
    confirm_new_password: "",
  };

  const { handleSubmit, control, reset } = useForm<IFormInput>({
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
      reset(initialValues);
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
    <Grid container item alignItems="center" justifyContent="center">
      <Grid container item xs={12} sx={{ p: 2 }} gap={{ xs: 2, sm: 3, md: 5 }}>
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
  );
};

export default ChangePassword;
