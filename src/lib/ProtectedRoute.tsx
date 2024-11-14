import React from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        console.log('Loading user state...');
        return <div>Loading...</div>;
    }

    if (!user) {
        console.log('User not authenticated, redirecting to login...');
        router.push('/login');
        return null;
    }

    console.log('User is authenticated, rendering protected content.');
    return <>{children}</>;
};

export default ProtectedRoute;
