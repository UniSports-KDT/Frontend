'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    username: string | null;
    userId: number | null;
    login: (token: string, username: string, userId: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');
        setIsLoggedIn(!!token);
        setUsername(storedUsername);
        setUserId(storedUserId ? parseInt(storedUserId, 10) : null);
    }, []);

    const login = (token: string, username: string, userId: number) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', userId.toString());
        setIsLoggedIn(true);
        setUsername(username);
        setUserId(userId);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUsername(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, userId, login, logout }}>
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