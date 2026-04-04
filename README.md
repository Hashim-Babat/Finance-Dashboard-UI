# Aurum — Finance Dashboard

A premium, interactive finance dashboard built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**. Track income, expenses, and financial insights with a beautiful, responsive interface.

---

## 🖼️ Preview

| Light Mode | Dark Mode |
|---|---|
| ![Light](docs/light.png) | ![Dark](docs/dark.png) |

---

## ✨ Features

### 📊 Dashboard Overview
- **Summary Cards** — Total Balance, Monthly Revenue, Expenses, Net Profit with trend indicators
- **Portfolio Performance** — Interactive area chart with 6M/1Y/All time range toggles
- **Asset Allocation** — Donut chart showing spending breakdown by category
- **Recent Transactions** — Quick preview of the latest 5 transactions

### 💳 Transactions
- Full transaction list with **pagination** (10 per page)
- **Search** by description, category, or notes
- **Filter** by category, type (income/expense), and date range
- **Sort** by date, amount, or category (ascending/descending)
- **Add/Edit/Delete** transactions (Admin role only)
- **Export** to CSV or JSON

### 🔒 Role-Based Access Control (RBAC)
- Toggle between **Admin** and **Viewer** roles via sidebar
- **Admin**: Full CRUD operations on transactions
- **Viewer**: Read-only access, action buttons hidden, "View Only" badge displayed

### 📈 Insights
- **Highest Spending Category** — Identifies where most money goes
- **Best Income Month** — Month with highest earnings
- **Daily Average Spending** — Computed across tracked period
- **Income:Expense Ratio** — Financial health indicator
- **Spending Trend** — Increasing/Decreasing/Stable analysis
- **Savings Rate** — Percentage of income saved
- **Top Categories Bar Chart** — Horizontal bar chart of top spending categories
- **Monthly Comparison** — Grouped bar chart comparing income vs expenses

### 🎨 Theme
- **Dark/Light mode** with smooth transitions
- System preference detection on first visit
- Persisted to localStorage

### 💾 Data Persistence
- Transactions, role, and theme preferences saved to **localStorage**
- Data survives page reloads

### 🔌 Mock API
- All operations go through `mockApi.js` with simulated async delays (200-300ms)
- Loading states and error handling

### 📱 Responsive Design
- Desktop: Full sidebar + table layout
- Tablet: Adaptive grid layouts
- Mobile: Collapsible hamburger sidebar + card-based transaction list

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first CSS styling |
| Recharts | Data visualization charts |
| React Router 7 | Client-side routing |
| Lucide React | Icon library |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI primitives
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Modal.jsx
│   │   ├── SearchInput.jsx
│   │   └── ThemeToggle.jsx
│   ├── dashboard/        # Dashboard page components
│   │   ├── BalanceTrend.jsx
│   │   ├── RecentTransactions.jsx
│   │   ├── SpendingBreakdown.jsx
│   │   └── SummaryCards.jsx
│   ├── insights/         # Insights page components
│   │   ├── InsightCard.jsx
│   │   ├── InsightsPanel.jsx
│   │   ├── MonthlyComparison.jsx
│   │   └── TopCategories.jsx
│   ├── layout/           # Layout components
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   └── Sidebar.jsx
│   └── transactions/     # Transaction page components
│       ├── TransactionFilters.jsx
│       ├── TransactionForm.jsx
│       └── TransactionList.jsx
├── context/
│   ├── AppContext.jsx     # Global state (transactions, filters, role)
│   └── ThemeContext.jsx   # Theme state (dark/light)
├── data/
│   └── mockData.js        # 71 mock transactions + monthly data
├── hooks/
│   ├── useInsights.js     # Computed analytics
│   ├── useLocalStorage.js # localStorage sync
│   └── useTransactions.js # Filtered/sorted transactions + summaries
├── pages/
│   ├── DashboardPage.jsx
│   ├── InsightsPage.jsx
│   └── TransactionsPage.jsx
├── services/
│   └── mockApi.js         # Simulated API with async delays
├── utils/
│   ├── constants.js       # Categories, roles, colors, nav items
│   ├── exportUtils.js     # CSV/JSON export
│   └── formatters.js      # Currency, date, percentage formatters
├── App.jsx                # Root component with routing
├── index.css              # Tailwind directives + custom utilities
└── main.jsx               # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ recommended
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd finance-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧠 Architecture Decisions

### State Management
- **React Context + useReducer** was chosen over Redux for simplicity and zero additional bundle size
- Two separate contexts: `AppContext` (business logic) and `ThemeContext` (theme)
- Actions follow a Redux-like pattern with action types and a reducer function

### Component Architecture
- **Atomic design** influence: common components → feature components → pages
- Components are self-contained with co-located logic
- Custom hooks (`useTransactions`, `useInsights`) encapsulate business logic

### Styling Approach
- **Tailwind CSS v3** with `class` dark mode strategy
- Custom color palette defined in `tailwind.config.js` (cream, navy, teal, coral)
- All colors accessible through standard Tailwind utilities
- Custom animations defined via `@keyframes` + `animation` extension

### Data Flow
```
mockData.js → mockApi.js → AppContext → useTransactions/useInsights → Components
```

---

## 📝 License

This project is for demonstration purposes.
