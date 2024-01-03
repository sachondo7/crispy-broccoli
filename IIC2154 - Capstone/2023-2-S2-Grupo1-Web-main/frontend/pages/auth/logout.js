import { useEffect, useState } from 'react';
import useCookieAuth from '@/hooks/useCookieAuth';
import { useRouter } from 'next/router';
import Loading from '@/app/components/Loading';


export default function ManagerControl() {
    const router = useRouter();
    const { handleUserLogout } = useCookieAuth();

    useEffect(() => {
        handleUserLogout();
        router.push('/auth/login');
    });

    return <Loading />;
};
