'use client';

import React from 'react';

import NotFound from '@/components/404';
import withNavLayout from '@/hoc/withNavLayout';

const ThriftProducts = () => {
    return <NotFound pageName="THRIFT PAGE" />;
};

export default withNavLayout(ThriftProducts);
