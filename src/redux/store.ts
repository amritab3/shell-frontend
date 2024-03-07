'use client';

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/features/userSlice';
import toastReducer from './features/toastSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        toast: toastReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
