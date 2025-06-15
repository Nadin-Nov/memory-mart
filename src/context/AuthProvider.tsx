'use client';
import type { JSX, ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAnonymousToken,
  handleLogin as apiHandleLogin,
  getCustomerToken,
  refreshAccessToken,
} from '@/services/AuthService';
import { LocalStorageService } from '@/services/LocalStorageService';
import type { userData } from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import type { Cart } from '@/types/cart';
import { clientAxios, authBearer } from '@/services/AuthService';
import { createMyCart, getCartItemCount } from '@/services/CartService';
import { isString } from '@/utils/validate';

const MS_IN_S = 1000;
const USER_DATA_KEY = 'userData';
const CART_NOT_FOUND_STATUS = 404;

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  userData?: userData;
  cartId?: string;
  cartItemCount?: number;
  setCartId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCartItemCount?: React.Dispatch<React.SetStateAction<number>>;
}

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [userDataState, setUserDataState] = useState<userData | undefined>();
  const [cartId, setCartId] = useState<string | undefined>(() =>
    LocalStorageService.getItem<string>('cartId', isString)
  );
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      const stored = LocalStorageService.getItem<userData>(USER_DATA_KEY, isUserData);
      const now = Date.now();
      const isExpired = stored && stored.expirationDate <= now;

      if (stored && !isExpired) {
        setUserDataState(stored);
        return;
      }

      if (stored?.refreshToken) {
        console.log('Token expired. Trying to refresh with refreshToken...');
        const refreshed = await refreshAccessToken(stored.refreshToken);

        if (refreshed?.access_token) {
          console.log('Token successfully refreshed!', refreshed);
          const newUserData: userData = {
            token: refreshed.access_token,
            isLoggedIn: true,
            expirationDate: refreshed.expires_in * MS_IN_S + now,
            refreshToken: refreshed.refresh_token ?? stored.refreshToken,
          };
          LocalStorageService.setItem(USER_DATA_KEY, newUserData);
          setUserDataState(newUserData);
          return;
        } else {
          console.warn('Failed to refresh token. Falling back to anonymous token.');
        }
      }

      const anonToken = await getAnonymousToken();
      if (anonToken?.access_token) {
        const anonUserData: userData = {
          token: anonToken.access_token,
          isLoggedIn: false,
          expirationDate: anonToken.expires_in * MS_IN_S + now,
          refreshToken: anonToken.refresh_token,
        };
        LocalStorageService.setItem(USER_DATA_KEY, anonUserData);
        setUserDataState(anonUserData);
      }
    };

    void fetchUserData();
  }, []);

  useEffect(() => {
    if (userDataState) {
      LocalStorageService.setItem(USER_DATA_KEY, userDataState);
    } else {
      LocalStorageService.removeItem(USER_DATA_KEY);
      setCartId(undefined);
      LocalStorageService.removeItem('cartId');
    }
  }, [userDataState]);

  useEffect(() => {
    if (cartId) {
      LocalStorageService.setItem('cartId', cartId);
    } else {
      LocalStorageService.removeItem('cartId');
    }
  }, [cartId]);

  const ensureCartExists = useCallback(async (token: string): Promise<Cart | undefined> => {
    let storedCartId = LocalStorageService.getItem<string>('cartId', isString);

    if (storedCartId) {
      try {
        const response = await clientAxios.get<Cart>(`/me/carts/${storedCartId}`, {
          headers: authBearer(token),
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === CART_NOT_FOUND_STATUS) {
          LocalStorageService.removeItem('cartId');
          storedCartId = undefined;
        } else {
          console.error('Error fetching cart by id:', error);
          return undefined;
        }
      }
    }

    const newCart = await createMyCart(token);
    if (!newCart?.id) {
      console.error('Failed to create new cart');
      return undefined;
    }
    LocalStorageService.setItem('cartId', newCart.id);
    setCartId(newCart.id);
    return newCart;
  }, []);

  const fetchCartItemCount = useCallback(async (): Promise<void> => {
    try {
      const count = await getCartItemCount();
      setCartItemCount(count);
    } catch (error) {
      console.error('Failed to fetch cart item count:', error);
    }
  }, []);

  useEffect(() => {
    if (!userDataState?.token) {
      setCartItemCount(0);
      setCartId(undefined);
      return;
    }

    const setupCart = async (): Promise<void> => {
      const cart = await ensureCartExists(userDataState.token);
      if (cart?.id) {
        setCartId(cart.id);
      }
      await fetchCartItemCount();
    };

    void setupCart();
  }, [userDataState?.token, ensureCartExists, fetchCartItemCount]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!userDataState?.token) {
      return { success: false, error: 'No token available' };
    }

    const tokenResponse = await getCustomerToken({ email, password });

    if (!tokenResponse?.access_token) {
      return { success: false, error: `Couldn't get access token` };
    }

    const anonymousCartId = LocalStorageService.getItem<string>('cartId', isString);

    const result = await apiHandleLogin(tokenResponse.access_token, {
      email,
      password,
      anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
      anonymousCartId,
    });

    if (!result.success) {
      return { success: false, error: result.error ?? 'Login failed' };
    }

    const newUserData: userData = {
      token: tokenResponse.access_token,
      isLoggedIn: true,
      expirationDate: tokenResponse.expires_in * MS_IN_S + Date.now(),
      refreshToken: tokenResponse.refresh_token,
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
        expirationDate: anonToken.expires_in * MS_IN_S + Date.now(),
      };
      LocalStorageService.setItem(USER_DATA_KEY, anonUserData);
      setUserDataState(anonUserData);
      setCartId(undefined);
      setCartItemCount(0);
      LocalStorageService.removeItem('cartId');
      void navigate('/');
    }
  };

  const isAuthenticated = !!userDataState?.isLoggedIn;

  return (
    <AuthContext.Provider
      value={{
        userData: userDataState,
        isAuthenticated,
        login,
        logout,
        cartId,
        cartItemCount,
        setCartId,
        setCartItemCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
