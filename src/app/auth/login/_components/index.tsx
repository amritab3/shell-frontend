'use client';

// import { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import Button from '@/components/Button';
import Input from '@/components/Input';
import withNavLayout from '@/hoc/withNavLayout';

const LoginPage = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value);
    // };

    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.value);
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch('http://localhost:8000/users/login/', {
            method: 'POST',
            body: formData,
        });

        console.log(await response.json());
    };

    return (
        <Container
            component="main"
            sx={{
                height: '100vh',
                width: '100%',
                margin: 0,
                padding: 0,
                position: 'absolute',
                left: '21%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '60%',
                    boxShadow: 3,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pb: 3,
                }}
            >
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                        bgcolor: 'background.formTitleBg',
                        color: 'text.onPrimaryBg',
                        width: '100%',
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        textAlign: 'center',
                        height: '50px',
                        lineHeight: '50px',
                    }}
                >
                    Sign In
                </Typography>
                <Box
                    component="form"
                    sx={{
                        marginTop: 3,
                        width: '90%',
                        px: 5,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Input
                        variant="standard"
                        label="Email"
                        type="text"
                        name="email"
                        StartIcon={PersonIcon}
                    />
                    <Input
                        variant="standard"
                        label="Password"
                        type="password"
                        name="password"
                        StartIcon={LockIcon}
                    />

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    <Button variant="outlined" type="submit">
                        Log In
                    </Button>

                    <Grid container sx={{ my: 4 }}>
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
                </Box>
            </Box>
        </Container>
    );
};

export default withNavLayout(LoginPage);
