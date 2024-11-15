"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { AuthContextType } from '../types/AuthContextType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data?.session?.user ?? null);
            setLoading(false);
        };

        fetchSession();

        const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription?.subscription?.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            signOut: async () => { 
                await supabase.auth.signOut(); 
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
