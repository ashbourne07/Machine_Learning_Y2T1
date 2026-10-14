import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { FeatureImportance } from '../../types';

interface FeatureImportanceChartProps {
  features: FeatureImportance[];
}

const COLORS = [
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7',
  '#d946ef', '#ec4899', '#f43f5e', '#f97316',
  '#eab308', '#84cc16', '#22c55e',
];

export default function FeatureImportanceChart({ features }: FeatureImportanceChartProps) {
  const chartData = features
    .slice()
    .sort((a, b) => a.importance - b.importance)
    .map((f) => ({
      feature: f.feature,
      importance: +(f.importance * 100).toFixed(1),
    }));

  return (
    <div className="h-[440px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 'auto']}
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
            unit="%"
          />
          <YAxis
            type="category"
            dataKey="feature"
            width={130}
            tick={{ fontSize: 12, fill: '#334155' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '13px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [`${value}%`, 'Importance']}
          />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={24}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
