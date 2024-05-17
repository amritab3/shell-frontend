"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import FormInput from "@/components/Form/FormInput";
import Button from "@/components/Button";
import URLS from "@/utils/urls";
import { openToast } from "@/redux/features/toastSlice";
import HttpError from "@/utils/HttpError";
import { RootState } from "@/redux/store";

export interface IFormInput {
  name: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
      .required("Role Name is required"),
}).required();

const AddRoleForm = () => {
  const initialValues: IFormInput = {
    name: "",
  };

  const { handleSubmit, control, reset } = useForm<IFormInput>({
    defaultValues: initialValues,
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const accessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );

  const onSubmit = async (submittedFormData: IFormInput) => {
    fetch(URLS.ADMIN_ROLES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(submittedFormData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const addRoleResponse = await response.json();
          throw new HttpError(
            addRoleResponse.detail,
            response.status,
            response.statusText,
            {
              cause: addRoleResponse.code,
            },
          );
        }
        dispatch(
          openToast({
            message: "Role added successfully",
            severity: "success",
          }),
        );
        router.push("/admin/users/roles/");
      })
      .catch((error) => {
        console.log("Error: ", error);
        dispatch(
          openToast({
            message: "Role could not be added",
            severity: "error",
          }),
        );
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
            Add Role
          </Typography>
        </Grid>
        <Grid container item xs={12} sx={{ p: 2 }} gap={3}>
          <Grid item xs={12} marginRight={2}>
            <FormInput name={"name"} control={control} label={"Role Name"} />
          </Grid>

          <Grid container item xs={12} justifyContent="space-evenly">
            <Grid item xs={5}>
              <Button
                label="Submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              />
            </Grid>
            <Grid item xs={5}>
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

export default AddRoleForm;
