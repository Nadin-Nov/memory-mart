export interface userData {
  token: string;
  isLoggedIn: boolean;
}

export function isUserData(value: unknown): value is userData {
  if (typeof value !== 'object' || value === null) return false;

  const object = value as Record<string, unknown>;

  return typeof object.token === 'string' && typeof object.isLoggedIn === 'boolean';
}
