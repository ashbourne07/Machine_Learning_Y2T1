import { useNavigate } from 'react-router-dom';
import { LoanApplication, PredictionResponse, InfluenceLevel } from '../../types';
import { formatCurrency, formatPercent } from '../../lib/utils';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  BarChart3,
  Plus,
  Download,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface PredictionResultProps {
  application: LoanApplication;
  result: PredictionResponse;
}

function getInfluenceLevel(importance: number): InfluenceLevel {
  if (importance >= 0.15) return 'High';
  if (importance >= 0.05) return 'Medium';
  return 'Low';
}

const influenceColors: Record<InfluenceLevel, string> = {
  High: 'bg-blue-100 text-blue-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
};

export default function PredictionResult({ application, result }: PredictionResultProps) {
  const navigate = useNavigate();
  const isApproved = result.prediction === 'Approved';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Result Header */}
      <div
        className={cn(
          'rounded-xl border-2 p-8 text-center',
          isApproved
            ? 'border-emerald-200 bg-emerald-50/50'
            : 'border-red-200 bg-red-50/50'
        )}
      >
        <div className="mb-3 flex justify-center">
          {isApproved ? (
            <CheckCircle2 className="h-16 w-16 text-emerald-500" />
          ) : (
            <XCircle className="h-16 w-16 text-red-500" />
          )}
        </div>
        <h2
          className={cn(
            'text-2xl font-bold',
            isApproved ? 'text-emerald-800' : 'text-red-800'
          )}
        >
          Loan {result.prediction}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {isApproved
            ? 'The application meets the predicted approval criteria.'
            : 'The application does not meet the predicted approval criteria at this time.'}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Prediction</p>
            <p
              className={cn(
                'mt-1 text-lg font-bold',
                isApproved ? 'text-emerald-700' : 'text-red-700'
              )}
            >
              {result.prediction}
            </p>
          </div>
          <div className="hidden h-12 w-px bg-slate-200 sm:block" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Confidence</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {formatPercent(result.confidence)}
            </p>
          </div>
          <div className="hidden h-12 w-px bg-slate-200 sm:block" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Model Used</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{result.model}</p>
          </div>
        </div>
      </div>

      {/* Application Summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-slate-900">Application Summary</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <SummaryItem label="Applicant Income" value={formatCurrency(application.ApplicantIncome)} />
          <SummaryItem label="Co-applicant Income" value={formatCurrency(application.CoapplicantIncome)} />
          <SummaryItem label="Loan Amount" value={formatCurrency(application.LoanAmount * 1000)} />
          <SummaryItem label="Loan Term" value={`${application.Loan_Amount_Term} days`} />
          <SummaryItem
            label="Credit History"
            value={application.Credit_History === 1 ? 'Good' : 'Poor'}
          />
          <SummaryItem label="Property Area" value={application.Property_Area} />
          <SummaryItem label="Education" value={application.Education} />
          <SummaryItem label="Self Employed" value={application.Self_Employed} />
        </div>
      </div>

      {/* Prediction Explanation */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-base font-semibold text-slate-900">Prediction Explanation</h3>
        <p className="mb-4 text-xs text-slate-500">
          Top factors influencing this prediction (demonstration data)
        </p>
        <div className="space-y-2.5">
          {result.feature_importance.slice(0, 6).map((fi) => {
            const level = getInfluenceLevel(fi.importance);
            return (
              <div
                key={fi.feature}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5"
              >
                <span className="text-sm font-medium text-slate-700">{fi.feature}</span>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    influenceColors[level]
                  )}
                >
                  {level} influence
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
        <p className="text-xs text-amber-800">
          This system is a machine-learning based decision-support prototype and should not be
          treated as a final financial lending decision.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => navigate('/prediction')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          New Prediction
        </button>
        <button
          onClick={() => navigate('/models')}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <BarChart3 className="h-4 w-4" />
          View Model Analysis
        </button>
        <button
          onClick={() => {
            // In a real app, this would save/export the result
            navigate('/history');
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Save Result
        </button>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2.5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900">{value}</span>
    </div>
  );
}
