'use client';

import { useRef, useEffect } from 'react';

/**
 * usePrevious - Get the previous value of a state
 * 
 * @param value - Current value
 * @returns Previous value
 * 
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * 
 * console.log(`Count changed from ${prevCount} to ${count}`);
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
