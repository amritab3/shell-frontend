'use client';

import React, { ReactNode } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/redux/store';

interface PropTypes {
    children: ReactNode;
}

export const ReduxProvider: React.FC<PropTypes> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};
