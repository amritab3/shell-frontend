'use client';

import React from 'react';

import NotFound from '@/components/404';
import withNavLayout from '@/hoc/withNavLayout';

const ContactPage = () => {
    return <NotFound pageName="CONTACT PAGE" />;
};

export default withNavLayout(ContactPage);
