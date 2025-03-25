'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import { User } from '@/types';
import Cookies from 'js-cookie'; // Use js-cookie for client-side cookie handling
import { authApi } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, user }: { children: React.ReactNode; user: User | null }) => {
    const [loginUser, setLoginUser] = useState<User | null>(user);
    const [loading, setLoading] = useState(true);
    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const { data } = await authApi.login({ email, password });
            Cookies.set('token', data.data.token, { expires: 7 }); // Store token in a cookie for 7 days
            setLoginUser(data.data.user);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };


    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            Cookies.remove('token');
            setLoginUser(null);
        }
    };

    const value = useMemo(() => ({ user: loginUser, login, logout, loading }), [loginUser, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
