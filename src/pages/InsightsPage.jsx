import InsightsPanel from '../components/insights/InsightsPanel';
import TopCategories from '../components/insights/TopCategories';
import MonthlyComparison from '../components/insights/MonthlyComparison';

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white">
          Insights
        </h1>
        <p className="text-sm text-charcoal-700/50 dark:text-slate-500 mt-1">
          Understand your spending patterns and financial health
        </p>
      </div>

      {/* Insight Cards */}
      <InsightsPanel />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCategories />
        <MonthlyComparison />
      </div>
    </div>
  );
}
