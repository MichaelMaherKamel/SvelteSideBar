// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import type { ThemeType } from '$lib/index';

// Create a writable store for theme settings
export const themeStore = writable<ThemeType>('dark');

// Helper function to toggle theme mode
export function toggleTheme(): ThemeType {
  let newTheme: ThemeType;
  themeStore.update((theme: ThemeType) => {
    newTheme = theme === 'dark' ? 'light' : 'dark';
    return newTheme;
  });
  return newTheme!;
}

// Helper function to set theme directly
export function setTheme(themeName: ThemeType): ThemeType | null {
  if (themeName === 'dark' || themeName === 'light') {
    themeStore.update(() => themeName);
    return themeName;
  }
  return null;
}

// Helper to get current theme
export function getCurrentTheme(): ThemeType {
  let currentTheme: ThemeType;
  const unsubscribe = themeStore.subscribe((value: ThemeType) => {
    currentTheme = value;
  });
  unsubscribe();
  return currentTheme!;
}

// Initialize global window methods if in browser
export function initializeWindowMethods(): void {
  if (typeof window !== 'undefined') {
    window.toggleTheme = toggleTheme;
    window.getCurrentTheme = getCurrentTheme;
    window.setTheme = setTheme;

    // Add event dispatching for theme changes
    themeStore.subscribe((theme: ThemeType) => {
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        const event = new CustomEvent('themechange', { 
          detail: { theme } 
        });
        window.dispatchEvent(event);
      }
    });
  }
}

// Initialize theme based on preferences
export function initializeTheme(): ThemeType {
  // Check for stored preference first
  const storedTheme = typeof localStorage !== 'undefined' ? 
    localStorage.getItem('user-theme') : null;
  
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme as ThemeType;
  }
  
  // Then check for system preference
  if (typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  // Default to dark theme
  return 'dark';
}

// Set up theme listeners for system preference changes
export function setupThemeListeners(): () => void {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('user-theme')) {
        // Only auto-update if user hasn't set a preference
        const newTheme: ThemeType = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
      }
    };
    
    // Use addEventListener (the modern approach)
    // Older browsers that only support addListener are increasingly rare
    darkModeMediaQuery.addEventListener('change', handleThemeChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleThemeChange);
  }
  
  return () => {}; // Empty cleanup function if no listeners were set
}

// Setup DOM and localStorage updates when theme changes
export function setupThemeEffects(): () => void {
  // Subscribe to theme changes to update DOM and localStorage
  return themeStore.subscribe((theme: ThemeType) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('user-theme', theme);
    }
  });
}