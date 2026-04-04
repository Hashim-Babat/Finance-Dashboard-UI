import { useApp } from '../../context/AppContext';
import { useInsights } from '../../hooks/useInsights';
import InsightCard from './InsightCard';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

export default function InsightsPanel() {
  const { state } = useApp();
  const insights = useInsights(state.transactions);

  const trendEmoji = {
    increasing: '📈',
    decreasing: '📉',
    stable: '➡️',
  };

  const trendLabel = {
    increasing: 'Increasing',
    decreasing: 'Decreasing',
    stable: 'Stable',
  };

  const cards = [
    {
      icon: '🏆',
      title: 'Highest Spending',
      value: insights.topSpendingCategory?.category || 'N/A',
      description: insights.topSpendingCategory
        ? `${formatCurrency(insights.topSpendingCategory.amount)} (${insights.topSpendingCategory.percentage.toFixed(1)}% of total)`
        : 'No expense data',
      color: 'amber',
    },
    {
      icon: '💰',
      title: 'Best Income Month',
      value: insights.highestIncomeMonth?.label || 'N/A',
      description: insights.highestIncomeMonth
        ? `Earned ${formatCurrency(insights.highestIncomeMonth.income)}`
        : 'No income data',
      color: 'emerald',
    },
    {
      icon: '📊',
      title: 'Daily Avg Spending',
      value: formatCurrency(insights.averageDailySpending),
      description: 'Average daily expense across tracked period',
      color: 'sky',
    },
    {
      icon: '⚖️',
      title: 'Income:Expense Ratio',
      value: `${insights.incomeToExpenseRatio.toFixed(2)}x`,
      description: insights.incomeToExpenseRatio > 1
        ? 'Great! You earn more than you spend'
        : 'Warning: expenses exceed income',
      color: insights.incomeToExpenseRatio > 1 ? 'teal' : 'coral',
    },
    {
      icon: trendEmoji[insights.spendingTrend] || '➡️',
      title: 'Spending Trend',
      value: trendLabel[insights.spendingTrend] || 'Stable',
      description: 'Based on last 3 months of data',
      color: insights.spendingTrend === 'decreasing' ? 'emerald' : insights.spendingTrend === 'increasing' ? 'coral' : 'teal',
    },
    {
      icon: '🐷',
      title: 'Savings Rate',
      value: `${insights.savingsRate.toFixed(1)}%`,
      description: `Saving ${formatCurrency(insights.totalIncome - insights.totalExpenses)} of ${formatCurrency(insights.totalIncome)} total income`,
      color: 'violet',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <InsightCard
          key={index}
          {...card}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
        />
      ))}
    </div>
  );
}
