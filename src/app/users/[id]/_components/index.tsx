'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import NotFound from '@/components/404';

const UserProfile = () => {
    const params = useParams();

    return <NotFound pageName={`USER PROFILE for ${params.id}`} />;
};

export default UserProfile;
