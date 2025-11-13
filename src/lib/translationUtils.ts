/**
 * Helper function to safely get a translation value without throwing errors
 * Returns undefined if the key doesn't exist
 */
export function safeTranslate(
  t: (key: string) => string,
  key: string
): string | undefined {
  try {
    const value = t(key);
    // Check if the value is the key itself (which means it doesn't exist)
    if (value === key || value.startsWith(key.split('.').pop() || '')) {
      return undefined;
    }
    return value;
  } catch {
    return undefined;
  }
}

/**
 * Helper function to safely get a translation value using raw() method
 * Returns undefined if the key doesn't exist
 * This function uses getMessage if available to avoid MISSING_MESSAGE errors
 */
export function safeTranslateRaw(
  t: { raw: (key: string) => any; getMessage?: (key: string) => any },
  key: string
): any {
  // Use getMessage if available (doesn't throw errors)
  if (t.getMessage) {
    try {
      const value = t.getMessage(key);
      // If value is undefined or the key itself, it doesn't exist
      if (value === undefined || value === key) {
        return undefined;
      }
      // Check if value is a string that matches the expected pattern for missing keys
      if (typeof value === 'string' && value.includes(key)) {
        return undefined;
      }
      return value;
    } catch {
      return undefined;
    }
  }
  
  // Fallback to raw() with error handling
  try {
    const value = t.raw(key);
    // If value is undefined or the key itself, it doesn't exist
    if (value === undefined || value === key) {
      return undefined;
    }
    // Check if value is a string that matches the expected pattern for missing keys
    if (typeof value === 'string' && value.includes(key)) {
      return undefined;
    }
    return value;
  } catch (error: any) {
    // Silently catch MISSING_MESSAGE errors
    if (error?.code === 'MISSING_MESSAGE' || error?.originalMessage?.includes('MISSING_MESSAGE')) {
      return undefined;
    }
    // Re-throw other errors
    throw error;
  }
}

