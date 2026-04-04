import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../common/Card';
import { useInsights } from '../../hooks/useInsights';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';
import { CATEGORY_COLORS } from '../../utils/constants';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  return (
    <div className="bg-white dark:bg-navy-700 border border-cream-200 dark:border-navy-600 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mb-1">{data.category}</p>
      <p className="text-sm font-bold text-charcoal-900 dark:text-white">{formatCurrency(data.amount)}</p>
      <p className="text-xs text-charcoal-700/50 dark:text-slate-400">{data.percentage.toFixed(1)}% of total</p>
    </div>
  );
}

export default function TopCategories() {
  const { state } = useApp();
  const { categoryBreakdown } = useInsights(state.transactions);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const top5 = categoryBreakdown.slice(0, 6);

  return (
    <Card>
      <h3 className="text-base font-bold text-charcoal-900 dark:text-white mb-1">
        Top Spending Categories
      </h3>
      <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mb-6">
        Where your money goes
      </p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={top5}
            layout="vertical"
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e2d47' : '#ebe3d7'} horizontal={false} />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#8b8b8b' }}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#8b8b8b' }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} />
            <Bar
              dataKey="amount"
              radius={[0, 6, 6, 0]}
              barSize={24}
            >
              {top5.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
