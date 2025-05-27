// src/lib/index.ts
export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  icon: string;
  badge?: string;
}

export interface UserMenuActionEvent {
  detail: {
    action: string;
  };
}

export interface Breadcrumb {
  label: string;
  url: string | null;
}

export interface User {
  name: string;
  email: string;
  avatar: string | null;
  role: string;
}

// Theme types
export type ThemeType = 'dark' | 'light';

export interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: ThemeType;
  };
}

// Extend the Window interface
declare global {
  interface Window {
    toggleTheme: () => ThemeType;
    getCurrentTheme: () => ThemeType;
    setTheme: (themeName: ThemeType) => ThemeType | null;
  }
}