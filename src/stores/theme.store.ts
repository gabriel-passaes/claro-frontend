import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  isDark: false,
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme, isDark: theme === 'dark' });
  },
}));
