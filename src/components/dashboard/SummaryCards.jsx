import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Wallet, PiggyBank } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { useTransactions } from '../../hooks/useTransactions';

const iconStyles = {
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-500' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  coral: { bg: 'bg-coral-500/10', text: 'text-coral-500' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-500' },
};

const cards = [
  {
    id: 'balance',
    label: 'TOTAL BALANCE',
    icon: Wallet,
    valueKey: 'totalBalance',
    changeKey: 'balanceChange',
    subtext: 'this month',
    color: 'teal',
  },
  {
    id: 'income',
    label: 'MONTHLY REVENUE',
    icon: TrendingUp,
    valueKey: 'monthlyIncome',
    changeKey: 'incomeChange',
    subtext: 'vs last month',
    color: 'emerald',
  },
  {
    id: 'expenses',
    label: 'EXPENSES',
    icon: TrendingDown,
    valueKey: 'monthlyExpenses',
    changeKey: 'expenseChange',
    subtext: 'vs last month',
    color: 'coral',
    invertChange: true,
  },
  {
    id: 'profit',
    label: 'NET PROFIT',
    icon: PiggyBank,
    valueKey: 'netProfit',
    changeKey: 'profitChange',
    subtext: 'vs last month',
    color: 'violet',
  },
];

export default function SummaryCards() {
  const { summary } = useTransactions();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const value = summary[card.valueKey] || 0;
        const change = summary[card.changeKey] || 0;
        const isPositive = card.invertChange ? change <= 0 : change >= 0;
        const Icon = card.icon;
        const styles = iconStyles[card.color];

        return (
          <Card
            key={card.id}
            hover
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal-700/50 dark:text-slate-500">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl ${styles.bg}`}>
                <Icon size={16} className={styles.text} />
              </div>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-charcoal-900 dark:text-white mb-2 tracking-tight">
              {formatCurrency(value, value >= 10000)}
            </p>

            <div className="flex items-center gap-2">
              <span className={`
                inline-flex items-center gap-0.5 text-xs font-semibold
                ${isPositive ? 'text-emerald-500' : 'text-coral-500'}
              `}>
                {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {formatPercentage(Math.abs(change))}
              </span>
              <span className="text-xs text-charcoal-700/40 dark:text-slate-500">
                {card.subtext}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

