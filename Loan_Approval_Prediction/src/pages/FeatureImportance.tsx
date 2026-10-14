import { useState } from 'react';
import { ModelName } from '../types';
import { mockFeatureImportance } from '../data/mockFeatures';
import FeatureImportanceChart from '../components/features/FeatureImportanceChart';
import { Info, Lightbulb } from 'lucide-react';
import { cn } from '../lib/utils';

const models: ModelName[] = ['Random Forest', 'XGBoost', 'LightGBM'];

export default function FeatureImportance() {
  const [selectedModel, setSelectedModel] = useState<ModelName>('LightGBM');

  const currentData = mockFeatureImportance.find((m) => m.model === selectedModel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Feature Importance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Understand which applicant characteristics have the greatest influence on model predictions.
        </p>
      </div>

      {/* Info Card */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/50 p-5">
        <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
        <div>
          <p className="text-sm font-medium text-blue-900">About Feature Importance</p>
          <p className="mt-0.5 text-sm text-blue-700">
            Feature importance helps improve model interpretability by showing which variables
            contribute most to prediction outcomes. Higher importance indicates a stronger influence
            on the model's decision.
          </p>
        </div>
      </div>

      {/* Model Selector */}
      <div className="flex flex-wrap gap-2">
        {models.map((model) => (
          <button
            key={model}
            onClick={() => setSelectedModel(model)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              selectedModel === model
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            )}
          >
            {model}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900">
            {selectedModel} — Feature Importance
          </h3>
          <p className="text-sm text-slate-500">
            Relative importance of each feature in the model's predictions
          </p>
        </div>
        {currentData ? (
          <FeatureImportanceChart features={currentData.features} />
        ) : (
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-slate-400">No data available for this model.</p>
          </div>
        )}
      </div>

      {/* Features Table */}
      {currentData && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h3 className="text-base font-semibold text-slate-900">Feature Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3 font-medium text-slate-500">Rank</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Feature</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Importance</th>
                  <th className="px-5 py-3 font-medium text-slate-500">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {currentData.features.map((f, idx) => (
                  <tr key={f.feature} className="border-b border-slate-50 last:border-0">
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">#{idx + 1}</td>
                    <td className="px-5 py-3 font-medium text-slate-900">{f.feature}</td>
                    <td className="px-5 py-3 font-mono text-slate-700">
                      {(f.importance * 100).toFixed(1)}%
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all"
                            style={{ width: `${f.importance * 300}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Note */}
      <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
        <p className="text-xs text-slate-500">
          These feature importance values are demonstration data. Actual values will be computed
          from the trained ML models when the backend is connected.
        </p>
      </div>
    </div>
  );
}
