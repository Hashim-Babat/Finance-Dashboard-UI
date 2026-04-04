export default function InsightCard({ icon, title, value, description, color = 'teal', className = '' }) {
  const colorMap = {
    teal: 'from-teal-500/10 to-teal-600/5 dark:from-teal-500/20 dark:to-teal-600/10 border-teal-500/20',
    emerald: 'from-emerald-500/10 to-emerald-600/5 dark:from-emerald-500/20 dark:to-emerald-600/10 border-emerald-500/20',
    coral: 'from-coral-500/10 to-coral-400/5 dark:from-coral-500/20 dark:to-coral-400/10 border-coral-500/20',
    violet: 'from-violet-500/10 to-violet-600/5 dark:from-violet-500/20 dark:to-violet-600/10 border-violet-500/20',
    amber: 'from-amber-500/10 to-amber-600/5 dark:from-amber-500/20 dark:to-amber-600/10 border-amber-500/20',
    sky: 'from-sky-500/10 to-sky-600/5 dark:from-sky-500/20 dark:to-sky-600/10 border-sky-500/20',
  };

  return (
    <div
      className={`
        p-5 rounded-2xl border
        bg-gradient-to-br ${colorMap[color] || colorMap.teal}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-charcoal-700/60 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-xl font-bold text-charcoal-900 dark:text-white mt-1 truncate">
            {value}
          </p>
          <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mt-1">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
