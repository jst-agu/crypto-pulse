'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hasDark = html.classList.contains('dark');

    if (hasDark || prefersDark) {
      html.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="border px-3 py-1 rounded text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      {isDark ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}
