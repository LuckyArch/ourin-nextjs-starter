/**
 * Number Utilities
 * Common number manipulation functions
 */

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get random number between min and max (inclusive)
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get random float between min and max
 */
export function randomFloatBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Round number to specified decimal places
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Check if number is even
 */
export function isEven(value: number): boolean {
  return value % 2 === 0;
}

/**
 * Check if number is odd
 */
export function isOdd(value: number): boolean {
  return value % 2 !== 0;
}

/**
 * Check if number is within range
 */
export function inRange(
  value: number,
  min: number,
  max: number,
  inclusive: boolean = true
): boolean {
  return inclusive
    ? value >= min && value <= max
    : value > min && value < max;
}

/**
 * Convert degrees to radians
 */
export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Convert radians to degrees
 */
export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

/**
 * Map value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Get percentage of value between min and max
 */
export function percentage(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

/**
 * Calculate distance between two points
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Get ordinal suffix for number (1st, 2nd, 3rd, etc.)
 */
export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Pad number with leading zeros
 */
export function padNumber(value: number, length: number): string {
  return String(value).padStart(length, '0');
}

/**
 * Check if number is positive
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 * Check if number is negative
 */
export function isNegative(value: number): boolean {
  return value < 0;
}

/**
 * Get sign of number (-1, 0, or 1)
 */
export function sign(value: number): -1 | 0 | 1 {
  if (value > 0) return 1;
  if (value < 0) return -1;
  return 0;
}

/**
 * Calculate factorial
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculate GCD (Greatest Common Divisor)
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Calculate LCM (Least Common Multiple)
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}
