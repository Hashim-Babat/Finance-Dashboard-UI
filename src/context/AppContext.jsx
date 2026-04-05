import { createContext, useContext, useReducer, useEffect } from 'react';
import { ROLES, DATE_RANGES, SORT_OPTIONS } from '../utils/constants';
import { fetchTransactions } from '../services/mockApi';

// ── Initial State ──
const initialFilters = {
  search: '',
  category: 'all',
  type: 'all',
  dateRange: DATE_RANGES.ALL,
  sortBy: SORT_OPTIONS.DATE,
  sortOrder: 'desc',
};

const initialState = {
  transactions: [],
  filters: initialFilters,
  role: localStorage.getItem('coinpath_role') || ROLES.ADMIN,
  isLoading: true,
  error: null,
  sidebarOpen: false,
};

// ── Action Types ──
const ACTIONS = {
  SET_TRANSACTIONS: 'SET_TRANSACTIONS',
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_ROLE: 'SET_ROLE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR: 'SET_SIDEBAR',
};

// ── Reducer ──
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TRANSACTIONS:
      return { ...state, transactions: action.payload, isLoading: false, error: null };
    case ACTIONS.ADD_TRANSACTION:
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case ACTIONS.UPDATE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload.data } : t
        ),
      };
    case ACTIONS.DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case ACTIONS.SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: initialFilters };
    case ACTIONS.SET_ROLE:
      localStorage.setItem('coinpath_role', action.payload);
      return { ...state, role: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case ACTIONS.SET_SIDEBAR:
      return { ...state, sidebarOpen: action.payload };
    default:
      return state;
  }
}

// ── Context ──
const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load transactions on mount
  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const data = await fetchTransactions();
      dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: data });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load transactions' });
    }
  }

  const actions = {
    setTransactions: (txns) => dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: txns }),
    addTransaction: (txn) => dispatch({ type: ACTIONS.ADD_TRANSACTION, payload: txn }),
    updateTransaction: (id, data) => dispatch({ type: ACTIONS.UPDATE_TRANSACTION, payload: { id, data } }),
    deleteTransaction: (id) => dispatch({ type: ACTIONS.DELETE_TRANSACTION, payload: id }),
    setFilters: (filters) => dispatch({ type: ACTIONS.SET_FILTERS, payload: filters }),
    resetFilters: () => dispatch({ type: ACTIONS.RESET_FILTERS }),
    setRole: (role) => dispatch({ type: ACTIONS.SET_ROLE, payload: role }),
    setLoading: (val) => dispatch({ type: ACTIONS.SET_LOADING, payload: val }),
    toggleSidebar: () => dispatch({ type: ACTIONS.TOGGLE_SIDEBAR }),
    setSidebar: (val) => dispatch({ type: ACTIONS.SET_SIDEBAR, payload: val }),
    refreshTransactions: loadTransactions,
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export { ACTIONS };
