import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, XCircle, Trophy, PieChart } from 'lucide-react';
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import StatCard from '../components/dashboard/StatCard';
import ModelPerformanceChart from '../components/dashboard/ModelPerformanceChart';
import RecentPredictions from '../components/dashboard/RecentPredictions';
import { mockDashboardStats, mockModelMetrics } from '../data/mockPredictions';
import { usePredictionHistory } from '../context/PredictionHistoryContext';

const PIE_COLORS = ['#10b981', '#ef4444'];

export default function Dashboard() {
  const navigate = useNavigate();
  const { history } = usePredictionHistory();

  const approvedCount = history.filter((h) => h.result.prediction === 'Approved').length;
  const rejectedCount = history.filter((h) => h.result.prediction === 'Rejected').length;

  const stats = {
    ...mockDashboardStats,
    totalApplications: history.length || mockDashboardStats.totalApplications,
    approved: history.length ? approvedCount : mockDashboardStats.approved,
    rejected: history.length ? rejectedCount : mockDashboardStats.rejected,
  };

  const pieData = [
    { name: 'Approved', value: stats.approved },
    { name: 'Rejected', value: stats.rejected },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Loan Approval Prediction</h1>
          <p className="mt-1 text-sm text-slate-500">
            Ensemble Learning Based Decision Support System
          </p>
        </div>
        <button
          onClick={() => navigate('/prediction')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <FileText className="h-4 w-4" />
          Start New Prediction
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={stats.totalApplications.toLocaleString('en-IN')}
          icon={FileText}
          description="Demo data"
          variant="default"
        />
        <StatCard
          title="Approved"
          value={stats.approved.toLocaleString('en-IN')}
          icon={CheckCircle2}
          description="Applications approved"
          variant="success"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected.toLocaleString('en-IN')}
          icon={XCircle}
          description="Applications rejected"
          variant="danger"
        />
        <StatCard
          title="Best Model"
          value={stats.bestModel}
          icon={Trophy}
          description="Highest accuracy"
          variant="info"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ModelPerformanceChart metrics={mockModelMetrics} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-2">
            <h3 className="text-base font-semibold text-slate-900">Prediction Distribution</h3>
            <p className="text-sm text-slate-500">Approval vs Rejection ratio</p>
          </div>
          <div className="flex h-[260px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-600">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm text-slate-600">Rejected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Predictions */}
      <RecentPredictions predictions={history} />
    </div>
  );
}
