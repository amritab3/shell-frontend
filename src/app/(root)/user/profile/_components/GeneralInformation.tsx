"use client";

import * as Yup from "yup";
import { Box, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import FormInput from "@/components/Form/FormInput";
import FormButton from "@/components/Form/FormButton";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const GeneralInformation = () => {

    const validationSchema = Yup.object({

    });

    const initialValues = {
        first_name: "Shelly",
        last_name: "Bhattarai",
        email: "shelly@gmail.com",
        mobile_no: "9819057663",


    };

    const handleSubmit = async (values: any, actions: any) => {
        console.log(values);
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
                            xs={12}
                            gap={8}
                        >
                            <Grid container item xs={4} sx={{ justifyContent: "center", backgroundColor: '#f0f0f0' }} >
                                <Grid item sx={{ m: 2 }}>
                                    <Box
                                        component="img"
                                        alt="Profile Picture"
                                        width={100}
                                        height={100} // Ensure equal width and height to make it circular
                                        borderRadius="50%" // Make it circular
                                        src="https://mode23nepal.com/image/catalog/Product/check%20tops/DSC09670.jpg"

                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        marginBottom={2}
                                    />
                                    <Button
                                        sx={{ mb: 2 }}
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}

                                    >
                                        Upload file
                                        <VisuallyHiddenInput type="file" />
                                    </Button>

                                </Grid>

                                <Grid container item direction="column" sx={{ textAlign: "center" }}>
                                    <Grid item>
                                        <Typography variant="h6" gutterBottom>Shelly Bhattarai</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" gutterBottom>shelly@gmail.com</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6" gutterBottom>9819057663</Typography>
                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid container item spacing={3} xs={7} justifyContent="center">
                                <Grid item xs={6}>
                                    <FormInput
                                        variant="outlined"
                                        label="First Name"
                                        type="text"
                                        name="first_name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        variant="outlined"
                                        label="Last Name"
                                        type="text"
                                        name="last_name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        variant="outlined"
                                        label="Email"
                                        type="text"
                                        name="email"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormInput
                                        variant="outlined"
                                        label="Mobile Number"
                                        type="text"
                                        name="mobile_no"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <FormButton
                                        variant="contained"
                                        type="submit"
                                        label="Save Changes"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Grid>
    );
};

export default GeneralInformation;