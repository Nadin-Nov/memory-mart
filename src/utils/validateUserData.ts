export interface userData {
  token: string;
  isLoggedIn: boolean;
  expirationDate: number;
  refreshToken?: string;
}

export function isUserData(value: unknown): value is userData {
  if (typeof value !== 'object' || value === null) return false;

  const object = value as Record<string, unknown>;

  const hasValidRefreshToken = object.refreshToken === undefined || typeof object.refreshToken === 'string';

  return (
    typeof object.token === 'string' &&
    typeof object.isLoggedIn === 'boolean' &&
    typeof object.expirationDate === 'number' &&
    hasValidRefreshToken
  );
}
