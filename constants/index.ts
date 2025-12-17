/**
 * Application Constants
 * Centralized constants used throughout the application
 */

// ============================================
// API Constants
// ============================================

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
export const API_TIMEOUT = 30000; // 30 seconds

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ============================================
// Pagination Constants
// ============================================

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const DEFAULT_LIMITS = [10, 25, 50, 100] as const;

// ============================================
// Date Constants
// ============================================

export const DATE_FORMAT = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  WITH_TIME: 'dd/MM/yyyy HH:mm',
  FULL: 'EEEE, dd MMMM yyyy',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  TIME_ONLY: 'HH:mm',
} as const;

export const DAY_NAMES = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
] as const;

export const MONTH_NAMES = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
] as const;

// ============================================
// Breakpoints (matching Tailwind)
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================
// Animation Constants
// ============================================

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const TRANSITION_EASE = {
  default: 'ease-out',
  in: 'ease-in',
  out: 'ease-out',
  inOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ============================================
// Storage Keys
// ============================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  LOCALE: 'locale',
  SIDEBAR_STATE: 'sidebar_state',
  RECENT_SEARCHES: 'recent_searches',
} as const;

// ============================================
// Validation Constants
// ============================================

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  BIO_MAX_LENGTH: 500,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 1000,
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+62|62|0)8[1-9][0-9]{6,10}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  USERNAME: /^[a-zA-Z0-9_]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NIK: /^\d{16}$/,
  NPWP: /^\d{15}$/,
} as const;

// ============================================
// File Upload Constants
// ============================================

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_SIZE_IMAGE: 2 * 1024 * 1024, // 2MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const;

// ============================================
// Toast / Notification Constants
// ============================================

export const TOAST_DURATION = {
  short: 3000,
  default: 5000,
  long: 10000,
} as const;

// ============================================
// Error Messages
// ============================================

export const ERROR_MESSAGES = {
  GENERIC: 'Terjadi kesalahan. Silakan coba lagi.',
  NETWORK: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
  UNAUTHORIZED: 'Sesi Anda telah berakhir. Silakan login kembali.',
  FORBIDDEN: 'Anda tidak memiliki akses untuk melakukan tindakan ini.',
  NOT_FOUND: 'Data yang Anda cari tidak ditemukan.',
  VALIDATION: 'Mohon periksa kembali data yang Anda masukkan.',
  RATE_LIMIT: 'Terlalu banyak permintaan. Silakan tunggu sebentar.',
} as const;

// ============================================
// Success Messages
// ============================================

export const SUCCESS_MESSAGES = {
  SAVED: 'Data berhasil disimpan.',
  UPDATED: 'Data berhasil diperbarui.',
  DELETED: 'Data berhasil dihapus.',
  CREATED: 'Data berhasil dibuat.',
  COPIED: 'Berhasil disalin ke clipboard.',
} as const;

// ============================================
// Feature Flags
// ============================================

export const FEATURES = {
  DARK_MODE: true,
  NOTIFICATIONS: true,
  ANALYTICS: process.env.NODE_ENV === 'production',
  DEBUG_MODE: process.env.NODE_ENV === 'development',
} as const;
