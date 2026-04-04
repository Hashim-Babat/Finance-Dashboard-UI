import { ALL_CATEGORIES, DATE_RANGES, DATE_RANGE_LABELS, SORT_OPTIONS, TRANSACTION_TYPES } from '../../utils/constants';
import { useApp } from '../../context/AppContext';
import SearchInput from '../common/SearchInput';
import Button from '../common/Button';
import { RotateCcw, SortAsc, SortDesc } from 'lucide-react';

export default function TransactionFilters() {
  const { state, actions } = useApp();
  const { filters } = state;

  const hasActiveFilters = filters.search || filters.category !== 'all' || filters.type !== 'all' || filters.dateRange !== DATE_RANGES.ALL;

  const selectClass = `
    px-3 py-2.5 rounded-xl text-sm appearance-none cursor-pointer
    bg-cream-50 dark:bg-navy-800
    border border-cream-200 dark:border-navy-600
    text-charcoal-800 dark:text-slate-300
    focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500
    transition-all duration-200
  `;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <SearchInput
          value={filters.search}
          onChange={(val) => actions.setFilters({ search: val })}
          placeholder="Search transactions..."
          className="flex-1"
        />

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => actions.setFilters({ category: e.target.value })}
          className={selectClass}
        >
          <option value="all">All Categories</option>
          {ALL_CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => actions.setFilters({ type: e.target.value })}
          className={selectClass}
        >
          <option value="all">All Types</option>
          <option value={TRANSACTION_TYPES.INCOME}>Income</option>
          <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
        </select>

        {/* Date Range */}
        <select
          value={filters.dateRange}
          onChange={(e) => actions.setFilters({ dateRange: e.target.value })}
          className={selectClass}
        >
          {Object.entries(DATE_RANGE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => actions.setFilters({ sortBy: e.target.value })}
            className={`${selectClass} text-xs py-2`}
          >
            <option value={SORT_OPTIONS.DATE}>Sort by Date</option>
            <option value={SORT_OPTIONS.AMOUNT}>Sort by Amount</option>
            <option value={SORT_OPTIONS.CATEGORY}>Sort by Category</option>
          </select>

          {/* Sort Order Toggle */}
          <button
            onClick={() => actions.setFilters({ sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc' })}
            className="p-2 rounded-xl bg-cream-50 dark:bg-navy-800 border border-cream-200 dark:border-navy-600 hover:bg-cream-100 dark:hover:bg-navy-700 text-charcoal-700 dark:text-slate-400 transition-colors cursor-pointer"
            title={`Sort ${filters.sortOrder === 'desc' ? 'ascending' : 'descending'}`}
          >
            {filters.sortOrder === 'desc' ? <SortDesc size={16} /> : <SortAsc size={16} />}
          </button>
        </div>

        {/* Reset Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            onClick={() => actions.resetFilters()}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
