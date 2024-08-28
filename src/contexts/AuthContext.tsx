'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    username: string | null;
    userId: number | null;
    userRole: string | null;
    login: (token: string, username: string, userId: number, userRole: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');
        const storedUserRole = localStorage.getItem('userRole');
        setIsLoggedIn(!!token);
        setUsername(storedUsername);
        setUserId(storedUserId ? parseInt(storedUserId, 10) : null);
        setUserRole(storedUserRole);
    }, []);

    const login = (token: string, username: string, userId: number, userRole: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('userRole', userRole);
        setIsLoggedIn(true);
        setUsername(username);
        setUserId(userId);
        setUserRole(userRole);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        setUsername(null);
        setUserId(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, userId, userRole, login, logout }}>
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