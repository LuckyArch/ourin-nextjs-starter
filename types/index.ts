/**
 * Global TypeScript Types
 * Common types used throughout the application
 */

// ============================================
// API Types
// ============================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: PaginationMeta;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================
// Form Types
// ============================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: SelectOption[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    message?: string;
  };
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

// ============================================
// UI Types
// ============================================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline' | 'link';

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// ============================================
// Component Props Types
// ============================================

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WithLoading {
  isLoading?: boolean;
}

export interface WithDisabled {
  disabled?: boolean;
}

export interface WithError {
  error?: string | null;
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children?: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

// ============================================
// Table Types
// ============================================

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string | number;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

// ============================================
// Modal / Dialog Types
// ============================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export interface ConfirmDialogProps extends ModalProps {
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

// ============================================
// Utility Types
// ============================================

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type NonEmptyArray<T> = [T, ...T[]];

export type ValueOf<T> = T[keyof T];

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

// Make specific keys required
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Make specific keys optional
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
