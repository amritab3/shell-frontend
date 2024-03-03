'use client';

import React from 'react';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import CustomForm from '@/components/Form';
import FormInput from '@/components/Form/FormInput';
import FormButton from '@/components/Form/FormButton';
import withNavLayout from '@/hoc/withNavLayout';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const router = useRouter();
    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: any, actions: any) => {
        const response = await fetch('http://localhost:8000/users/register/', {
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

        console.log(await response.json());
    };
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <CustomForm
                title="Register"
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
                            label="Register"
                        />
                    </Grid>

                    <Grid container item sx={{ margin: 2 }}>
                        <Grid item>
                            <Link href="/auth/login/" variant="body2">
                                {'Already have an account?'}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </CustomForm>
        </Grid>
    );
};

export default withNavLayout(RegisterPage);
