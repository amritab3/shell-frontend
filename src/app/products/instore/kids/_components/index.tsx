'use client';

import React from 'react';

import NotFound from '@/components/404';
import withNavLayout from '@/hoc/withNavLayout';

const KidsProducts = () => {
    return <NotFound pageName="KIDS" />;
};

export default withNavLayout(KidsProducts);
