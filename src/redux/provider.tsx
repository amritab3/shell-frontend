'use client';

import React, { ReactNode } from 'react';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

interface PropTypes {
    children: ReactNode;
}

export const ReduxProvider: React.FC<PropTypes> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};
