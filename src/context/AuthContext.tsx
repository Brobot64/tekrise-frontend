import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthState } from '../types';
import api from '../utils/api';

interface AuthContextType extends AuthState {
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        console.log('Init auth - saved user exists:', !!savedUser);
        
        if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
          const user = JSON.parse(savedUser);
          if (user && user._id) {
            setAuthState({ user, loading: false, error: null });
            return;
          }
        }
        setAuthState({ user: null, loading: false, error: null });
      } catch (err) {
        console.error('Error initializing auth:', err);
        localStorage.removeItem('user');
        setAuthState({ user: null, loading: false, error: null });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: any) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('user', JSON.stringify(response.data));
      setAuthState({ user: response.data, loading: false, error: null });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      setAuthState(prev => ({ ...prev, loading: false, error: message }));
      throw new Error(message);
    }
  };

  const register = async (userData: any) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      setAuthState({ user: response.data, loading: false, error: null });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      setAuthState(prev => ({ ...prev, loading: false, error: message }));
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({ user: null, loading: false, error: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
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
