import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2.5 rounded-xl
        bg-cream-100 dark:bg-navy-600
        hover:bg-cream-200 dark:hover:bg-navy-500
        text-charcoal-700 dark:text-slate-300
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-teal-500/30
        cursor-pointer
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-amber-400" />
      ) : (
        <Moon size={18} className="text-violet-500" />
      )}
    </button>
  );
}
