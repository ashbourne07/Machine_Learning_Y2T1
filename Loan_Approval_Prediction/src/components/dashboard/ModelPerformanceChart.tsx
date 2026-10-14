import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ModelMetrics } from '../../types';

interface ModelPerformanceChartProps {
  metrics: ModelMetrics[];
}

const COLORS = {
  accuracy: '#3b82f6',
  precision: '#8b5cf6',
  recall: '#10b981',
  f1Score: '#f59e0b',
  rocAuc: '#ef4444',
};

export default function ModelPerformanceChart({ metrics }: ModelPerformanceChartProps) {
  const chartData = metrics.map((m) => ({
    model: m.model,
    Accuracy: +(m.accuracy * 100).toFixed(1),
    Precision: +(m.precision * 100).toFixed(1),
    Recall: +(m.recall * 100).toFixed(1),
    'F1 Score': +(m.f1Score * 100).toFixed(1),
    'ROC-AUC': +(m.rocAuc * 100).toFixed(1),
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">Model Performance</h3>
        <p className="text-sm text-slate-500">
          Comparison of ensemble learning algorithms (demo metrics)
        </p>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={2} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="model"
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis
              domain={[60, 100]}
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '13px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => [`${value}%`]}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
              iconType="circle"
              iconSize={8}
            />
            <Bar dataKey="Accuracy" fill={COLORS.accuracy} radius={[3, 3, 0, 0]} />
            <Bar dataKey="Precision" fill={COLORS.precision} radius={[3, 3, 0, 0]} />
            <Bar dataKey="Recall" fill={COLORS.recall} radius={[3, 3, 0, 0]} />
            <Bar dataKey="F1 Score" fill={COLORS.f1Score} radius={[3, 3, 0, 0]} />
            <Bar dataKey="ROC-AUC" fill={COLORS.rocAuc} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
