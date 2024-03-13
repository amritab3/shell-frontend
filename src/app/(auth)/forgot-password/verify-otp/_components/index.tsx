'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';

import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import CustomForm from '@/components/Form';
import { openToast } from '@/redux/features/toastSlice';
import URLS from '@/utils/urls';
import { RootState } from '@/redux/store';

const validationSchema = Yup.object({
    otp_code: Yup.string().required('OTP code is required').length(6),
});

const VerifyOTPPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const forgotPasswordEmail = useSelector(
        (state: RootState) => state.user.forgotPasswordEmail,
    );

    const initialValues = {
        otp_code: '',
        email: forgotPasswordEmail,
    };

    const handleSubmit = async (values: any, actions: any) => {
        console.log('Values: ', values);

        const response = await fetch(URLS.VERIFY_FORGOT_PASSWORD_OTP, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            dispatch(
                openToast({
                    message: 'OTP verified',
                    severity: 'success',
                }),
            );

            actions.setSubmitting(false);
            actions.resetForm(initialValues);
            router.push('/forgot-password/new-password');
        } else {
            dispatch(
                openToast({
                    message: 'OTP verification failed',
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
                title="Verify OTP"
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
                            label="OTP Code"
                            type="text"
                            name="otp_code"
                            StartIcon={PersonIcon}
                        />

                        <FormButton
                            variant="contained"
                            type="submit"
                            label="Verify OTP"
                        />
                    </Grid>
                </Grid>
            </CustomForm>
        </Grid>
    );
};

export default VerifyOTPPage;
