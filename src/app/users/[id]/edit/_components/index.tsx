'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import NotFound from '@/components/404';

const UserEdit = () => {
    const params = useParams();

    return <NotFound pageName={`USER EDIT for ${params.id}`} />;
};

export default UserEdit;
