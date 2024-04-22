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
import Typography from "@mui/material/Typography";
import UploadIcon from "@mui/icons-material/Upload";

import withAuth from "@/hoc/withAuth";
import FormInput from "@/components/Form/FormInput";
import FormButton from "@/components/Form/FormButton";
import { RootState } from "@/redux/store";
import URLS from "@/utils/urls";
import { removeForgotPasswordEmail } from "@/redux/features/userSlice";
import { openToast } from "@/redux/features/toastSlice";
import Button from "@/components/Button";
import AddressCard from "@/components/Card/AddressCard";
import { UserAddress } from "@/utils/schema";

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

const UserAddresses = () => {
  const addresses: Array<UserAddress> = [
    {
      id: 1,
      province: "Lumbini",
      district: "Dang",
      localLevel: "Tulsipur",
      wardNo: "17",
      tole: "Baghausi",
    },
    {
      id: 2,
      province: "Lumbini",
      district: "Dang",
      localLevel: "Tulsipur",
      wardNo: "17",
      tole: "Baghausi",
    },
    {
      id: 3,
      province: "Lumbini",
      district: "Dang",
      localLevel: "Tulsipur",
      wardNo: "17",
      tole: "Baghausi",
    },
    {
      id: 4,
      province: "Lumbini",
      district: "Dang",
      localLevel: "Tulsipur",
      wardNo: "17",
      tole: "Baghausi",
    },
  ];
  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Button label="Add New Address" variant="contained" />
      </Grid>
      <Grid container item gap={2} justifyContent="space-evenly">
        {addresses.map((address) => {
          return <AddressCard key={address.id} address={address} />;
        })}
      </Grid>
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
        width: "100%",
        pt: 8,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="User Profile Tabs"
          variant="fullWidth"
          sx={{ width: "100%" }}
          centered
        >
          <Tab label="General Information" {...a11yProps(0)} />
          <Tab label="Password" {...a11yProps(1)} />
          <Tab label="Addresses" {...a11yProps(2)} />
          <Tab label="Orders" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <div
        role="tabpanel"
        hidden={value !== 0}
        id={`simple-tabpanel-0`}
        aria-labelledby={`simple-tab-0`}
      >
        {value === 0 && (
          <Box sx={{ p: 3 }}>
            <Grid container>
              <Grid item>
                <Box component="img" />
                <Button label="Upload New" variant="outlined" />
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        )}
      </div>

      <div
        role="tabpanel"
        hidden={value !== 1}
        id={`simple-tabpanel-1`}
        aria-labelledby={`simple-tab-1`}
      >
        {value === 1 && (
          <Box sx={{ p: 3 }}>
            <ChangePassword />
          </Box>
        )}
      </div>

      <div
        role="tabpanel"
        hidden={value !== 2}
        id={`simple-tabpanel-2`}
        aria-labelledby={`simple-tab-2`}
      >
        {value === 2 && (
          <Box sx={{ p: 3 }}>
            <UserAddresses />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default withAuth(UserProfile);
