"use client";

import React from "react";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import FormInput from "@/components/Form/FormInput";
import URLS from "@/utils/urls";
import Button from "@/components/Button";

export interface IFormInput {
    first_name: string;
    last_name: string;
    email: string;
    mobile_no: string;
    gender: string;
    roles: Array<number>;
}

const validationSchema = Yup.object({});

const AddUserForm = () => {
    const initialValues: IFormInput = {
        first_name: "",
        last_name: "",
        email: "",
        mobile_no: "",
        gender: "",
        roles: [],
    };

    const { handleSubmit, control, reset } = useForm<IFormInput>({
        defaultValues: initialValues,
    });

    const onSubmit = async (submittedFormData: any) => {
        console.log("Data: ", submittedFormData);
        const { ...restValues } =
            submittedFormData;

        let formData = new FormData();
        for (let key in restValues) {
            formData.append(key, restValues[key]);
        }

        fetch(`${URLS.USER_REGISTER_URL}/`, {
            method: "POST",
            body: formData,
        })
            .then(async (response) => {
                const responseData = await response.json();
                console.log("response", responseData);
                reset(initialValues);
            })
            .catch((error) => {
                console.log("Error while fetching adding the product", error);
            });
    };

    const [gender, setGender] = React.useState('');
    const [role, setRole] = React.useState('');

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(event.target.value);
    };
    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value);
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
                        Add User
                    </Typography>
                </Grid>
                <Grid container item xs={12} sx={{ p: 2 }} flexGrow={1}>
                    <Grid container spacing={3} marginRight={2}>
                        <Grid item xs={6}>
                            <FormInput name={"firstName"} control={control} label={"First Name"} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormInput name={"lastName"} control={control} label={"Last Name"} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormInput name={"email"} control={control} label={"Email"} />
                        </Grid>
                        <Grid item xs={6}>
                            <FormInput name={"mobile_no"} control={control} label={"Mobile Number"} />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl sx={{ width: 270 }}>
                                <InputLabel id="demo-select-small-label">Gender</InputLabel>
                                <Select
                                    value={gender}
                                    label="Gender"
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl sx={{ width: 270 }} >
                                <InputLabel id="demo-select-small-label">Role</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={role}
                                    label="Role"
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value={2}>Shop Admin</MenuItem>
                                    <MenuItem value={3}>Customer</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>

                    <Grid item xs={12} marginTop={5}>
                        <Grid container gap={2}>
                            <Button
                                label="Submit"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                            />
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

export default AddUserForm;
