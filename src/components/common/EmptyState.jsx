import { Inbox } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No data found',
  description = 'There are no items to display.',
  action = null,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-cream-100 dark:bg-navy-600 flex items-center justify-center mb-4">
        <Icon size={28} className="text-charcoal-700/40 dark:text-slate-400/40" />
      </div>
      <h3 className="text-base font-semibold text-charcoal-800 dark:text-slate-300 mb-1">
        {title}
      </h3>
      <p className="text-sm text-charcoal-700/60 dark:text-slate-400 text-center max-w-xs mb-4">
        {description}
      </p>
      {action}
    </div>
  );
}
