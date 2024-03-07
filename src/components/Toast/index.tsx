'use client';

import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { RootState } from '@/redux/store';
import { closeToast } from '@/redux/features/toastSlice';

const Toast = () => {
    const dispatch = useDispatch();
    const toastState = useSelector((state: RootState) => state.toast);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeToast());
    };

    return (
        <Snackbar
            open={toastState.open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={toastState.severity || 'info'}
                variant={toastState.variant || 'filled'}
                sx={{ width: '100%' }}
            >
                {toastState.message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
