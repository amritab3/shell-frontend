import React from 'react';

import { useRouter } from 'next/navigation';
import { Grid, Typography } from '@mui/material';

import Button from '@/components/Button';

interface NotFoundProps {
    pageName?: string;
}

const NotFound = (props: NotFoundProps) => {
    const { pageName } = props;
    const router = useRouter();

    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid item>
                <Typography variant="h1" textAlign="center">
                    404
                </Typography>
                <Typography variant="h6">
                    The page you’re looking for doesn’t exist.
                </Typography>
                <Button
                    fullWidth
                    label="Back Home"
                    variant="contained"
                    onClick={() => router.push('/')}
                />
            </Grid>
        </Grid>
    );
};

export default NotFound;
