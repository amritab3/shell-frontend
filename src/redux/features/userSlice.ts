'use client';

import { createSlice } from '@reduxjs/toolkit';

interface UserDetails {
    email: string;
    password: string;
}

export interface User {
    user: UserDetails;
    loggedIn: boolean;
}

const initialState: User = {
    user: { email: '', password: '' },
    loggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.loggedIn = true;
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
        },
        logoutUser: state => {
            state.loggedIn = false;

            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
    },
});

export const { setToken, logoutUser } = userSlice.actions;

export default userSlice.reducer;