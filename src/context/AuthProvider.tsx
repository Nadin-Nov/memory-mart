'use client';
import type { JSX, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnonymousToken, handleLogin as apiHandleLogin, getCustomerToken } from '@/services/AuthService';
import { LocalStorageService } from '@/services/LocalStorageService';
import type { userData } from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';
import { AuthContext } from './AuthContext';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  userData?: userData;
}

const USER_DATA_KEY = 'userData';

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [userDataState, setUserDataState] = useState<userData | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      const stored = LocalStorageService.getItem<userData>(USER_DATA_KEY, isUserData);
      if (stored) {
        setUserDataState(stored);
      } else {
        const anonToken = await getAnonymousToken();
        if (anonToken?.access_token) {
          const anonUserData: userData = {
            token: anonToken.access_token,
            isLoggedIn: false,
          };
          LocalStorageService.setItem(USER_DATA_KEY, anonUserData);
          setUserDataState(anonUserData);
        }
      }
    };

    void fetchUserData();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!userDataState?.token) {
      return { success: false, error: 'No token available' };
    }

    const tokenResponse = await getCustomerToken({ email, password });

    if (!tokenResponse?.access_token) {
      return { success: false, error: `Couldn't get access token` };
    }

    const result = await apiHandleLogin(tokenResponse.access_token, { email, password });

    if (!result.success) {
      return { success: false, error: result.error ?? 'Login failed' };
    }

    const newUserData: userData = {
      token: tokenResponse.access_token,
      isLoggedIn: true,
    };

    LocalStorageService.setItem(USER_DATA_KEY, newUserData);
    setUserDataState(newUserData);

    return { success: true };
  };

  const logout = async (): Promise<void> => {
    const anonToken = await getAnonymousToken();
    if (anonToken?.access_token) {
      const anonUserData: userData = {
        token: anonToken.access_token,
        isLoggedIn: false,
      };
      LocalStorageService.setItem(USER_DATA_KEY, anonUserData);
      setUserDataState(anonUserData);
      void navigate('/');
    }
  };

  const isAuthenticated = !!userDataState?.isLoggedIn;

  return (
    <AuthContext.Provider value={{ userData: userDataState, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
