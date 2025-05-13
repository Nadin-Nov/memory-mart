export const LocalStorageService = {
  getItem<T>(key: string, validator: (value: unknown) => value is T): T | undefined {
    const item = localStorage.getItem(key);
    if (!item) return undefined;

    try {
      const parsed: unknown = JSON.parse(item);
      return validator(parsed) ? parsed : undefined;
    } catch (error) {
      console.error(`Failed to parse localStorage item for key: ${key}`, error);
      return undefined;
    }
  },

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  },
};
