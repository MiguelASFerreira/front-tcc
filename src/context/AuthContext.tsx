'use client'

import { api } from '@/data/api';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import { toast } from "sonner"

interface AuthContextProps {
  token: string | null;
  signIn: (email: string, password: string) => Promise<boolean | undefined>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthResponse {
  token: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const isTokenExpired = (token: string): boolean => {
  const decodedToken: { exp?: number } = jwtDecode(token);
  if (!decodedToken.exp) {
    return true;
  }

  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
    } else {
      signOut(); 
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/empresa', 
        {
          email: email,
          password: password
        },
        { 
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
          },
        }
      );
      const { token } = response.data as AuthResponse;
      setToken(token);
      localStorage.setItem('authToken', token);
      toast.success('Login realizado com sucesso!')
      router.push('/dashboard')
      return true
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error("Ocorreu um erro", {
        description: "Tente Novamente!"
      })
      return false
    }
  };

  const signOut = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/')
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
