"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useRouter } from 'next/navigation';

const ClientProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      console.log('User not authenticated, redirecting to login...');
      setIsRedirecting(true);
      router.push('/'); // Redirige al usuario si no está autenticado
    }
  }, [loading, user, router]);

  if (loading || isRedirecting) {
    return <div>Loading...</div>; // Mostrar estado de carga mientras se verifica la autenticación
  }

  return <>{children}</>; // Renderizar contenido protegido
};

export default ClientProtectedLayout;
