import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrend from '../components/dashboard/BalanceTrend';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { useApp } from '../context/AppContext';

export default function DashboardPage() {
  const { state } = useApp();

  if (state.isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <BalanceTrend />
        </div>
        <div className="lg:col-span-2">
          <SpendingBreakdown />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse-soft">
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-cream-100 dark:bg-navy-700 rounded-2xl" />
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 h-[380px] bg-cream-100 dark:bg-navy-700 rounded-2xl" />
        <div className="lg:col-span-2 h-[380px] bg-cream-100 dark:bg-navy-700 rounded-2xl" />
      </div>

      {/* Transactions Skeleton */}
      <div className="h-[300px] bg-cream-100 dark:bg-navy-700 rounded-2xl" />
    </div>
  );
}
