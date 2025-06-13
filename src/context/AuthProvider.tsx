'use client';
import type { JSX, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnonymousToken, handleLogin as apiHandleLogin, getCustomerToken } from '@/services/AuthService';
import { LocalStorageService } from '@/services/LocalStorageService';
import type { userData } from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';
import { AuthContext } from './AuthContext';
import { createMyCart } from '@/services/CartService';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  anonId?: string;
  userData?: userData;
}

const USER_DATA_KEY = 'userData';

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [userDataState, setUserDataState] = useState<userData | undefined>();
  const [anonId, setAnonId] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      const stored = LocalStorageService.getItem<userData>(USER_DATA_KEY, isUserData);
      const storedAnonymousId = LocalStorageService.getItem('anonymous_id', isString);
      if (stored) {
        setUserDataState(stored);
      } else {
        if (!storedAnonymousId) {
          const newAnonymousId = crypto.randomUUID();
          setAnonId(storedAnonymousId);
          LocalStorageService.setItem('anonymous_id', newAnonymousId);
        }
        const anonToken = await getAnonymousToken(anonId as string);
        if (anonToken?.access_token) {
          const anonUserData: userData = {
            token: anonToken.access_token,
            isLoggedIn: false,
          };
          LocalStorageService.setItem(USER_DATA_KEY, anonUserData);
          setUserDataState(anonUserData);

          const cartResponse = await createMyCart(anonToken.access_token);
          LocalStorageService.setItem('cartId', cartResponse?.id);
        }
      }
    };

    void fetchUserData();
  }, [anonId]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!userDataState?.token) {
      return { success: false, error: 'No token available' };
    }

    const tokenResponse = await getCustomerToken({ email, password });

    if (!tokenResponse?.access_token) {
      return { success: false, error: `Couldn't get access token` };
    }

    const userData = LocalStorageService.getItem<userData>('userData', isUserData);
    const anonToken = userData?.token as string;

    const result = await apiHandleLogin(anonToken, { email, password });

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
    LocalStorageService.removeItem('anonymous_id');
    const anonToken = await getAnonymousToken(anonId as string);
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
    <AuthContext.Provider value={{ userData: userDataState, isAuthenticated, login, logout, anonId }}>
      {children}
    </AuthContext.Provider>
  );
};
