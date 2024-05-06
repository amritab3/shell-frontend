"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import FileUpload from "@/components/Form/FileUpload";
import Button from "@/components/Button";
import FormInput from "@/components/Form/FormInput";
import { RootState } from "@/redux/store";
import { UserType } from "@/utils/schema";
import URLS, { BASE_URL } from "@/utils/urls";
import { objectExists } from "@/utils/Utils";
import { openToast } from "@/redux/features/toastSlice";
import { setAvatarUrl } from "@/redux/features/userSlice";

interface IFormInput {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  avatar: any;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const GeneralInformation = () => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state: RootState) => state.user.userID);
  const accessToken = useSelector(
    (state: RootState) => state.user.access_token,
  );
  const [userDetails, setUserDetails] = useState({} as UserType);
  const avatarUrl = useSelector((state: RootState) => state.user.userAvatarUrl);

  const initialValues: IFormInput = {
    first_name: objectExists(userDetails) ? userDetails.first_name : "",
    last_name: objectExists(userDetails) ? userDetails.last_name : "",
    email: objectExists(userDetails) ? userDetails.email : "",
    mobile_no: objectExists(userDetails) ? userDetails.mobile_no : "",
    avatar: null,
  };

  const { handleSubmit, control, reset, register } = useForm<IFormInput>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
    setAvatarUrl(userDetails.avatar);
  }, [userDetails]);

  useEffect(() => {
    fetch(`${URLS.USER_URL}/${loggedInUserId}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        const responseData: UserType = await response.json();
        setUserDetails(responseData);
      })
      .catch((error) => {
        console.log("Error while fetching user details", error);
        dispatch(
          openToast({
            message: "User details could not be fetched",
            severity: "error",
          }),
        );
      });
  }, []);

  const onSubmit = async (submittedFormData: any) => {
    const { avatar, ...restValues } = submittedFormData;

    let formData = new FormData();
    for (let key in restValues) {
      formData.append(key, restValues[key]);
    }
    if (avatar) {
      formData.append("avatar", avatar, avatar.name);
    }

    fetch(`${URLS.USER_URL}/${loggedInUserId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
      .then(async (response) => {
        const responseData: UserType = await response.json();
        setUserDetails(responseData);
        dispatch(setAvatarUrl(`${BASE_URL}${responseData.avatar}`));
        dispatch(
          openToast({
            message: "User details updated",
            severity: "success",
          }),
        );
      })
      .catch((error) => {
        console.log("Error while updating user details", error);
        dispatch(
          openToast({
            message: "User details could not be fetched",
            severity: "error",
          }),
        );
      });
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container item xs={12} gap={8}>
        <Grid
          container
          item
          xs={4}
          sx={{ justifyContent: "center", backgroundColor: "#f0f0f0" }}
        >
          <Grid item sx={{ m: 2 }}>
            <Box
              component="img"
              alt="Profile Picture"
              width={100}
              height={100} // Ensure equal width and height to make it circular
              borderRadius="50%" // Make it circular
              src={avatarUrl}
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginBottom={2}
            />
            <FileUpload
              name={"avatar"}
              control={control}
              label={"Upload Avatar"}
              startIcon={<CloudUploadIcon />}
              variant={"contained"}
            />
          </Grid>

          <Grid container item direction="column" sx={{ textAlign: "center" }}>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                {userDetails.first_name} {userDetails.last_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                {userDetails.email}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" gutterBottom>
                {userDetails.mobile_no}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item spacing={3} xs={7} justifyContent="center">
          <Grid item xs={6}>
            <FormInput
              name="first_name"
              control={control}
              label="First Name"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              name="last_name"
              control={control}
              label="Last Name"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              name="email"
              control={control}
              label="Email"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              name="mobile_no"
              control={control}
              label="Mobile Number"
              variant="outlined"
              type="text"
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              label="Save Changes"
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

export default GeneralInformation;
