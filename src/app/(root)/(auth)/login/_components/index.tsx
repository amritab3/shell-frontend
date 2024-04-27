"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import * as Yup from "yup";

import FormInput from "@/components/Form/FormInput";
import FormButton from "@/components/Form/FormButton";
import CustomForm from "@/components/Form";
import { login, setAvatarUrl } from "@/redux/features/userSlice";
import { openToast } from "@/redux/features/toastSlice";
import URLS from "@/utils/urls";
import { UserType } from "@/utils/schema";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: any, actions: any) => {
    const response = await fetch(URLS.USER_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(login(data));
      dispatch(
        openToast({
          message: "User Login Successful",
          severity: "success",
        }),
      );

      const userData = JSON.parse(data.user);

      fetch(`${URLS.USER_URL}/${userData.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      })
        .then(async (response) => {
          const responseData: UserType = await response.json();
          dispatch(setAvatarUrl(responseData.avatar));
        })
        .catch((error) => {
          console.log("Error while fetching user details", error);
        });

      actions.setSubmitting(false);
      actions.resetForm(initialValues);
      router.push("/");
    } else {
      dispatch(openToast({ message: "User Login Failed", severity: "error" }));
      actions.setSubmitting(false);
    }
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <CustomForm
        title="Login"
        initialValues={initialValues}
        submitHandler={handleSubmit}
        validationSchema={validationSchema}
        showBoxShadow
        sx={{ maxHeight: { xl: 350, xxl: 340 } }}
      >
        <Grid
          container
          item
          sx={{
            width: "500px",
          }}
        >
          <Grid container item sx={{ margin: 2 }}>
            <FormInput
              variant="standard"
              label="Email"
              type="text"
              name="email"
              StartIcon={PersonIcon}
            />
            <FormInput
              variant="standard"
              label="Password"
              type="password"
              name="password"
              StartIcon={LockIcon}
            />

            <FormButton variant="contained" type="submit" label="Log In" />
          </Grid>

          <Grid container item sx={{ margin: 2 }}>
            <Grid item xs>
              <Link href="/forgot-password/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register/" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </CustomForm>
    </Grid>
  );
};

export default LoginPage;
