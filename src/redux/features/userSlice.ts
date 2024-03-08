'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface UserDetails {
    access_token: string;
    refresh_token: string;
    loggedIn: boolean;
}

const initialState: UserDetails = {
    access_token: '',
    refresh_token: '',
    loggedIn: false,
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
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
