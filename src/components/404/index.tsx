import { Grid, Typography } from '@mui/material';
import React from 'react';

interface NotFoundProps {
    pageName: string;
}

const NotFound = (props: NotFoundProps) => {
    const { pageName } = props;
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid
                container
                flexDirection="column"
                item
                alignItems="center"
                justifyContent="center"
            >
                <Typography>{pageName}</Typography>
                <Typography>UNDER CONSTRUCTION</Typography>
            </Grid>
        </Grid>
    );
};

export default NotFound;
