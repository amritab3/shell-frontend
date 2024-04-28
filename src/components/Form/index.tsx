"use client";

import React, { ReactNode } from "react";

import Grid from "@mui/material/Grid";

import { Formik, Form } from "formik";
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
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form>
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
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default CustomForm;
