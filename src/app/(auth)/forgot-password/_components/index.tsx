'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';

import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import CustomForm from '@/components/Form';
import { setForgotPasswordEmail } from '@/redux/features/userSlice';
import { openToast } from '@/redux/features/toastSlice';
import URLS from '@/utils/urls';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
});

const ForgotPasswordPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
    };

    const handleSubmit = async (values: any, actions: any) => {
        const response = await fetch(URLS.GENERATE_FORGOT_PASSWORD_OTP, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            const data = await response.json();

            console.log('response', data);
            dispatch(setForgotPasswordEmail(values));
            dispatch(
                openToast({
                    message: 'OTP generated successfully',
                    severity: 'success',
                }),
            );

            actions.setSubmitting(false);
            actions.resetForm(initialValues);
            router.push('forgot-password/verify-otp');
        } else {
            dispatch(
                openToast({
                    message: 'OTP generation failed',
                    severity: 'error',
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
            <CustomForm
                title="Forgot Password"
                initialValues={initialValues}
                submitHandler={handleSubmit}
                validationSchema={validationSchema}
                showBoxShadow
            >
                <Grid
                    container
                    item
                    sx={{
                        width: '400px',
                    }}
                >
                    <Grid container item sx={{ margin: 2 }}>
                        <FormInput
                            variant="standard"
                            label="Email"
                            type="text"
                            name="email"
                            StartIcon={PersonIcon}
                        />

                        <FormButton
                            variant="contained"
                            type="submit"
                            label="Generate OTP"
                        />
                    </Grid>
                </Grid>
            </CustomForm>
        </Grid>
    );
};

export default ForgotPasswordPage;
