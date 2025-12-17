/**
 * Storage Utilities
 * LocalStorage and SessionStorage helpers with type safety
 */

/**
 * Get item from localStorage with type safety
 */
export function getStorageItem<T>(
  key: string,
  defaultValue: T,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): T {
  if (typeof window === 'undefined' || !storage) return defaultValue;
  
  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Set item in localStorage with type safety
 */
export function setStorageItem<T>(
  key: string,
  value: T,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): void {
  if (typeof window === 'undefined' || !storage) return;
  
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting storage item:', error);
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(
  key: string,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): void {
  if (typeof window === 'undefined' || !storage) return;
  storage.removeItem(key);
}

/**
 * Clear all items from localStorage
 */
export function clearStorage(
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): void {
  if (typeof window === 'undefined' || !storage) return;
  storage.clear();
}

/**
 * Check if key exists in localStorage
 */
export function hasStorageItem(
  key: string,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): boolean {
  if (typeof window === 'undefined' || !storage) return false;
  return storage.getItem(key) !== null;
}

/**
 * Get all keys from localStorage
 */
export function getStorageKeys(
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): string[] {
  if (typeof window === 'undefined' || !storage) return [];
  return Object.keys(storage);
}

/**
 * Get storage size in bytes
 */
export function getStorageSize(
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): number {
  if (typeof window === 'undefined' || !storage) return 0;
  
  let size = 0;
  for (const key of Object.keys(storage)) {
    const item = storage.getItem(key);
    if (item) {
      size += key.length + item.length;
    }
  }
  return size * 2; // UTF-16 = 2 bytes per character
}

/**
 * Set item with expiration
 */
export function setStorageItemWithExpiry<T>(
  key: string,
  value: T,
  ttl: number, // time to live in milliseconds
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): void {
  const item = {
    value,
    expiry: Date.now() + ttl,
  };
  setStorageItem(key, item, storage);
}

/**
 * Get item with expiration check
 */
export function getStorageItemWithExpiry<T>(
  key: string,
  defaultValue: T,
  storage: Storage = typeof window !== 'undefined' ? localStorage : null!
): T {
  const item = getStorageItem<{ value: T; expiry: number } | null>(
    key,
    null,
    storage
  );
  
  if (!item) return defaultValue;
  
  if (Date.now() > item.expiry) {
    removeStorageItem(key, storage);
    return defaultValue;
  }
  
  return item.value;
}
