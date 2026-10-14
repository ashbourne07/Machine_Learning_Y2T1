// ============================================================
// Core Types for Loan Approval Prediction System
// ============================================================

export interface LoanApplication {
  Gender: 'Male' | 'Female';
  Married: 'Yes' | 'No';
  Dependents: '0' | '1' | '2' | '3+';
  Education: 'Graduate' | 'Not Graduate';
  Self_Employed: 'Yes' | 'No';
  ApplicantIncome: number;
  CoapplicantIncome: number;
  LoanAmount: number;
  Loan_Amount_Term: number;
  Credit_History: 0 | 1;
  Property_Area: 'Urban' | 'Semiurban' | 'Rural';
}

export type PredictionOutcome = 'Approved' | 'Rejected';

export type ModelName = 'Random Forest' | 'XGBoost' | 'LightGBM';

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface PredictionResponse {
  prediction: PredictionOutcome;
  confidence: number;
  model: ModelName;
  feature_importance: FeatureImportance[];
}

export interface PredictionRecord {
  id: string;
  date: string;
  application: LoanApplication;
  result: PredictionResponse;
}

export interface ModelMetrics {
  model: ModelName;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
}

export interface FeatureImportanceByModel {
  model: ModelName;
  features: FeatureImportance[];
}

export interface DashboardStats {
  totalApplications: number;
  approved: number;
  rejected: number;
  bestModel: ModelName;
}

export type InfluenceLevel = 'High' | 'Medium' | 'Low';

export interface PredictionExplanation {
  feature: string;
  influence: InfluenceLevel;
}
