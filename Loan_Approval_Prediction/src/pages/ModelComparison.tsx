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
import { mockModelMetrics } from '../data/mockPredictions';
import { Trophy, TrendingUp, Info } from 'lucide-react';
import { cn } from '../lib/utils';

const METRIC_COLORS: Record<string, string> = {
  Accuracy: '#3b82f6',
  Precision: '#8b5cf6',
  Recall: '#10b981',
  'F1 Score': '#f59e0b',
  'ROC-AUC': '#ef4444',
};

export default function ModelComparison() {
  const chartData = mockModelMetrics.map((m) => ({
    model: m.model,
    Accuracy: +(m.accuracy * 100).toFixed(1),
    Precision: +(m.precision * 100).toFixed(1),
    Recall: +(m.recall * 100).toFixed(1),
    'F1 Score': +(m.f1Score * 100).toFixed(1),
    'ROC-AUC': +(m.rocAuc * 100).toFixed(1),
  }));

  // Find best model
  const bestModel = mockModelMetrics.reduce((best, curr) =>
    curr.accuracy > best.accuracy ? curr : best
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Model Comparison</h1>
        <p className="mt-1 text-sm text-slate-500">
          Performance comparison of ensemble learning algorithms (demonstration metrics).
        </p>
      </div>

      {/* Best Model Highlight */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2.5">
            <Trophy className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-800">Best Performing Model</p>
            <p className="text-xl font-bold text-blue-900">{bestModel.model}</p>
            <p className="text-xs text-blue-600">
              {(bestModel.accuracy * 100).toFixed(1)}% Accuracy · {(bestModel.f1Score * 100).toFixed(1)}% F1 Score
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="text-base font-semibold text-slate-900">Performance Metrics</h3>
          <p className="text-sm text-slate-500">Detailed comparison across all evaluation metrics</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Model</th>
                <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Accuracy</th>
                <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Precision</th>
                <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Recall</th>
                <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">F1 Score</th>
                <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">ROC-AUC</th>
              </tr>
            </thead>
            <tbody>
              {mockModelMetrics.map((m) => (
                <tr
                  key={m.model}
                  className={cn(
                    'border-b border-slate-50 last:border-0',
                    m.model === bestModel.model && 'bg-blue-50/30'
                  )}
                >
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{m.model}</span>
                      {m.model === bestModel.model && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                          Best
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-slate-700">
                    {(m.accuracy * 100).toFixed(1)}%
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-slate-700">
                    {(m.precision * 100).toFixed(1)}%
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-slate-700">
                    {(m.recall * 100).toFixed(1)}%
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-slate-700">
                    {(m.f1Score * 100).toFixed(1)}%
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-mono text-slate-700">
                    {(m.rocAuc * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-slate-400" />
          <h3 className="text-base font-semibold text-slate-900">Visual Comparison</h3>
        </div>
        <div className="h-[380px] w-full">
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
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} iconType="circle" iconSize={8} />
              {Object.entries(METRIC_COLORS).map(([key, color]) => (
                <Bar key={key} dataKey={key} fill={color} radius={[3, 3, 0, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
        <p className="text-xs text-slate-500">
          These metrics are demonstration values for UI preview purposes. Actual model performance
          metrics will be populated from the trained ML models when the backend is connected.
        </p>
      </div>
    </div>
  );
}
