"use client";

import React, { ReactNode } from "react";

import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";

import { Typography } from "@mui/material";

interface CustomFormProps {
  title: string;
  children: ReactNode;
  initialValues: Object;
  validationSchema: Object;
  submitHandler: any;
  showBoxShadow?: boolean;
  sx?: Object;
}

const CustomForm = (props: CustomFormProps) => {
  const {
    title,
    initialValues,
    submitHandler,
    validationSchema,
    showBoxShadow,
    children,
    sx,
  } = props;

  const { handleSubmit, reset, control, setValue } = useForm(initialValues);

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        padding: 0,
        boxShadow: showBoxShadow ? "0px 1px 2px 0px rgba(0,0,0,0.4)" : null,
        width: "auto",
        height: "auto",
        ...sx,
      }}
    >
      <Grid container>
        <Grid container item xs={12}>
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
            }}
          >
            {title}
          </Typography>
        </Grid>

        <Grid container item justifyContent="center" alignItems="center">
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomForm;
