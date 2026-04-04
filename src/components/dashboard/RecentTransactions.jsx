import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { TRANSACTION_TYPES, CATEGORY_COLORS, CATEGORY_ICONS } from '../../utils/constants';

function getBadgeColor(category) {
  const map = {
    'Investments': 'blue',
    'Entertainment': 'purple',
    'Dividends': 'green',
    'Salary': 'green',
    'Freelance': 'teal',
    'Food & Dining': 'amber',
    'Shopping': 'purple',
    'Bills & Utilities': 'red',
    'Transportation': 'blue',
    'Health': 'green',
    'Education': 'purple',
  };
  return map[category] || 'gray';
}

export default function RecentTransactions() {
  const { state } = useApp();
  const navigate = useNavigate();

  const recent = [...state.transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Card
      className="animate-slide-up"
      style={{ animationDelay: '600ms', animationFillMode: 'both' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-charcoal-900 dark:text-white">
          Recent Transactions
        </h3>
        <button
          onClick={() => navigate('/transactions')}
          className="flex items-center gap-1 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors cursor-pointer"
        >
          View all
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {recent.map(txn => {
          const isIncome = txn.type === TRANSACTION_TYPES.INCOME;
          const initial = txn.description.charAt(0).toUpperCase();
          const categoryColor = CATEGORY_COLORS[txn.category] || '#64748b';

          return (
            <div
              key={txn.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream-100/50 dark:hover:bg-navy-600/50 transition-colors group"
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: categoryColor }}
              >
                {initial}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-charcoal-900 dark:text-white truncate">
                  {txn.description}
                </p>
                <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mt-0.5">
                  {formatDate(txn.date)} · {txn.notes || txn.category}
                </p>
              </div>

              {/* Amount + Badge */}
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-bold ${isIncome ? 'text-emerald-500' : 'text-coral-500'}`}>
                  {isIncome ? '+' : '-'}{formatCurrency(txn.amount)}
                </p>
                <Badge color={getBadgeColor(txn.category)} size="xs" className="mt-1">
                  {txn.category.split(' ')[0]}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
