// src/components/ThemeToggle.jsx
import { useEffect, useState } from 'react';
import './themetoggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
