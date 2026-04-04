import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';
import { balanceTrendData } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import { useTheme } from '../../context/ThemeContext';

const timeRanges = ['6M', '1Y', 'All'];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white dark:bg-navy-700 border border-cream-200 dark:border-navy-600 rounded-xl px-4 py-3 shadow-lg">
      <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-bold text-charcoal-900 dark:text-white">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export default function BalanceTrend() {
  const [activeRange, setActiveRange] = useState('6M');
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1e2d47' : '#ebe3d7';
  const textColor = isDark ? '#94a3b8' : '#8b8b8b';
  const strokeColor = isDark ? '#14b8a6' : '#0d9488';
  const gradientStart = isDark ? 'rgba(20, 184, 166, 0.3)' : 'rgba(13, 148, 136, 0.15)';
  const gradientEnd = isDark ? 'rgba(20, 184, 166, 0.0)' : 'rgba(13, 148, 136, 0.0)';

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-bold text-charcoal-900 dark:text-white">
            Portfolio Performance
          </h3>
          <p className="text-xs text-charcoal-700/50 dark:text-slate-500 mt-0.5">
            6-month overview · Updated just now
          </p>
        </div>

        {/* Range Toggles */}
        <div className="flex items-center bg-cream-100 dark:bg-navy-600 rounded-lg p-0.5">
          {timeRanges.map(range => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`
                px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer
                ${activeRange === range
                  ? 'bg-white dark:bg-navy-500 text-charcoal-900 dark:text-white shadow-sm'
                  : 'text-charcoal-700/50 dark:text-slate-500 hover:text-charcoal-800 dark:hover:text-slate-300'
                }
              `}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] mt-4 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceTrendData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientStart} />
                <stop offset="100%" stopColor={gradientEnd} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: textColor }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: textColor }}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke={strokeColor}
              strokeWidth={2.5}
              fill="url(#balanceGradient)"
              dot={{ r: 4, fill: strokeColor, strokeWidth: 2, stroke: isDark ? '#0f1724' : '#fff' }}
              activeDot={{ r: 6, fill: strokeColor, strokeWidth: 3, stroke: isDark ? '#0f1724' : '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
