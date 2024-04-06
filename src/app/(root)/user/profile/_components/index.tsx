"use client";

import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";

import withAuth from "@/hoc/withAuth";
import FormInput from "@/components/Form/FormInput";
import FormButton from "@/components/Form/FormButton";
import { RootState } from "@/redux/store";
import URLS from "@/utils/urls";
import { removeForgotPasswordEmail } from "@/redux/features/userSlice";
import { openToast } from "@/redux/features/toastSlice";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ChangePassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    new_password: Yup.string().required("Password is required"),
    confirm_new_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("new_password")], "Passwords must match"),
  });

  const forgotPasswordEmail = useSelector(
    (state: RootState) => state.user.userEmail,
  );

  const initialValues = {
    email: forgotPasswordEmail,
    new_password: "",
    confirm_new_password: "",
  };

  const handleSubmit = async (values: any, actions: any) => {
    const response = await fetch(URLS.UPDATE_PASSWORD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      dispatch(removeForgotPasswordEmail());
      dispatch(
        openToast({
          message: "Password successfully updated",
          severity: "success",
        }),
      );

      actions.setSubmitting(false);
      actions.resetForm(initialValues);
    } else {
      dispatch(
        openToast({
          message: "Password update failed",
          severity: "error",
        }),
      );
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
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        showBoxShadow
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid
              container
              item
              sx={{
                width: "400px",
              }}
            >
              <Grid container item sx={{ margin: 2 }}>
                <FormInput
                  variant="standard"
                  label="New Password"
                  type="password"
                  name="new_password"
                  StartIcon={LockIcon}
                />
                <FormInput
                  variant="standard"
                  label="Confirm New Password"
                  type="password"
                  name="confirm_new_password"
                  StartIcon={LockIcon}
                />

                <FormButton
                  variant="contained"
                  type="submit"
                  label="Change Password"
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

const UserProfile = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        // bgcolor: "background.paper",
        display: "flex",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="User Profile Tabs"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="General Information" {...a11yProps(0)} />
        <Tab label="Password" {...a11yProps(1)} />
        <Tab label="Addresses" {...a11yProps(2)} />
        <Tab label="Orders" {...a11yProps(3)} />
      </Tabs>

      <Grid container sx={{ p: 3 }}>
        <Grid
          container
          item
          xs={12}
          hidden={value !== 0}
          sx={{ display: value === 0 ? "flex" : "none" }}
        >
          <Grid item xs={2}>
            <Box
              component="img"
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
              sx={{
                height: "auto",
                width: "auto",
                maxHeight: { xs: 90, md: 130, lg: 180 },
                // maxWidth: { xs: 350, md: 250, lg: 1443 },
              }}
            />
          </Grid>
          <Grid item xs={10}>
            Other Info One
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          hidden={value !== 1}
          sx={{ display: value === 1 ? "flex" : "none" }}
        >
          <ChangePassword />
        </Grid>

        <Grid
          container
          item
          xs={12}
          hidden={value !== 2}
          sx={{ display: value === 2 ? "flex" : "none" }}
        >
          <Grid item xs={2}>
            <Box
              component="img"
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
              sx={{
                height: "auto",
                width: "auto",
                maxHeight: { xs: 90, md: 130, lg: 180 },
                // maxWidth: { xs: 350, md: 250, lg: 1443 },
              }}
            />
          </Grid>
          <Grid item xs={10}>
            Other Info Three
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          hidden={value !== 3}
          sx={{ display: value === 3 ? "flex" : "none" }}
        >
          <Grid item xs={2}>
            <Box
              component="img"
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg"
              sx={{
                height: "auto",
                width: "auto",
                maxHeight: { xs: 90, md: 130, lg: 180 },
                // maxWidth: { xs: 350, md: 250, lg: 1443 },
              }}
            />
          </Grid>
          <Grid item xs={10}>
            Other Info Four
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(UserProfile);
