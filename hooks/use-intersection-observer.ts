'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface IntersectionResult {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * useIntersectionObserver - Observe element visibility in viewport
 * 
 * @param options - IntersectionObserver options
 * @returns [ref, result]
 * 
 * @example
 * const [ref, { isIntersecting }] = useIntersectionObserver({
 *   threshold: 0.5,
 *   freezeOnceVisible: true,
 * });
 * 
 * return (
 *   <div ref={ref} className={isIntersecting ? 'visible' : 'hidden'}>
 *     Content
 *   </div>
 * );
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, IntersectionResult] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [result, setResult] = useState<IntersectionResult>({
    isIntersecting: false,
    entry: null,
  });

  const frozen = result.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || frozen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setResult({
          isIntersecting: entry.isIntersecting,
          entry,
        });
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, frozen]);

  return [elementRef, result];
}
