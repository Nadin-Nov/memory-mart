import type { TokenResponse } from '@/services/AuthService/types';

export interface UserData {
  token: TokenResponse & { expires_at?: number };
  isAnon: boolean;
}