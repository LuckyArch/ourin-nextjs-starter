'use client';

import { useState, useCallback } from 'react';

interface CopyToClipboardResult {
  isCopied: boolean;
  copyToClipboard: (text: string) => Promise<boolean>;
  error: Error | null;
}

/**
 * useCopyToClipboard - Copy text to clipboard
 * 
 * @param resetDelay - Delay in ms to reset isCopied state
 * @returns Object with isCopied state and copyToClipboard function
 * 
 * @example
 * const { isCopied, copyToClipboard } = useCopyToClipboard();
 * 
 * <button onClick={() => copyToClipboard('Hello!')}>
 *   {isCopied ? 'Copied!' : 'Copy'}
 * </button>
 */
export function useCopyToClipboard(
  resetDelay: number = 2000
): CopyToClipboardResult {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        const err = new Error('Clipboard not supported');
        setError(err);
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setError(null);

        setTimeout(() => {
          setIsCopied(false);
        }, resetDelay);

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Copy failed');
        setError(error);
        setIsCopied(false);
        return false;
      }
    },
    [resetDelay]
  );

  return { isCopied, copyToClipboard, error };
}
