import { LoanApplication, PredictionResponse, ModelMetrics, FeatureImportanceByModel } from '../types';
import { API_ENDPOINTS, USE_MOCK_DATA } from './api';
import { mockModelMetrics } from '../data/mockPredictions';
import { mockFeatureImportance } from '../data/mockFeatures';

// ============================================================
// Prediction Service
// ============================================================
// This service abstracts all ML prediction API calls.
// Currently uses mock data for frontend demonstration.
//
// To connect to your Python backend:
// 1. Set VITE_API_URL in your .env file
// 2. The service will automatically use real API calls
// ============================================================

/**
 * Generate a mock prediction response based on application data.
 * This simulates a backend ML prediction without implementing any ML logic.
 */
function generateMockPrediction(application: LoanApplication): PredictionResponse {
  // Use credit history and income as rough heuristics for mock data variety
  // This is NOT ML logic — just demo data generation
  const isLikelyApproved = application.Credit_History === 1 && application.ApplicantIncome > 20000;
  const models: Array<'Random Forest' | 'XGBoost' | 'LightGBM'> = ['Random Forest', 'XGBoost', 'LightGBM'];
  const selectedModel = models[Math.floor(Math.random() * models.length)];

  return {
    prediction: isLikelyApproved ? 'Approved' : 'Rejected',
    confidence: isLikelyApproved
      ? 0.75 + Math.random() * 0.2
      : 0.65 + Math.random() * 0.25,
    model: selectedModel,
    feature_importance: [
      { feature: 'Credit History', importance: 0.31 },
      { feature: 'Applicant Income', importance: 0.22 },
      { feature: 'Loan Amount', importance: 0.14 },
      { feature: 'Education', importance: 0.09 },
      { feature: 'Property Area', importance: 0.08 },
      { feature: 'Coapplicant Income', importance: 0.06 },
      { feature: 'Loan Amount Term', importance: 0.04 },
      { feature: 'Married', importance: 0.03 },
      { feature: 'Dependents', importance: 0.02 },
      { feature: 'Self Employment', importance: 0.01 },
    ],
  };
}

/**
 * Submit a loan application for prediction.
 *
 * When VITE_API_URL is set, sends a POST request to the ML backend.
 * Otherwise, returns mock prediction data.
 */
export async function predictLoan(application: LoanApplication): Promise<PredictionResponse> {
  if (USE_MOCK_DATA) {
    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));
    return generateMockPrediction(application);
  }

  const response = await fetch(API_ENDPOINTS.predict, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(application),
  });

  if (!response.ok) {
    throw new Error(`Prediction failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch model performance metrics.
 */
export async function getModelMetrics(): Promise<ModelMetrics[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockModelMetrics;
  }

  const response = await fetch(API_ENDPOINTS.modelMetrics);
  if (!response.ok) {
    throw new Error(`Failed to fetch model metrics: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch feature importance data for all models.
 */
export async function getFeatureImportance(): Promise<FeatureImportanceByModel[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockFeatureImportance;
  }

  const response = await fetch(API_ENDPOINTS.featureImportance);
  if (!response.ok) {
    throw new Error(`Failed to fetch feature importance: ${response.statusText}`);
  }
  return response.json();
}
