/**
 * Custom Hooks - Barrel Export
 * Re-export all hooks from a single entry point
 */

export { useDebounce } from './use-debounce';
export { useThrottle } from './use-throttle';
export { useLocalStorage } from './use-local-storage';
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLargeDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from './use-media-query';
export { useOnClickOutside } from './use-on-click-outside';
export { useScrollPosition } from './use-scroll-position';
export { useWindowSize } from './use-window-size';
export { useCopyToClipboard } from './use-copy-to-clipboard';
export { useAsync } from './use-async';
export { useToggle } from './use-toggle';
export { usePrevious } from './use-previous';
export { useIntersectionObserver } from './use-intersection-observer';
export { useHover } from './use-hover';
export { useKeyboardShortcut } from './use-keyboard-shortcut';
