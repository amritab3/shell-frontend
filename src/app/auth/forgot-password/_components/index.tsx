'use client';

import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

import Button from '@/components/Button';
import Input from '@/components/Input';

const PasswordResetForm = () => {
    return (
        <Container
            component="main"
            sx={{
                height: '100vh',
                width: '100%',
                margin: 0,
                padding: 0,
                position: 'absolute',
                left: '14%',
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
                    Forgot Password
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        my: 2,
                    }}
                >
                    Enter your email below to receive your password reset
                    instruction
                </Typography>

                <Box
                    component="form"
                    sx={{
                        marginTop: 3,
                        width: '90%',
                        px: 5,
                    }}
                >
                    <Input
                        variant="standard"
                        label="Enter your email address here"
                        name="email"
                        StartIcon={EmailIcon}
                    />

                    <Button variant="outlined" type="submit" label="Send" />
                </Box>
            </Box>
        </Container>
    );
};

export default PasswordResetForm;
