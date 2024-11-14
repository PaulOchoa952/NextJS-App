"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';

const ClientProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirige a login si el usuario no está autenticado
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Muestra un estado de carga
  }

  return <>{children}</>; // Renderiza el contenido si el usuario está autenticado
};

export default ClientProtectedLayout;
