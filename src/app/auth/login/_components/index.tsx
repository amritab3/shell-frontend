'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import CustomForm from '@/components/Form';
import withNavLayout from '@/hoc/withNavLayout';

const LoginPage = () => {
    const router = useRouter();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: any, actions: any) => {
        console.log(values);

        const response = await fetch('http://localhost:8000/users/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            actions.setSubmitting(false);
            actions.resetForm(initialValues);
            console.log(await response.json());
            router.push('/');
        } else {
            actions.setSubmitting(false);
            console.log('ERROR ENCOUNTERED');
        }
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <CustomForm
                title="Login"
                initialValues={initialValues}
                submitHandler={handleSubmit}
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
                            <Link href="/auth/register/" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </CustomForm>
        </Grid>
    );
};

export default withNavLayout(LoginPage);
