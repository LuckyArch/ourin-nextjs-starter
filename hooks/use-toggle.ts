'use client';

import { useState, useCallback } from 'react';

/**
 * useToggle - Boolean toggle state with convenient methods
 * 
 * @param initialValue - Initial boolean value
 * @returns [value, toggle, setTrue, setFalse, setValue]
 * 
 * @example
 * const [isOpen, toggle, open, close] = useToggle(false);
 * 
 * <button onClick={toggle}>Toggle</button>
 * <button onClick={open}>Open</button>
 * <button onClick={close}>Close</button>
 */
export function useToggle(
  initialValue: boolean = false
): [
  boolean,
  () => void,
  () => void,
  () => void,
  (value: boolean) => void
] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse, setValue];
}
