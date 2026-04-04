import { useMemo } from 'react';
import { TRANSACTION_TYPES, CATEGORY_COLORS, MONTHS } from '../utils/constants';

/**
 * Hook for computing insights from transaction data
 */
export function useInsights(transactions) {
  const insights = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        topSpendingCategory: null,
        categoryBreakdown: [],
        monthlyComparison: [],
        averageDailySpending: 0,
        incomeToExpenseRatio: 0,
        highestIncomeMonth: null,
        spendingTrend: 'stable',
        totalCategories: 0,
        savingsRate: 0,
      };
    }

    // ── Category Breakdown (expenses only) ──
    const expensesByCategory = {};
    const expenses = transactions.filter(t => t.type === TRANSACTION_TYPES.EXPENSE);

    expenses.forEach(t => {
      if (!expensesByCategory[t.category]) {
        expensesByCategory[t.category] = 0;
      }
      expensesByCategory[t.category] += t.amount;
    });

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    const categoryBreakdown = Object.entries(expensesByCategory)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
        color: CATEGORY_COLORS[category] || '#64748b',
      }))
      .sort((a, b) => b.amount - a.amount);

    const topSpendingCategory = categoryBreakdown[0] || null;

    // ── Monthly Comparison ──
    const monthlyMap = {};
    transactions.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyMap[key]) {
        monthlyMap[key] = { month: MONTHS[date.getMonth()], year: date.getFullYear(), income: 0, expenses: 0 };
      }
      if (t.type === TRANSACTION_TYPES.INCOME) {
        monthlyMap[key].income += t.amount;
      } else {
        monthlyMap[key].expenses += t.amount;
      }
    });

    const monthlyComparison = Object.entries(monthlyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, data]) => ({
        ...data,
        label: `${data.month} ${data.year}`,
        savings: data.income - data.expenses,
      }));

    // ── Average Daily Spending ──
    const dates = expenses.map(t => new Date(t.date));
    const minDate = dates.length > 0 ? new Date(Math.min(...dates)) : new Date();
    const maxDate = dates.length > 0 ? new Date(Math.max(...dates)) : new Date();
    const daysDiff = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)));
    const averageDailySpending = totalExpenses / daysDiff;

    // ── Income to Expense Ratio ──
    const totalIncome = transactions
      .filter(t => t.type === TRANSACTION_TYPES.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    const incomeToExpenseRatio = totalExpenses > 0 ? totalIncome / totalExpenses : 0;

    // ── Highest Income Month ──
    const highestIncomeMonth = monthlyComparison.reduce(
      (max, m) => (m.income > (max?.income || 0) ? m : max),
      null
    );

    // ── Spending Trend ──
    let spendingTrend = 'stable';
    if (monthlyComparison.length >= 3) {
      const recent = monthlyComparison.slice(-3);
      const first = recent[0].expenses;
      const last = recent[recent.length - 1].expenses;
      if (last > first * 1.1) spendingTrend = 'increasing';
      else if (last < first * 0.9) spendingTrend = 'decreasing';
    }

    // ── Savings Rate ──
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    return {
      topSpendingCategory,
      categoryBreakdown,
      monthlyComparison,
      averageDailySpending,
      incomeToExpenseRatio,
      highestIncomeMonth,
      spendingTrend,
      totalCategories: categoryBreakdown.length,
      savingsRate,
      totalIncome,
      totalExpenses,
    };
  }, [transactions]);

  return insights;
}
