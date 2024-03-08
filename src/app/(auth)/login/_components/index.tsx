'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import * as Yup from 'yup';

import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import CustomForm from '@/components/Form';
import { RootState } from '@/redux/store';
import { login } from '@/redux/features/userSlice';
import { openToast } from '@/redux/features/toastSlice';
import URLS from '@/utils/urls';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: any, actions: any) => {
        const response = await fetch(URLS.USER_LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(login(data));
            dispatch(
                openToast({
                    message: 'Login Successful',
                    severity: 'success',
                }),
            );

            actions.setSubmitting(false);
            actions.resetForm(initialValues);
            router.push('/');
        } else {
            dispatch(openToast({ message: 'Login Failed', severity: 'error' }));
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
                title="Login"
                initialValues={initialValues}
                submitHandler={handleSubmit}
                validationSchema={validationSchema}
                showBoxShadow
            >
                <Grid
                    container
                    item
                    sx={{
                        width: '500px',
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
                        <FormInput
                            variant="standard"
                            label="Password"
                            type="password"
                            name="password"
                            StartIcon={LockIcon}
                        />

                        <FormButton
                            variant="contained"
                            type="submit"
                            label="Log In"
                        />
                    </Grid>

                    <Grid container item sx={{ margin: 2 }}>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register/" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </CustomForm>
        </Grid>
    );
};

export default LoginPage;
