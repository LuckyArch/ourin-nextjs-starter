/**
 * DOM Utilities
 * Browser and DOM manipulation helpers
 */

/**
 * Scroll to top of page
 */
export function scrollToTop(smooth: boolean = true): void {
  if (typeof window === 'undefined') return;
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'instant',
  });
}

/**
 * Scroll to element by ID or element reference
 */
export function scrollToElement(
  target: string | HTMLElement,
  options: {
    offset?: number;
    smooth?: boolean;
    block?: ScrollLogicalPosition;
  } = {}
): void {
  if (typeof window === 'undefined') return;

  const { offset = 0, smooth = true, block = 'start' } = options;
  const element =
    typeof target === 'string' ? document.getElementById(target) : target;

  if (!element) return;

  const y =
    element.getBoundingClientRect().top + window.pageYOffset - offset;

  if (block === 'start' && offset !== 0) {
    window.scrollTo({
      top: y,
      behavior: smooth ? 'smooth' : 'instant',
    });
  } else {
    element.scrollIntoView({
      behavior: smooth ? 'smooth' : 'instant',
      block,
    });
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}

/**
 * Download file from URL or blob
 */
export function downloadFile(
  content: string | Blob,
  filename: string,
  mimeType: string = 'text/plain'
): void {
  if (typeof window === 'undefined') return;

  const blob =
    content instanceof Blob
      ? content
      : new Blob([content], { type: mimeType });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download file from URL
 */
export async function downloadFromUrl(
  url: string,
  filename: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    downloadFile(blob, filename);
  } catch (error) {
    console.error('Failed to download file:', error);
  }
}

/**
 * Check if element is in viewport
 */
export function isInViewport(
  element: HTMLElement,
  offset: number = 0
): boolean {
  if (typeof window === 'undefined') return false;

  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

/**
 * Get element's offset from top of document
 */
export function getOffsetTop(element: HTMLElement): number {
  let offset = 0;
  let el: HTMLElement | null = element;

  while (el) {
    offset += el.offsetTop;
    el = el.offsetParent as HTMLElement | null;
  }

  return offset;
}

/**
 * Lock body scroll
 */
export function lockBodyScroll(): void {
  if (typeof window === 'undefined') return;
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
}

/**
 * Unlock body scroll
 */
export function unlockBodyScroll(): void {
  if (typeof window === 'undefined') return;
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
}

/**
 * Get current scroll percentage
 */
export function getScrollPercentage(): number {
  if (typeof window === 'undefined') return 0;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  return scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
}

/**
 * Check if device is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if device is touch enabled
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get preferred color scheme
 */
export function getPreferredColorScheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Focus trap inside element
 */
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);
  firstElement?.focus();

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Print specific element
 */
export function printElement(element: HTMLElement): void {
  if (typeof window === 'undefined') return;

  const printWindow = window.open('', '', 'height=600,width=800');
  if (!printWindow) return;

  printWindow.document.write('<html><head><title>Print</title>');
  
  // Copy styles
  const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
  styles.forEach((style) => {
    printWindow.document.write(style.outerHTML);
  });
  
  printWindow.document.write('</head><body>');
  printWindow.document.write(element.outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}
