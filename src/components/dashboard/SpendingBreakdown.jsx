import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { useInsights } from '../../hooks/useInsights';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white dark:bg-navy-700 border border-cream-200 dark:border-navy-600 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mb-1">{data.category}</p>
      <p className="text-sm font-bold text-charcoal-900 dark:text-white">{formatCurrency(data.amount)}</p>
      <p className="text-xs text-charcoal-700/50 dark:text-slate-400">{data.percentage.toFixed(1)}%</p>
    </div>
  );
}

export default function SpendingBreakdown() {
  const { state } = useApp();
  const { categoryBreakdown } = useInsights(state.transactions);
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const top5 = categoryBreakdown.slice(0, 5);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
      <div className="mb-4">
        <h3 className="text-base font-bold text-charcoal-900 dark:text-white">
          Asset Allocation
        </h3>
        <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mt-0.5">
          Current portfolio mix
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex flex-col items-center">
        <div className="w-[200px] h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={top5}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="amount"
                stroke="none"
              >
                {top5.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full mt-4 space-y-2">
          {top5.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-charcoal-700 dark:text-slate-400 truncate">
                  {item.category}
                </span>
              </div>
              <span className="text-sm font-semibold text-charcoal-900 dark:text-white ml-2">
                {item.percentage.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
