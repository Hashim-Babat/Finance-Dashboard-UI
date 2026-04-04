import { useState } from 'react';
import { Plus, Download, FileJson, FileSpreadsheet } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import { useApp } from '../context/AppContext';
import { useTransactions } from '../hooks/useTransactions';
import { addTransaction, updateTransaction } from '../services/mockApi';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';
import { ROLES } from '../utils/constants';

export default function TransactionsPage() {
  const { state, actions } = useApp();
  const { transactions, totalCount } = useTransactions();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const isAdmin = state.role === ROLES.ADMIN;

  async function handleAddTransaction(data) {
    const updated = await addTransaction(data);
    actions.setTransactions(updated);
    setShowForm(false);
  }

  async function handleEditTransaction(data) {
    const updated = await updateTransaction(editingTransaction.id, data);
    actions.setTransactions(updated);
    setEditingTransaction(null);
    setShowForm(false);
  }

  function handleEdit(txn) {
    setEditingTransaction(txn);
    setShowForm(true);
  }

  function handleExport(format) {
    if (format === 'csv') {
      exportToCSV(transactions);
    } else {
      exportToJSON(transactions);
    }
    setShowExportMenu(false);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-charcoal-700/50 dark:text-slate-500 mt-1">
            {totalCount} transaction{totalCount !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Export Button */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              Export
            </Button>
            {showExportMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowExportMenu(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 w-44 bg-white dark:bg-navy-700 border border-cream-200 dark:border-navy-600 rounded-xl shadow-lg overflow-hidden animate-scale-in">
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-charcoal-700 dark:text-slate-300 hover:bg-cream-50 dark:hover:bg-navy-600 transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet size={16} className="text-emerald-500" />
                    Export as CSV
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-charcoal-700 dark:text-slate-300 hover:bg-cream-50 dark:hover:bg-navy-600 transition-colors cursor-pointer"
                  >
                    <FileJson size={16} className="text-sky-500" />
                    Export as JSON
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Add Transaction (Admin only) */}
          {isAdmin && (
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => {
                setEditingTransaction(null);
                setShowForm(true);
              }}
            >
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <TransactionFilters />
      </Card>

      {/* Transaction List */}
      <Card padding={false} className="overflow-hidden">
        <div className="p-4 sm:p-6">
          <TransactionList onEdit={handleEdit} />
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTransaction(null);
        }}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
          onCancel={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
        />
      </Modal>
    </div>
  );
}
