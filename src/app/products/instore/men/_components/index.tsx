'use client';

import React from 'react';

import NotFound from '@/components/404';
import withNavLayout from '@/hoc/withNavLayout';

const MenProducts = () => {
    return <NotFound pageName="MEN" />;
};

export default withNavLayout(MenProducts);
