import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { useInsights } from '../../hooks/useInsights';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white dark:bg-navy-700 border border-cream-200 dark:border-navy-600 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs font-semibold text-charcoal-900 dark:text-white mb-2">{label}</p>
      {payload.map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-0.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-charcoal-700/60 dark:text-slate-400">{item.name}:</span>
          <span className="font-semibold text-charcoal-900 dark:text-white">{formatCurrency(item.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function MonthlyComparison() {
  const { state } = useApp();
  const { monthlyComparison } = useInsights(state.transactions);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = monthlyComparison.map(m => ({
    ...m,
    name: m.month,
  }));

  return (
    <Card>
      <h3 className="text-base font-bold text-charcoal-900 dark:text-white mb-1">
        Monthly Comparison
      </h3>
      <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mb-6">
        Income vs Expenses over time
      </p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e2d47' : '#ebe3d7'} vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#8b8b8b' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#8b8b8b' }}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            />
            <Bar
              dataKey="income"
              name="Income"
              fill={isDark ? '#34d399' : '#10b981'}
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill={isDark ? '#fb7185' : '#f43f5e'}
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
