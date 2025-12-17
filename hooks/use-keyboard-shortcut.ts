'use client';

import { useEffect, useCallback, useRef } from 'react';

type KeyCombo = string[];
type KeyboardShortcutCallback = (event: KeyboardEvent) => void;

interface UseKeyboardShortcutOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

/**
 * useKeyboardShortcut - Handle keyboard shortcuts
 * 
 * @param keys - Array of keys (e.g., ['ctrl', 'k'])
 * @param callback - Function to call when shortcut is triggered
 * @param options - Options for the shortcut
 * 
 * @example
 * // Single key
 * useKeyboardShortcut(['Escape'], () => setIsOpen(false));
 * 
 * // Combo (Ctrl+K)
 * useKeyboardShortcut(['ctrl', 'k'], () => openCommandPalette());
 * 
 * // Combo (Ctrl+Shift+P)
 * useKeyboardShortcut(['ctrl', 'shift', 'p'], () => openSettings());
 */
export function useKeyboardShortcut(
  keys: KeyCombo,
  callback: KeyboardShortcutCallback,
  options: UseKeyboardShortcutOptions = {}
): void {
  const { enabled = true, preventDefault = true, stopPropagation = false } = options;
  
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const normalizedKeys = keys.map((key) => key.toLowerCase());
      const pressedKeys: string[] = [];

      if (event.ctrlKey || event.metaKey) pressedKeys.push('ctrl');
      if (event.shiftKey) pressedKeys.push('shift');
      if (event.altKey) pressedKeys.push('alt');

      const key = event.key.toLowerCase();
      if (!['control', 'shift', 'alt', 'meta'].includes(key)) {
        pressedKeys.push(key);
      }

      const isMatch =
        normalizedKeys.length === pressedKeys.length &&
        normalizedKeys.every((k) => pressedKeys.includes(k));

      if (isMatch) {
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        callbackRef.current(event);
      }
    },
    [keys, enabled, preventDefault, stopPropagation]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}
