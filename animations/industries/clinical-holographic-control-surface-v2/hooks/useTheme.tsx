import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const isDark = theme === 'dark';

  useEffect(() => {
    setTheme(Math.random() > 0.5 ? 'light' : 'dark');
  }, []);

  const colors = {
    primary: isDark ? '#6366f1' : '#4f46e5', // Indigo
    secondary: isDark ? '#f97316' : '#ea580c', // Orange
    tertiary: isDark ? '#fbbf24' : '#d97706', // Amber
    success: isDark ? '#34d399' : '#059669', // Emerald
    text: isDark ? 'text-slate-300' : 'text-slate-600',
    heading: isDark ? 'text-white' : 'text-slate-900',
    muted: isDark ? 'text-slate-500' : 'text-slate-400',
    border: isDark ? 'border-white/5' : 'border-slate-200',
    panel: isDark
      ? 'bg-slate-900/40 backdrop-blur-md border border-white/10 shadow-2xl'
      : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
    highlightPanel: isDark
      ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-xl border border-white/10'
      : 'bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-[0_8px_30px_rgb(79,70,229,0.08)]'
  };

  return { theme, setTheme, isDark, colors };
}