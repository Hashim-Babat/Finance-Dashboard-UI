export const ROLES = {
  ADMIN: 'admin',
  VIEWER: 'viewer',
};

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const CATEGORIES = {
  FOOD: 'Food & Dining',
  SHOPPING: 'Shopping',
  TRANSPORT: 'Transportation',
  BILLS: 'Bills & Utilities',
  ENTERTAINMENT: 'Entertainment',
  HEALTH: 'Health',
  EDUCATION: 'Education',
  SALARY: 'Salary',
  FREELANCE: 'Freelance',
  INVESTMENTS: 'Investments',
  DIVIDENDS: 'Dividends',
  OTHER: 'Other',
};

export const EXPENSE_CATEGORIES = [
  CATEGORIES.FOOD,
  CATEGORIES.SHOPPING,
  CATEGORIES.TRANSPORT,
  CATEGORIES.BILLS,
  CATEGORIES.ENTERTAINMENT,
  CATEGORIES.HEALTH,
  CATEGORIES.EDUCATION,
  CATEGORIES.OTHER,
];

export const INCOME_CATEGORIES = [
  CATEGORIES.SALARY,
  CATEGORIES.FREELANCE,
  CATEGORIES.INVESTMENTS,
  CATEGORIES.DIVIDENDS,
];

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

export const CATEGORY_COLORS = {
  [CATEGORIES.FOOD]: '#f97316',
  [CATEGORIES.SHOPPING]: '#8b5cf6',
  [CATEGORIES.TRANSPORT]: '#0ea5e9',
  [CATEGORIES.BILLS]: '#ef4444',
  [CATEGORIES.ENTERTAINMENT]: '#ec4899',
  [CATEGORIES.HEALTH]: '#10b981',
  [CATEGORIES.EDUCATION]: '#6366f1',
  [CATEGORIES.SALARY]: '#22c55e',
  [CATEGORIES.FREELANCE]: '#14b8a6',
  [CATEGORIES.INVESTMENTS]: '#3b82f6',
  [CATEGORIES.DIVIDENDS]: '#a855f7',
  [CATEGORIES.OTHER]: '#64748b',
};

export const CATEGORY_ICONS = {
  [CATEGORIES.FOOD]: '🍕',
  [CATEGORIES.SHOPPING]: '🛍️',
  [CATEGORIES.TRANSPORT]: '🚗',
  [CATEGORIES.BILLS]: '📱',
  [CATEGORIES.ENTERTAINMENT]: '🎬',
  [CATEGORIES.HEALTH]: '💊',
  [CATEGORIES.EDUCATION]: '📚',
  [CATEGORIES.SALARY]: '💰',
  [CATEGORIES.FREELANCE]: '💻',
  [CATEGORIES.INVESTMENTS]: '📈',
  [CATEGORIES.DIVIDENDS]: '🏦',
  [CATEGORIES.OTHER]: '📎',
};

export const DATE_RANGES = {
  THIS_MONTH: 'this_month',
  LAST_3_MONTHS: 'last_3_months',
  LAST_6_MONTHS: 'last_6_months',
  THIS_YEAR: 'this_year',
  ALL: 'all',
};

export const DATE_RANGE_LABELS = {
  [DATE_RANGES.THIS_MONTH]: 'This Month',
  [DATE_RANGES.LAST_3_MONTHS]: 'Last 3 Months',
  [DATE_RANGES.LAST_6_MONTHS]: 'Last 6 Months',
  [DATE_RANGES.THIS_YEAR]: 'This Year',
  [DATE_RANGES.ALL]: 'All Time',
};

export const SORT_OPTIONS = {
  DATE: 'date',
  AMOUNT: 'amount',
  CATEGORY: 'category',
};

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  { id: 'transactions', label: 'Transactions', path: '/transactions' },
  { id: 'insights', label: 'Insights', path: '/insights' },
];

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const USER_PROFILE = {
  name: 'James Morgan',
  initials: 'JM',
  plan: 'Pro Plan',
  avatar: null,
};
