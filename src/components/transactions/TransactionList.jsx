import { useState, useMemo } from 'react';
import { Edit3, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTransactions } from '../../hooks/useTransactions';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { TRANSACTION_TYPES, CATEGORY_COLORS, CATEGORY_ICONS, ROLES } from '../../utils/constants';
import { deleteTransaction as apiDeleteTransaction } from '../../services/mockApi';

const ITEMS_PER_PAGE = 10;

function getBadgeColor(type) {
  return type === TRANSACTION_TYPES.INCOME ? 'green' : 'red';
}

export default function TransactionList({ onEdit }) {
  const { state, actions } = useApp();
  const { transactions, totalCount } = useTransactions();
  const [currentPage, setCurrentPage] = useState(1);
  const isAdmin = state.role === ROLES.ADMIN;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return transactions.slice(start, start + ITEMS_PER_PAGE);
  }, [transactions, currentPage]);

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    const updated = await apiDeleteTransaction(id);
    actions.setTransactions(updated);
  }

  if (totalCount === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try adjusting your filters or add a new transaction."
      />
    );
  }

  return (
    <div>
      {/* ─── Desktop Table ─── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cream-200 dark:border-navy-600">
              {['Date', 'Description', 'Category', 'Type', 'Amount', ...(isAdmin ? ['Actions'] : [])].map(header => (
                <th
                  key={header}
                  className="text-left px-4 py-3 text-[10px] font-bold tracking-wider uppercase text-charcoal-700/50 dark:text-slate-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((txn, i) => {
              const isIncome = txn.type === TRANSACTION_TYPES.INCOME;
              const icon = CATEGORY_ICONS[txn.category] || '📎';

              return (
                <tr
                  key={txn.id}
                  className="border-b border-cream-100 dark:border-navy-700/50 hover:bg-cream-50 dark:hover:bg-navy-700/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <td className="px-4 py-3.5 text-sm text-charcoal-700 dark:text-slate-400">
                    {formatDate(txn.date, 'short')}
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-sm font-medium text-charcoal-900 dark:text-white">
                        {txn.description}
                      </p>
                      {txn.notes && (
                        <p className="text-xs text-charcoal-700/40 dark:text-slate-500 mt-0.5">
                          {txn.notes}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-sm text-charcoal-700 dark:text-slate-400">
                      <span>{icon}</span>
                      {txn.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge color={getBadgeColor(txn.type)} size="xs">
                      {txn.type === TRANSACTION_TYPES.INCOME ? 'Income' : 'Expense'}
                    </Badge>
                  </td>
                  <td className={`px-4 py-3.5 text-sm font-bold ${isIncome ? 'text-emerald-500' : 'text-coral-500'}`}>
                    {isIncome ? '+' : '-'}{formatCurrency(txn.amount)}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onEdit(txn)}
                          className="p-1.5 rounded-lg hover:bg-cream-100 dark:hover:bg-navy-600 text-charcoal-700/50 dark:text-slate-500 hover:text-teal-500 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(txn.id)}
                          className="p-1.5 rounded-lg hover:bg-coral-500/10 text-charcoal-700/50 dark:text-slate-500 hover:text-coral-500 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ─── Mobile Cards ─── */}
      <div className="md:hidden space-y-3">
        {paginatedTransactions.map(txn => {
          const isIncome = txn.type === TRANSACTION_TYPES.INCOME;
          const icon = CATEGORY_ICONS[txn.category] || '📎';
          const categoryColor = CATEGORY_COLORS[txn.category] || '#64748b';

          return (
            <div
              key={txn.id}
              className="flex items-center gap-3 p-4 bg-white dark:bg-navy-700 rounded-xl border border-cream-200 dark:border-navy-600"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                style={{ backgroundColor: `${categoryColor}20` }}
              >
                {icon}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-charcoal-900 dark:text-white truncate">
                  {txn.description}
                </p>
                <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mt-0.5">
                  {formatDate(txn.date, 'short')} · {txn.category}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-bold ${isIncome ? 'text-emerald-500' : 'text-coral-500'}`}>
                  {isIncome ? '+' : '-'}{formatCurrency(txn.amount)}
                </p>
                {isAdmin && (
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <button onClick={() => onEdit(txn)} className="p-1 text-charcoal-700/40 dark:text-slate-500 hover:text-teal-500 cursor-pointer">
                      <Edit3 size={13} />
                    </button>
                    <button onClick={() => handleDelete(txn.id)} className="p-1 text-charcoal-700/40 dark:text-slate-500 hover:text-coral-500 cursor-pointer">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Pagination ─── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-cream-200 dark:border-navy-700">
          <p className="text-sm text-charcoal-700/50 dark:text-slate-500">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-navy-600 text-charcoal-700 dark:text-slate-400 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-8 h-8 rounded-xl text-sm font-medium transition-all cursor-pointer
                  ${page === currentPage
                    ? 'bg-teal-500 text-white'
                    : 'hover:bg-cream-100 dark:hover:bg-navy-600 text-charcoal-700 dark:text-slate-400'
                  }
                `}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl hover:bg-cream-100 dark:hover:bg-navy-600 text-charcoal-700 dark:text-slate-400 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
