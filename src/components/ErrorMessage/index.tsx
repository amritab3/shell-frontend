'use client';

import React from 'react';

import Typography from '@mui/material/Typography';

interface ErrorMessage {
    message: string;
}

const ErrorMessage = (props: ErrorMessage) => {
    const { message } = props;

    return message ? (
        <Typography
            variant="subtitle1"
            sx={theme => ({
                color: theme.palette.error.main,
                fontSize: 10,
                mb: 2,
            })}
        >
            {message}
        </Typography>
    ) : null;
};

export default ErrorMessage;
