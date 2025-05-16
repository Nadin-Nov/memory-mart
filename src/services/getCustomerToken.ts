const CLIENT_ID = import.meta.env.VITE_CT_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CT_CLIENT_SECRET;
const AUTH_URL = import.meta.env.VITE_CT_AUTH_URL;
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY;

import type { TokenResponse } from '@/services/getAnonymousToken';

export async function getCustomerToken(): Promise<TokenResponse | undefined> {
  try {
    const authHeader = 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(`${AUTH_URL}oauth/${PROJECT_KEY}/customers/token`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=password&username=johndoe@example.com&password=secret123&scope=manage_my_orders:memory-mart',
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
