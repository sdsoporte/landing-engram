'use client';

import { useSyncExternalStore } from 'react';

function getSnapshot() {
  // Check if window is available (SSR safety)
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  // Server always returns false (no motion preference known)
  return false;
}

function subscribe(callback: () => void) {
  // SSR safety: window not available on server
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
