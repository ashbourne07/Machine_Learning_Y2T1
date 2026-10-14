import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoanForm from '../components/prediction/LoanForm';
import { LoanApplication, PredictionResponse } from '../types';
import { predictLoan } from '../services/predictionService';
import { usePredictionHistory } from '../context/PredictionHistoryContext';
import { generateApplicationId } from '../lib/utils';
import { AlertTriangle } from 'lucide-react';

export default function Prediction() {
  const navigate = useNavigate();
  const { addPrediction } = usePredictionHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(application: LoanApplication) {
    setIsLoading(true);
    setError(null);

    try {
      const result: PredictionResponse = await predictLoan(application);

      // Save to history
      const record = {
        id: generateApplicationId(),
        date: new Date().toISOString().split('T')[0],
        application,
        result,
      };
      addPrediction(record);

      // Navigate to result page with state
      navigate('/result', {
        state: { application, result },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Loan Approval Prediction</h1>
        <p className="mt-1 text-sm text-slate-500">
          Enter applicant information to generate a machine learning based prediction.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-800">Prediction Failed</p>
            <p className="text-xs text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <LoanForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
