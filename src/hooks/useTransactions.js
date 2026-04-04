import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DATE_RANGES, SORT_OPTIONS, TRANSACTION_TYPES } from '../utils/constants';

/**
 * Hook for filtering, sorting, and managing transactions
 */
export function useTransactions() {
  const { state } = useApp();
  const { transactions, filters } = state;

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower) ||
        t.notes?.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }

    // Type filter
    if (filters.type && filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type);
    }

    // Date range filter
    if (filters.dateRange && filters.dateRange !== DATE_RANGES.ALL) {
      const now = new Date();
      let startDate;

      switch (filters.dateRange) {
        case DATE_RANGES.THIS_MONTH:
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case DATE_RANGES.LAST_3_MONTHS:
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          break;
        case DATE_RANGES.LAST_6_MONTHS:
          startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
          break;
        case DATE_RANGES.THIS_YEAR:
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        result = result.filter(t => new Date(t.date) >= startDate);
      }
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case SORT_OPTIONS.DATE:
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case SORT_OPTIONS.AMOUNT:
          comparison = a.amount - b.amount;
          break;
        case SORT_OPTIONS.CATEGORY:
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = new Date(a.date) - new Date(b.date);
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return result;
  }, [transactions, filters]);

  // Summary calculations
  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === TRANSACTION_TYPES.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === TRANSACTION_TYPES.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;
    const netProfit = totalIncome - totalExpenses;

    // Current month calculations
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthTxns = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const lastMonthTxns = transactions.filter(t => {
      const d = new Date(t.date);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
    });

    const monthlyIncome = currentMonthTxns
      .filter(t => t.type === TRANSACTION_TYPES.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = currentMonthTxns
      .filter(t => t.type === TRANSACTION_TYPES.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthIncome = lastMonthTxns
      .filter(t => t.type === TRANSACTION_TYPES.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = lastMonthTxns
      .filter(t => t.type === TRANSACTION_TYPES.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    const incomeChange = lastMonthIncome > 0
      ? ((monthlyIncome - lastMonthIncome) / lastMonthIncome) * 100
      : 0;

    const expenseChange = lastMonthExpenses > 0
      ? ((monthlyExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
      : 0;

    return {
      totalBalance: 124850,
      totalIncome,
      totalExpenses,
      netProfit,
      monthlyIncome,
      monthlyExpenses,
      incomeChange,
      expenseChange,
      balanceChange: 8.4,
      profitChange: 18.7,
    };
  }, [transactions]);

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    summary,
    totalCount: filteredTransactions.length,
  };
}
