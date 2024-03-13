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
import { login } from '@/redux/features/userSlice';
import { openToast } from '@/redux/features/toastSlice';
import URLS from '@/utils/urls';

const validationSchema = Yup.object({
    otp_code: Yup.string().required('OTP code is required').length(6),
});

const VerifyOTPPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const initialValues = {
        otp_code: '',
    };

    const handleSubmit = async (values: any, actions: any) => {
        console.log('Values: ', values);
        router.push('/forgot-password/new-password');

        // const response = await fetch(URLS.USER_LOGIN_URL, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(values),
        // });

        // if (response.ok) {
        //     const data = await response.json();
        //     dispatch(login(data));
        //     dispatch(
        //         openToast({
        //             message: 'User Login Successful',
        //             severity: 'success',
        //         }),
        //     );

        //     actions.setSubmitting(false);
        //     actions.resetForm(initialValues);
        //     router.push('/');
        // } else {
        //     dispatch(
        //         openToast({ message: 'User Login Failed', severity: 'error' }),
        //     );
        //     actions.setSubmitting(false);
        // }
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
