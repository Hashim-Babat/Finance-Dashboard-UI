import { useState } from 'react';
import { ALL_CATEGORIES, EXPENSE_CATEGORIES, INCOME_CATEGORIES, TRANSACTION_TYPES } from '../../utils/constants';
import Button from '../common/Button';
import { Save, X } from 'lucide-react';

export default function TransactionForm({ transaction = null, onSubmit, onCancel }) {
  const isEditing = !!transaction;
  const [form, setForm] = useState({
    description: transaction?.description || '',
    amount: transaction?.amount?.toString() || '',
    category: transaction?.category || '',
    type: transaction?.type || TRANSACTION_TYPES.EXPENSE,
    date: transaction?.date || new Date().toISOString().split('T')[0],
    notes: transaction?.notes || '',
  });
  const [errors, setErrors] = useState({});

  const availableCategories = form.type === TRANSACTION_TYPES.INCOME
    ? INCOME_CATEGORIES
    : EXPENSE_CATEGORIES;

  function validate() {
    const newErrors = {};
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      amount: parseFloat(form.amount),
    });
  }

  function handleTypeChange(type) {
    setForm(prev => ({
      ...prev,
      type,
      category: '', // Reset category when type changes
    }));
  }

  const inputClass = `
    w-full px-4 py-2.5 rounded-xl text-sm
    bg-cream-50 dark:bg-navy-800
    border border-cream-200 dark:border-navy-600
    text-charcoal-800 dark:text-slate-300
    placeholder:text-charcoal-700/40 dark:placeholder:text-slate-500
    focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500
    transition-all duration-200
  `;

  const labelClass = 'block text-xs font-semibold text-charcoal-700 dark:text-slate-400 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type Toggle */}
      <div>
        <label className={labelClass}>Type</label>
        <div className="flex rounded-xl overflow-hidden border border-cream-200 dark:border-navy-600">
          <button
            type="button"
            onClick={() => handleTypeChange(TRANSACTION_TYPES.EXPENSE)}
            className={`
              flex-1 py-2.5 text-sm font-semibold transition-all cursor-pointer
              ${form.type === TRANSACTION_TYPES.EXPENSE
                ? 'bg-coral-500 text-white'
                : 'bg-cream-50 dark:bg-navy-800 text-charcoal-700 dark:text-slate-400 hover:bg-cream-100 dark:hover:bg-navy-700'
              }
            `}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange(TRANSACTION_TYPES.INCOME)}
            className={`
              flex-1 py-2.5 text-sm font-semibold transition-all cursor-pointer
              ${form.type === TRANSACTION_TYPES.INCOME
                ? 'bg-emerald-500 text-white'
                : 'bg-cream-50 dark:bg-navy-800 text-charcoal-700 dark:text-slate-400 hover:bg-cream-100 dark:hover:bg-navy-700'
              }
            `}
          >
            Income
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
          placeholder="e.g. Grocery Store"
          className={inputClass}
        />
        {errors.description && <p className="text-xs text-coral-500 mt-1">{errors.description}</p>}
      </div>

      {/* Amount + Date Row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Amount ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={(e) => setForm(prev => ({ ...prev, amount: e.target.value }))}
            placeholder="0.00"
            className={inputClass}
          />
          {errors.amount && <p className="text-xs text-coral-500 mt-1">{errors.amount}</p>}
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
            className={`${inputClass} cursor-pointer`}
          />
          {errors.date && <p className="text-xs text-coral-500 mt-1">{errors.date}</p>}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
          className={`${inputClass} cursor-pointer appearance-none`}
        >
          <option value="">Select a category</option>
          {availableCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-xs text-coral-500 mt-1">{errors.category}</p>}
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Add a note..."
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} icon={X}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" icon={Save}>
          {isEditing ? 'Update' : 'Add'} Transaction
        </Button>
      </div>
    </form>
  );
}
