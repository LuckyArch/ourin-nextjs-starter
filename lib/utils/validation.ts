/**
 * Validation Utilities
 * Common validation functions for forms and data
 */

/**
 * Check if string is a valid email
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if string is a valid URL
 */
export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if string is a valid phone number
 */
export function isPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Check if string contains only numbers
 */
export function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
} {
  const errors: string[] = [];
  let score = 0;

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  } else {
    score++;
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain a lowercase letter');
  } else {
    score++;
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  } else {
    score++;
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain a number');
  } else {
    score++;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain a special character');
  } else {
    score++;
  }

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
}

/**
 * Check if string is a valid Indonesian NIK (16 digits)
 */
export function isNIK(nik: string): boolean {
  return /^\d{16}$/.test(nik);
}

/**
 * Check if string is a valid Indonesian NPWP
 */
export function isNPWP(npwp: string): boolean {
  const cleaned = npwp.replace(/[.\-]/g, '');
  return /^\d{15}$/.test(cleaned);
}

/**
 * Check if value is a valid date
 */
export function isValidDate(date: unknown): boolean {
  if (date instanceof Date) return !isNaN(date.getTime());
  if (typeof date === 'string' || typeof date === 'number') {
    return !isNaN(new Date(date).getTime());
  }
  return false;
}
