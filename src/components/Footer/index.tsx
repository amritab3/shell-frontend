import * as React from 'react';
import {
    Box,
    Grid,
    Link,
    Typography,
    Container,
    IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';

// Replace these with your own social media URLs
const socialMediaLinks = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
};

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                color: 'text.secondary',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth={false}>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid container item xs={12} sm={6} md={3}>
                        <Typography
                            variant="h6"
                            color="text.primary"
                            gutterBottom
                        >
                            ThreadSwap
                        </Typography>
                        <Grid container item spacing={1}>
                            <Grid container item direction="row">
                                <LocationOnIcon />
                                <Link
                                    href="#"
                                    color="inherit"
                                    display="block"
                                    ml={1}
                                >
                                    Kathmandu, Nepal
                                </Link>
                            </Grid>
                            <Grid container item direction="row">
                                <LocalPhoneIcon />
                                <Link
                                    href="#"
                                    color="inherit"
                                    display="block"
                                    ml={1}
                                >
                                    +977-9812345678
                                </Link>
                            </Grid>

                            <Grid container item direction="row">
                                <MailIcon />
                                <Link
                                    href="#"
                                    color="inherit"
                                    display="block"
                                    ml={1}
                                >
                                    threadswap@gmail.com
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                        <Typography
                            variant="subtitle1"
                            color="text.primary"
                            sx={{ fontWeight: 700 }}
                            gutterBottom
                        >
                            QUICK LINKS
                        </Typography>
                        <Link href="#" color="inherit" display="block">
                            Men
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Women
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Kids
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Thrift
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Contact
                        </Link>
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                        <Typography
                            variant="subtitle1"
                            color="text.primary"
                            sx={{ fontWeight: 700 }}
                            gutterBottom
                        >
                            INFORMATION
                        </Typography>
                        <Link href="#" color="inherit" display="block">
                            Contact Us
                        </Link>
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                        <Typography
                            variant="subtitle1"
                            color="text.primary"
                            sx={{ fontWeight: 700 }}
                            gutterBottom
                        >
                            MY ACCOUNT
                        </Typography>
                        <Link href="#" color="inherit" display="block">
                            My Profile
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Order History
                        </Link>
                    </Grid>
                </Grid>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ pt: 4 }}
                >
                    © 2024 ThreadSwap. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
