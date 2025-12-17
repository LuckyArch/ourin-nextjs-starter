'use client';

import { useEffect, RefObject } from 'react';

/**
 * useOnClickOutside - Detect clicks outside of element
 * 
 * @param ref - React ref of the element
 * @param handler - Callback when clicked outside
 * 
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useOnClickOutside(ref, () => setIsOpen(false));
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
