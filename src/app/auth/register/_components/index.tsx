'use client';

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import Button from '@/components/Button';
import Input from '@/components/Input';
import withNavLayout from '@/hoc/withNavLayout';
import { Box, Container, Grid, Link, Typography } from '@mui/material';

const RegisterPage = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const response = await fetch('http://localhost:8000/users/register/', {
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
                    Sign Up
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
                    {/* <Input
                        variant="standard"
                        label="Re-enter Password"
                        type="password"
                        name="password2"
                        StartIcon={LockIcon}
                    /> */}

                    <Button variant="outlined" type="submit">
                        Sign Up
                    </Button>

                    <Grid container sx={{ my: 4 }}>
                        <Grid item>
                            <Link href="/auth/login/" variant="body2">
                                {'Already have an account? Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default withNavLayout(RegisterPage);
