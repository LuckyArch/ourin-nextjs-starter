'use client';

import { useCallback, useRef } from 'react';

/**
 * useThrottle - Throttle a callback function
 * 
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 * 
 * @example
 * const throttledScroll = useThrottle((e) => {
 *   console.log('Scroll event:', e);
 * }, 100);
 * 
 * window.addEventListener('scroll', throttledScroll);
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 200
): (...args: Parameters<T>) => void {
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
          () => {
            callback(...args);
            lastRan.current = Date.now();
          },
          delay - (now - lastRan.current)
        );
      }
    },
    [callback, delay]
  );
}
