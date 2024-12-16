// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/auth.service";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check authentication status on mount
    const token = localStorage.getItem("token");
    if (token) {
      AuthService.getProfile()
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

// src/context/AuthContext.tsx
const login = async (email: string, password: string) => {
  try {
    const response = await AuthService.login({ email, password });
    setUser(response.user);
    setIsAuthenticated(true);
    localStorage.setItem('token', response.token);
    localStorage.setItem('userRole', response.user.role);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


  const register = async (name: string, email: string, password: string) => {
    const response = await AuthService.register({ name, email, password });
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
