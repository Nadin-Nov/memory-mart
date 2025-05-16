const CLIENT_ID = import.meta.env.VITE_CT_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CT_CLIENT_SECRET;
const AUTH_URL = import.meta.env.VITE_CT_AUTH_URL;
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY;

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token?: string;
}

export async function getAnonymousToken(): Promise<TokenResponse | undefined> {
  try {
    const authHeader = 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
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
