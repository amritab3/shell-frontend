"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { login, setAvatarUrl } from "@/redux/features/userSlice";
import { openToast } from "@/redux/features/toastSlice";
import URLS from "@/utils/urls";
import { UserType } from "@/utils/schema";
import { Link, Typography } from "@mui/material";
import FormInput from "@/components/Form/FormInput";
import Button from "@/components/Button";
import { setCartOnLogin } from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";
import { removePreviousRoute } from "@/redux/features/miscSlice";

interface IFormInput {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
}).required();

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const initialValues: IFormInput = {
    email: "",
    password: "",
  };
  const { handleSubmit, control, setError } = useForm<IFormInput>({
    defaultValues: initialValues,
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });
  const previousRoute = useSelector((state: RootState) => state.misc.prevRoute);

  const onSubmit = async (formData: IFormInput) => {
    const response = await fetch(URLS.USER_LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const respData = await response.json();
      dispatch(login(respData));
      dispatch(
        openToast({
          message: "User Login Successful",
          severity: "success",
        }),
      );

      const userData = JSON.parse(respData.user);

      fetch(`${URLS.USER_URL}/${userData.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${respData.access}`,
        },
      })
        .then(async (response) => {
          const responseData: UserType = await response.json();
          dispatch(setAvatarUrl(responseData.avatar));
        })
        .catch((error) => {
          console.log("Error while fetching user details", error);
        });

      fetch(URLS.GET_USER_CART.replace(":userId", userData.id), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${respData.access}`,
        },
      })
        .then(async (response) => {
          if (response.ok) {
            const responseData = await response.json();
            dispatch(setCartOnLogin(responseData[0]));
          }
        })
        .catch((err) => {
          console.log("Error while fetching user cart", err);
        });

      if (previousRoute) {
        router.push(previousRoute);
        dispatch(removePreviousRoute());
      } else {
        router.push("/");
      }
    } else {
      dispatch(openToast({ message: "User Login Failed", severity: "error" }));
      const errResp = await response.json();
      const errorMessages = errResp.message;
      Object.keys(errResp.message).forEach((k) => {
        const key = k as keyof IFormInput;
        setError(key, {
          type: "custom",
          message: errorMessages[key],
        });
      });
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
            Login
          </Typography>
        </Grid>

        <form>
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
                autoComplete={"username"}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                name={"password"}
                control={control}
                label={"Password"}
                type="password"
                autoComplete={"current-password"}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                label="Login"
                fullWidth
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              />
            </Grid>
          </Grid>
        </form>

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
    </Grid>
  );
};

export default LoginPage;
