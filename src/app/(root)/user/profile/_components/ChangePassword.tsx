"use client";

import * as Yup from "yup";
import { Grid } from "@mui/material";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";

import { RootState } from "@/redux/store";
import FormButton from "@/components/Form/FormButton";
import FormInput from "@/components/Form/FormInput";
import { openToast } from "@/redux/features/toastSlice";
import { removeForgotPasswordEmail } from "@/redux/features/userSlice";
import URLS from "@/utils/urls";

const ChangePassword = () => {
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
                            <Grid container item>
                                <FormInput
                                    variant="outlined"
                                    label="New Password"
                                    type="password"
                                    name="new_password"
                                    StartIcon={LockIcon}
                                />
                                <FormInput
                                    variant="outlined"
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

export default ChangePassword;