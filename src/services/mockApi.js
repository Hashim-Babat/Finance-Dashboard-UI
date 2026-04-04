import { mockTransactions } from '../data/mockData';

const SIMULATED_DELAY = 300;

/**
 * Simulate network delay
 */
function delay(ms = SIMULATED_DELAY) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch all transactions
 */
export async function fetchTransactions() {
  await delay();
  const stored = localStorage.getItem('aurum_transactions');
  if (stored) {
    return JSON.parse(stored);
  }
  return [...mockTransactions];
}

/**
 * Add a new transaction
 */
export async function addTransaction(transaction) {
  await delay(200);
  const transactions = await fetchTransactions();
  const newTransaction = {
    ...transaction,
    id: 'txn_' + Date.now().toString(36),
  };
  const updated = [newTransaction, ...transactions];
  localStorage.setItem('aurum_transactions', JSON.stringify(updated));
  return updated;
}

/**
 * Update an existing transaction
 */
export async function updateTransaction(id, data) {
  await delay(200);
  const transactions = await fetchTransactions();
  const updated = transactions.map(t =>
    t.id === id ? { ...t, ...data } : t
  );
  localStorage.setItem('aurum_transactions', JSON.stringify(updated));
  return updated;
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(id) {
  await delay(200);
  const transactions = await fetchTransactions();
  const updated = transactions.filter(t => t.id !== id);
  localStorage.setItem('aurum_transactions', JSON.stringify(updated));
  return updated;
}

/**
 * Reset transactions to default mock data
 */
export async function resetTransactions() {
  await delay(100);
  localStorage.removeItem('aurum_transactions');
  return [...mockTransactions];
}
