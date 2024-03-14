'use client';

import { createSlice } from '@reduxjs/toolkit';

import { AlertProps } from '@mui/material/Alert';

export interface ToastConfig {
    open: boolean;
    message: string;
}

const initialState: ToastConfig & AlertProps = {
    open: false,
    message: '',
};

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        openToast: (state, action) => {
            state.severity = action.payload.severity;
            state.message = action.payload.message;
            state.variant = action.payload.variant;
            state.open = true;
        },
        closeToast: state => {
            state.open = false;
        },
    },
});

export const { openToast, closeToast } = toastSlice.actions;

export default toastSlice.reducer;
