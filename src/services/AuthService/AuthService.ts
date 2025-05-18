import type { TokenResponse, FormProps } from './types';

const CLIENT_ID = import.meta.env.VITE_CT_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CT_CLIENT_SECRET;
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY;
const API_URL = import.meta.env.VITE_CT_API_URL;
const AUTH_URL = import.meta.env.VITE_CT_AUTH_URL;

const BAD_REQUEST_CODE = 400;

const authHeader = 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

export async function getAnonymousToken(): Promise<TokenResponse | undefined> {
  try {
    const response = await fetch(`${AUTH_URL}oauth/${PROJECT_KEY}/anonymous/token`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch anonymous token');
    }

    const data: TokenResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching anonymous token:', error);
    return undefined;
  }
}

export async function getCustomerToken(loginData: FormProps): Promise<TokenResponse | undefined> {
  const { password, email } = loginData;
  try {
    const response = await fetch(`${AUTH_URL}oauth/${PROJECT_KEY}/customers/token`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=password&username=${email}&password=${password}&scope=manage_my_orders:memory-mart`,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer token');
    }

    const data: TokenResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customer token:', error);
    return undefined;
  }
}

export async function handleLogin(
  token: string,
  loginData: FormProps
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const { password, email } = loginData;
  try {
    const response = await fetch(`${API_URL}${PROJECT_KEY}/me/login`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status === BAD_REQUEST_CODE) {
      return { success: false, error: 'Invalid email or password' };
    }

    await getCustomerToken(loginData);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.log('Login failed', error);
    return { success: false, error: 'Something went wrong' };
  }
}
