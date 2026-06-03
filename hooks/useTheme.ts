'use client';

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

function resolveInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    setThemeState(resolveInitialTheme());
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
