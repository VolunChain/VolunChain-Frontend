export const isClient = typeof window !== "undefined";
export const getItem = <T>(key: string, defaultValue: T): T => {
  if (!isClient) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return defaultValue;
  }
};
export const setItem = <T>(key: string, value: T): void => {
  if (!isClient) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
};
export const removeItem = (key: string): void => {
  if (!isClient) return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
};
