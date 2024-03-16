'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';

import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import CustomForm from '@/components/Form';
import { openToast } from '@/redux/features/toastSlice';
import { removeForgotPasswordEmail } from '@/redux/features/userSlice';
import URLS from '@/utils/urls';
import { RootState } from '@/redux/store';

const validationSchema = Yup.object({
    new_password: Yup.string().required('Password is required'),
    confirm_new_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('new_password')], 'Passwords must match'),
});

const NewPasswordPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const forgotPasswordEmail = useSelector(
        (state: RootState) => state.user.forgotPasswordEmail,
    );

    const initialValues = {
        email: forgotPasswordEmail,
        new_password: '',
        confirm_new_password: '',
    };

    const handleSubmit = async (values: any, actions: any) => {
        const response = await fetch(URLS.UPDATE_PASSWORD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            dispatch(removeForgotPasswordEmail());
            dispatch(
                openToast({
                    message: 'Password successfully updated',
                    severity: 'success',
                }),
            );

            actions.setSubmitting(false);
            actions.resetForm(initialValues);
            router.push('/login');
        } else {
            dispatch(
                openToast({
                    message: 'Password update failed',
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
                title="New Password"
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
            </CustomForm>
        </Grid>
    );
};

export default NewPasswordPage;