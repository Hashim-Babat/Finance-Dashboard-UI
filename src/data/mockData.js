import { CATEGORIES, TRANSACTION_TYPES } from '../utils/constants';

/**
 * Generate 65+ realistic mock transactions spanning Oct 2025 – Apr 2026
 */
export const mockTransactions = [
  // ── April 2026 ──
  { id: 'txn_001', date: '2026-04-03', description: 'Apple Inc. — Buy', amount: 2340.00, category: CATEGORIES.INVESTMENTS, type: TRANSACTION_TYPES.EXPENSE, notes: 'AAPL · 12 shares' },
  { id: 'txn_002', date: '2026-04-02', description: 'Netflix Subscription', amount: 15.99, category: CATEGORIES.ENTERTAINMENT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Recurring bill' },
  { id: 'txn_003', date: '2026-04-01', description: 'Dividend Payment', amount: 480.00, category: CATEGORIES.DIVIDENDS, type: TRANSACTION_TYPES.INCOME, notes: 'Quarterly income' },
  { id: 'txn_004', date: '2026-04-01', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'April paycheck' },
  { id: 'txn_005', date: '2026-04-02', description: 'Grocery Store', amount: 127.45, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Weekly groceries' },
  { id: 'txn_006', date: '2026-04-03', description: 'Electric Bill', amount: 94.20, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly electricity' },

  // ── March 2026 ──
  { id: 'txn_007', date: '2026-03-28', description: 'Freelance Project — Acme Corp', amount: 3200.00, category: CATEGORIES.FREELANCE, type: TRANSACTION_TYPES.INCOME, notes: 'Website redesign' },
  { id: 'txn_008', date: '2026-03-25', description: 'Amazon Purchase', amount: 249.99, category: CATEGORIES.SHOPPING, type: TRANSACTION_TYPES.EXPENSE, notes: 'Noise-cancelling headphones' },
  { id: 'txn_009', date: '2026-03-22', description: 'Gas Station', amount: 52.30, category: CATEGORIES.TRANSPORT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Full tank' },
  { id: 'txn_010', date: '2026-03-20', description: 'Restaurant — The Olive Garden', amount: 68.50, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Dinner with family' },
  { id: 'txn_011', date: '2026-03-18', description: 'Gym Membership', amount: 49.99, category: CATEGORIES.HEALTH, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly membership' },
  { id: 'txn_012', date: '2026-03-15', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'March paycheck (mid-month)' },
  { id: 'txn_013', date: '2026-03-12', description: 'Phone Bill', amount: 85.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'T-Mobile plan' },
  { id: 'txn_014', date: '2026-03-10', description: 'Online Course — React Advanced', amount: 199.00, category: CATEGORIES.EDUCATION, type: TRANSACTION_TYPES.EXPENSE, notes: 'Udemy course' },
  { id: 'txn_015', date: '2026-03-08', description: 'Coffee Shop', amount: 24.50, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Weekly coffee runs' },
  { id: 'txn_016', date: '2026-03-05', description: 'Movie Tickets', amount: 32.00, category: CATEGORIES.ENTERTAINMENT, type: TRANSACTION_TYPES.EXPENSE, notes: '2 tickets — IMAX' },
  { id: 'txn_017', date: '2026-03-03', description: 'Internet Bill', amount: 79.99, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Xfinity monthly' },
  { id: 'txn_018', date: '2026-03-01', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'March paycheck' },
  { id: 'txn_019', date: '2026-03-01', description: 'Rent Payment', amount: 1800.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly rent' },

  // ── February 2026 ──
  { id: 'txn_020', date: '2026-02-27', description: 'Uber Rides', amount: 43.75, category: CATEGORIES.TRANSPORT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Weekly commute' },
  { id: 'txn_021', date: '2026-02-25', description: 'Pharmacy — CVS', amount: 38.90, category: CATEGORIES.HEALTH, type: TRANSACTION_TYPES.EXPENSE, notes: 'Vitamins & supplements' },
  { id: 'txn_022', date: '2026-02-22', description: 'Dividend Payment', amount: 320.00, category: CATEGORIES.DIVIDENDS, type: TRANSACTION_TYPES.INCOME, notes: 'Quarterly dividend' },
  { id: 'txn_023', date: '2026-02-20', description: 'Walmart Groceries', amount: 156.30, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Bi-weekly groceries' },
  { id: 'txn_024', date: '2026-02-18', description: 'Spotify Premium', amount: 10.99, category: CATEGORIES.ENTERTAINMENT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly subscription' },
  { id: 'txn_025', date: '2026-02-15', description: 'Freelance — Logo Design', amount: 1500.00, category: CATEGORIES.FREELANCE, type: TRANSACTION_TYPES.INCOME, notes: 'Brand identity project' },
  { id: 'txn_026', date: '2026-02-13', description: "Valentine's Day Dinner", amount: 145.00, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Fine dining' },
  { id: 'txn_027', date: '2026-02-10', description: 'Car Insurance', amount: 189.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly premium' },
  { id: 'txn_028', date: '2026-02-08', description: 'Nike Store', amount: 165.00, category: CATEGORIES.SHOPPING, type: TRANSACTION_TYPES.EXPENSE, notes: 'Running shoes' },
  { id: 'txn_029', date: '2026-02-05', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'February paycheck' },
  { id: 'txn_030', date: '2026-02-03', description: 'Electric Bill', amount: 112.40, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Winter heating spike' },
  { id: 'txn_031', date: '2026-02-01', description: 'Rent Payment', amount: 1800.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly rent' },

  // ── January 2026 ──
  { id: 'txn_032', date: '2026-01-30', description: 'Tech Conference Ticket', amount: 399.00, category: CATEGORIES.EDUCATION, type: TRANSACTION_TYPES.EXPENSE, notes: 'React Summit 2026' },
  { id: 'txn_033', date: '2026-01-27', description: 'Whole Foods', amount: 98.65, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Organic groceries' },
  { id: 'txn_034', date: '2026-01-25', description: 'Investment Return', amount: 890.00, category: CATEGORIES.INVESTMENTS, type: TRANSACTION_TYPES.INCOME, notes: 'ETF returns' },
  { id: 'txn_035', date: '2026-01-22', description: 'Dental Checkup', amount: 275.00, category: CATEGORIES.HEALTH, type: TRANSACTION_TYPES.EXPENSE, notes: 'Annual cleaning' },
  { id: 'txn_036', date: '2026-01-20', description: 'Target Shopping', amount: 87.30, category: CATEGORIES.SHOPPING, type: TRANSACTION_TYPES.EXPENSE, notes: 'Home essentials' },
  { id: 'txn_037', date: '2026-01-17', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'January paycheck (mid)' },
  { id: 'txn_038', date: '2026-01-15', description: 'Gas Station', amount: 48.90, category: CATEGORIES.TRANSPORT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Fill up' },
  { id: 'txn_039', date: '2026-01-12', description: 'HBO Max Subscription', amount: 15.99, category: CATEGORIES.ENTERTAINMENT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly streaming' },
  { id: 'txn_040', date: '2026-01-10', description: 'Water Bill', amount: 42.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Quarterly water' },
  { id: 'txn_041', date: '2026-01-07', description: 'Freelance — Mobile App UI', amount: 2800.00, category: CATEGORIES.FREELANCE, type: TRANSACTION_TYPES.INCOME, notes: 'UI/UX contract work' },
  { id: 'txn_042', date: '2026-01-05', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'January paycheck' },
  { id: 'txn_043', date: '2026-01-03', description: 'New Year Dinner', amount: 210.00, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Celebration dinner' },
  { id: 'txn_044', date: '2026-01-01', description: 'Rent Payment', amount: 1800.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly rent' },

  // ── December 2025 ──
  { id: 'txn_045', date: '2025-12-28', description: 'Christmas Gifts', amount: 520.00, category: CATEGORIES.SHOPPING, type: TRANSACTION_TYPES.EXPENSE, notes: 'Holiday shopping' },
  { id: 'txn_046', date: '2025-12-25', description: 'Holiday Bonus', amount: 2500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'Year-end bonus' },
  { id: 'txn_047', date: '2025-12-22', description: 'Flight Tickets — NYC', amount: 380.00, category: CATEGORIES.TRANSPORT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Holiday travel' },
  { id: 'txn_048', date: '2025-12-20', description: 'Costco Groceries', amount: 234.50, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Holiday cooking supplies' },
  { id: 'txn_049', date: '2025-12-18', description: 'Dividend Payment', amount: 410.00, category: CATEGORIES.DIVIDENDS, type: TRANSACTION_TYPES.INCOME, notes: 'Year-end dividend' },
  { id: 'txn_050', date: '2025-12-15', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'December paycheck' },
  { id: 'txn_051', date: '2025-12-12', description: 'Heating Bill', amount: 156.80, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Winter heating' },
  { id: 'txn_052', date: '2025-12-10', description: 'Concert Tickets', amount: 120.00, category: CATEGORIES.ENTERTAINMENT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Holiday concert' },
  { id: 'txn_053', date: '2025-12-05', description: 'Eye Doctor Visit', amount: 150.00, category: CATEGORIES.HEALTH, type: TRANSACTION_TYPES.EXPENSE, notes: 'Annual eye exam' },
  { id: 'txn_054', date: '2025-12-01', description: 'Rent Payment', amount: 1800.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly rent' },

  // ── November 2025 ──
  { id: 'txn_055', date: '2025-11-28', description: 'Black Friday Shopping', amount: 445.00, category: CATEGORIES.SHOPPING, type: TRANSACTION_TYPES.EXPENSE, notes: 'Electronics deals' },
  { id: 'txn_056', date: '2025-11-25', description: 'Thanksgiving Groceries', amount: 178.90, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Turkey & sides' },
  { id: 'txn_057', date: '2025-11-22', description: 'Freelance — Dashboard UI', amount: 1800.00, category: CATEGORIES.FREELANCE, type: TRANSACTION_TYPES.INCOME, notes: 'Analytics dashboard' },
  { id: 'txn_058', date: '2025-11-20', description: 'Car Maintenance', amount: 320.00, category: CATEGORIES.TRANSPORT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Oil change + tire rotation' },
  { id: 'txn_059', date: '2025-11-15', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'November paycheck' },
  { id: 'txn_060', date: '2025-11-12', description: 'Phone Bill', amount: 85.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'T-Mobile plan' },
  { id: 'txn_061', date: '2025-11-10', description: 'Online Course — TypeScript', amount: 89.00, category: CATEGORIES.EDUCATION, type: TRANSACTION_TYPES.EXPENSE, notes: 'Pluralsight course' },
  { id: 'txn_062', date: '2025-11-05', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'November paycheck (early)' },
  { id: 'txn_063', date: '2025-11-01', description: 'Rent Payment', amount: 1800.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly rent' },

  // ── October 2025 ──
  { id: 'txn_064', date: '2025-10-28', description: 'Halloween Costumes', amount: 95.00, category: CATEGORIES.SHOPPING, type: TRANSACTION_TYPES.EXPENSE, notes: 'Party costumes' },
  { id: 'txn_065', date: '2025-10-25', description: 'Investment — MSFT', amount: 1500.00, category: CATEGORIES.INVESTMENTS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Microsoft shares' },
  { id: 'txn_066', date: '2025-10-22', description: 'Grocery Run', amount: 112.40, category: CATEGORIES.FOOD, type: TRANSACTION_TYPES.EXPENSE, notes: 'Weekly groceries' },
  { id: 'txn_067', date: '2025-10-18', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'October paycheck' },
  { id: 'txn_068', date: '2025-10-15', description: 'Gym Membership', amount: 49.99, category: CATEGORIES.HEALTH, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly membership' },
  { id: 'txn_069', date: '2025-10-10', description: 'Gas Station', amount: 55.20, category: CATEGORIES.TRANSPORT, type: TRANSACTION_TYPES.EXPENSE, notes: 'Fill up' },
  { id: 'txn_070', date: '2025-10-05', description: 'Rent Payment', amount: 1800.00, category: CATEGORIES.BILLS, type: TRANSACTION_TYPES.EXPENSE, notes: 'Monthly rent' },
  { id: 'txn_071', date: '2025-10-01', description: 'Monthly Salary', amount: 8500.00, category: CATEGORIES.SALARY, type: TRANSACTION_TYPES.INCOME, notes: 'October paycheck (early)' },
];

/**
 * Monthly balance trend data for the line chart
 */
export const balanceTrendData = [
  { month: 'Oct', balance: 98500, income: 17000, expenses: 5412 },
  { month: 'Nov', balance: 104800, income: 18800, expenses: 4918 },
  { month: 'Dec', balance: 109200, income: 11410, expenses: 3362 },
  { month: 'Jan', balance: 112500, income: 20690, expenses: 4977 },
  { month: 'Feb', balance: 117800, income: 10320, expenses: 4618 },
  { month: 'Mar', balance: 120500, income: 20200, expenses: 6245 },
  { month: 'Apr', balance: 124850, income: 8980, expenses: 2578 },
];

/**
 * Extended monthly data for insights
 */
export const monthlyData = [
  { month: 'Oct 2025', monthKey: '2025-10', income: 17000, expenses: 5412.59, savings: 11587.41 },
  { month: 'Nov 2025', monthKey: '2025-11', income: 18800, expenses: 4917.90, savings: 13882.10 },
  { month: 'Dec 2025', monthKey: '2025-12', income: 11410, expenses: 3361.30, savings: 8048.70 },
  { month: 'Jan 2026', monthKey: '2026-01', income: 20690, expenses: 4976.84, savings: 15713.16 },
  { month: 'Feb 2026', monthKey: '2026-02', income: 10320, expenses: 4617.59, savings: 5702.41 },
  { month: 'Mar 2026', monthKey: '2026-03', income: 20200, expenses: 6244.77, savings: 13955.23 },
  { month: 'Apr 2026', monthKey: '2026-04', income: 8980, expenses: 2577.64, savings: 6402.36 },
];
