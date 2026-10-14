import { useNavigate } from 'react-router-dom';
import { PredictionRecord } from '../../types';
import { formatCurrency, formatDate } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

interface RecentPredictionsProps {
  predictions: PredictionRecord[];
}

export default function RecentPredictions({ predictions }: RecentPredictionsProps) {
  const navigate = useNavigate();
  const display = predictions.slice(0, 6);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Recent Predictions</h3>
          <p className="text-sm text-slate-500">Latest loan application analyses</p>
        </div>
        <button
          onClick={() => navigate('/history')}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">ID</th>
              <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Income</th>
              <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Loan Amt</th>
              <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Credit</th>
              <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Prediction</th>
              <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Model</th>
              <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {display.map((record) => (
              <tr
                key={record.id}
                className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/50"
              >
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-slate-600">
                  {record.id}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                  {formatCurrency(record.application.ApplicantIncome)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                  {formatCurrency(record.application.LoanAmount * 1000)}
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span
                    className={
                      record.application.Credit_History === 1
                        ? 'text-emerald-600'
                        : 'text-red-500'
                    }
                  >
                    {record.application.Credit_History === 1 ? 'Good' : 'Poor'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      record.result.prediction === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {record.result.prediction}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-xs text-slate-500">
                  {record.result.model}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-xs text-slate-400">
                  {formatDate(record.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
