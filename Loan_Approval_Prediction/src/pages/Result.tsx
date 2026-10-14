import { useLocation, useNavigate } from 'react-router-dom';
import PredictionResultComponent from '../components/prediction/PredictionResult';
import { LoanApplication, PredictionResponse } from '../types';
import { FileText } from 'lucide-react';

interface ResultState {
  application: LoanApplication;
  result: PredictionResponse;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState | null;

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-4 rounded-full bg-slate-100 p-4">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">No Prediction Result</h2>
        <p className="mt-1 text-sm text-slate-500">
          Submit a loan application to see the prediction result.
        </p>
        <button
          onClick={() => navigate('/prediction')}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Go to Prediction Form
        </button>
      </div>
    );
  }

  return <PredictionResultComponent application={state.application} result={state.result} />;
}
