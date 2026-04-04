import { Search, X } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-700/40 dark:text-slate-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-9 pr-8 py-2.5
          bg-cream-50 dark:bg-navy-800
          border border-cream-200 dark:border-navy-600
          rounded-xl
          text-sm text-charcoal-800 dark:text-slate-300
          placeholder:text-charcoal-700/40 dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500
          transition-all duration-200
        "
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-cream-200 dark:hover:bg-navy-600 text-charcoal-700/40 dark:text-slate-500 transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
