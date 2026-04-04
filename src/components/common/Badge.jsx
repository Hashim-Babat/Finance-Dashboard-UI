const colorMap = {
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  red: 'bg-coral-500/10 text-coral-500 dark:bg-coral-500/20 dark:text-coral-400',
  blue: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  purple: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  gray: 'bg-cream-200 text-charcoal-700 dark:bg-slate-600 dark:text-slate-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
};

export default function Badge({ children, color = 'gray', className = '', size = 'sm' }) {
  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-lg
        ${sizeClass}
        ${colorMap[color] || colorMap.gray}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
