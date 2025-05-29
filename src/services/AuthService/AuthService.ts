import type { TokenResponse, FormProps, CustomerSignInResult, CustomerDraft, ErrorResponse } from './types';
import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_CT_CLIENT_ID as string;
const CLIENT_SECRET = import.meta.env.VITE_CT_CLIENT_SECRET as string;
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY as string;
const API_URL = import.meta.env.VITE_CT_API_URL as string;
const AUTH_URL = import.meta.env.VITE_CT_AUTH_URL as string;

const authHeader = 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
function authBearer(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}

const tokenAxios = axios.create({
  baseURL: `${AUTH_URL}oauth/${PROJECT_KEY}`,
  headers: {
    Authorization: authHeader,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const clientAxios = axios.create({
  baseURL: `${API_URL}${PROJECT_KEY}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAnonymousToken(): Promise<TokenResponse | undefined> {
  try {
    const response = await tokenAxios.post(
      '/anonymous/token',
      new URLSearchParams({ grant_type: 'client_credentials' }).toString()
    );

    return response.data as TokenResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export async function getCustomerToken(loginData: FormProps): Promise<TokenResponse | undefined> {
  const { password, email } = loginData;
  try {
    const response = await tokenAxios.post(
      '/customers/token',
      new URLSearchParams({
        grant_type: 'password',
        username: email,
        password: password,
        scope: `manage_my_profile:${PROJECT_KEY}`,
      }).toString()
    );

    return response.data as TokenResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export async function handleLogin(
  token: string,
  loginData: FormProps
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  try {
    const response = await clientAxios.post('/me/login', loginData, {
      headers: authBearer(token),
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Login failed:', error);

    let message = 'Something went wrong during login';
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      message =
        data && typeof data === 'object' && 'message' in data ? (data as ErrorResponse).message : 'Login failed';
    }

    return { success: false, error: message };
  }
}

export async function handleSignup(
  token: string,
  signupData: CustomerDraft
): Promise<{ success: boolean; data?: unknown; error?: string }> {
  try {
    const response = await clientAxios.post('/me/signup', signupData, { headers: authBearer(token) });

    const data: CustomerSignInResult = response.data as CustomerSignInResult;
    return { success: true, data };
  } catch (error) {
    console.error('Signup failed:', error);

    let message = 'Something went wrong during signup';
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      message =
        data && typeof data === 'object' && 'message' in data ? (data as ErrorResponse).message : 'Signup failed';
    }

    return { success: false, error: message };
  }
}
