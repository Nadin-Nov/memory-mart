'use client';
import type { JSX, ReactNode } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  getAnonymousToken,
  handleLogin as apiHandleLogin,
  getCustomerToken,
  refreshAccessToken,
  clientAxios,
  authBearer,
} from '@/services/AuthService';
import { LocalStorageService } from '@/services/LocalStorageService';
import type { userData } from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';
import { AuthContext } from './AuthContext';
import type { Cart } from '@/types/cart';
import { createMyCart, getActiveCart, getCartItemCount } from '@/services/CartService';
import { isString } from '@/utils/validate';

const MS_IN_S = 1000;
const USER_DATA_KEY = 'userData';
const CART_ID_KEY = 'cartId';
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
  refreshCartItemCount?: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [userDataState, setUserDataState] = useState<userData | undefined>();
  const [cartId, setCartId] = useState<string | undefined>(() =>
    LocalStorageService.getItem<string>(CART_ID_KEY, isString)
  );
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [isInitializing, setIsInitializing] = useState(true);

  const navigate = useNavigate();
  const previousUserDataReference = useRef<userData | undefined>(undefined);
  const didFetchUserData = useRef(false);

  const fetchUserData = useCallback(async (): Promise<void> => {
    const now = Date.now();
    const stored = LocalStorageService.getItem<userData>(USER_DATA_KEY, isUserData);

    if (stored && stored.expirationDate > now) {
      setUserDataState(stored);
      return;
    }

    if (stored?.refreshToken) {
      try {
        const refreshed = await refreshAccessToken(stored.refreshToken);
        if (refreshed?.access_token) {
          const newUserData: userData = {
            token: refreshed.access_token,
            isLoggedIn: true,
            expirationDate: refreshed.expires_in * MS_IN_S + now,
            refreshToken: refreshed.refresh_token ?? stored.refreshToken,
          };
          LocalStorageService.setItem(USER_DATA_KEY, newUserData);
          setUserDataState(newUserData);
          return;
        }
      } catch {
        console.warn('Failed to refresh token, will try anon if needed.');
      }
    }

    const hasValidAnon = stored?.isLoggedIn === false && stored.expirationDate > now;
    if (hasValidAnon) {
      setUserDataState(stored);
      return;
    }

    try {
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
    } catch (error) {
      console.error('Failed to fetch anonymous token:', error);
    }
  }, []);

  const ensureCartExists = useCallback(async (token: string, isLoggedIn: boolean): Promise<Cart | undefined> => {
    try {
      if (isLoggedIn) {
        const cart = await getActiveCart(token);
        if (cart?.id) {
          setCartId(cart.id);
          return cart;
        }

        const newCart = await createMyCart(token);
        if (newCart?.id) {
          setCartId(newCart.id);
          return newCart;
        }
      } else {
        const storedCartId = LocalStorageService.getItem<string>(CART_ID_KEY, isString);

        if (storedCartId) {
          try {
            const response = await clientAxios.get<Cart>(`/me/carts/${storedCartId}`, {
              headers: authBearer(token),
            });
            setCartId(response.data.id);
            return response.data;
          } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === CART_NOT_FOUND_STATUS) {
              LocalStorageService.removeItem(CART_ID_KEY);
            } else {
              console.error('Error fetching anon cart:', error);
              return undefined;
            }
          }
        }

        const newCart = await createMyCart(token);
        if (newCart?.id) {
          LocalStorageService.setItem(CART_ID_KEY, newCart.id);
          setCartId(newCart.id);
          return newCart;
        }
      }
    } catch (error) {
      console.error('ensureCartExists error:', error);
    }

    return undefined;
  }, []);

  const fetchCartItemCount = useCallback(async () => {
  if (!userDataState?.token || !cartId) return;
  try {
    const count = await getCartItemCount(userDataState.token, cartId);
    if (typeof count === 'number') {
      setCartItemCount(count);
    } else {
      setCartItemCount(0);
    }
  } catch (error) {
    console.error('Failed to fetch cart item count:', error);
  }
}, [userDataState?.token, cartId]);


  useEffect(() => {
    if (didFetchUserData.current) return;

    didFetchUserData.current = true;

    (async (): Promise<void> => {
      try {
        await fetchUserData();
      } finally {
        setIsInitializing(false);
      }
    })();
  }, [fetchUserData]);

  useEffect(() => {
    if (!isInitializing && userDataState?.token) {
      (async (): Promise<void> => {
        try {
          const cart = await ensureCartExists(userDataState.token, userDataState.isLoggedIn);
          if (cart?.id) {
            setCartId(cart.id);
          }
          await fetchCartItemCount();
        } catch (error) {
          console.error('Error in cart setup:', error);
        }
      })();
    }
  }, [isInitializing, userDataState, ensureCartExists, fetchCartItemCount]);

  useEffect(() => {
    if (userDataState && userDataState !== previousUserDataReference.current) {
      LocalStorageService.setItem(USER_DATA_KEY, userDataState);
      previousUserDataReference.current = userDataState;
    } else if (!userDataState) {
      LocalStorageService.removeItem(USER_DATA_KEY);
    }
  }, [userDataState]);

  useEffect(() => {
    if (cartId) {
      LocalStorageService.setItem(CART_ID_KEY, cartId);
    } else {
      LocalStorageService.removeItem(CART_ID_KEY);
    }
  }, [cartId]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    if (!userDataState?.token) return { success: false, error: 'Missing anonymous token' };

    const anonymousCartId = LocalStorageService.getItem<string>(CART_ID_KEY, isString);

    const result = await apiHandleLogin(userDataState.token, {
      email,
      password,
      anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
      anonymousCartId,
    });

    if (!result.success) {
      return { success: false, error: result.error ?? 'Login failed' };
    }

    const tokenResponse = await getCustomerToken({ email, password });

    if (!tokenResponse?.access_token) {
      return { success: false, error: "Couldn't retrieve customer token" };
    }

    const newUserData: userData = {
      token: tokenResponse.access_token,
      isLoggedIn: true,
      expirationDate: tokenResponse.expires_in * MS_IN_S + Date.now(),
      refreshToken: tokenResponse.refresh_token,
    };

    LocalStorageService.setItem(USER_DATA_KEY, newUserData);
    setUserDataState(newUserData);
    LocalStorageService.removeItem(CART_ID_KEY);

    return { success: true };
  };

  const logout = async (): Promise<void> => {
    try {
      const anonToken = await getAnonymousToken();
      LocalStorageService.removeItem(CART_ID_KEY);
      if (anonToken?.access_token) {
        const anonUserData: userData = {
          token: anonToken.access_token,
          isLoggedIn: false,
          expirationDate: anonToken.expires_in * MS_IN_S + Date.now(),
          refreshToken: anonToken.refresh_token,
        };
        LocalStorageService.setItem(USER_DATA_KEY, anonUserData);
        setUserDataState(anonUserData);
        setCartItemCount(0);
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to logout and fallback to anon:', error);
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
        refreshCartItemCount: fetchCartItemCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
