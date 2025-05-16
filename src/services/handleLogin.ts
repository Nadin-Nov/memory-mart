const API_URL = import.meta.env.VITE_CT_API_URL;
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY;

const BAD_REQUEST_CODE = 400;

import { getCustomerToken } from './getCustomerToken';

export interface LoginFormProps {
  email: string;
  password: string;
}

export async function handleLogin(
  token: string,
  loginData: LoginFormProps
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

    await getCustomerToken();
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.log('Login failed', error);
    return { success: false, error: 'Something went wrong' };
  }
}
