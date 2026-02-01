import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType } from '../types';
import { ADMIN_PASSWORD } from '../utils/constants'; // Changed to .tsx

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  });

  const login = useCallback(async (password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async login
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    // Optional: Add any logic to re-validate session on mount if needed
  }, []);

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};