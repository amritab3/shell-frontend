'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface UserDetails {
    access_token: string;
    refresh_token: string;
    loggedIn: boolean;

    forgotPasswordEmail: string;
}

const initialState: UserDetails = {
    access_token: '',
    refresh_token: '',
    loggedIn: false,

    forgotPasswordEmail: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.access_token = action.payload.access;
            state.refresh_token = action.payload.refresh;
        },
        logout: state => {
            state.loggedIn = false;
            state.access_token = '';
            state.refresh_token = '';
        },
        setForgotPasswordEmail: (state, action) => {
            state.forgotPasswordEmail = action.payload.email;
        },
    },
});

export const { login, logout, setForgotPasswordEmail } = userSlice.actions;

export default userSlice.reducer;
