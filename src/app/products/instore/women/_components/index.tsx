'use client';

import React from 'react';

import NotFound from '@/components/404';
import withNavLayout from '@/hoc/withNavLayout';

const WomenProducts = () => {
    return <NotFound pageName="WOMEN" />;
};

export default withNavLayout(WomenProducts);
