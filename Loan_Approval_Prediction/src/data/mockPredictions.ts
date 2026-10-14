import { ModelMetrics, DashboardStats, PredictionRecord } from '../types';

// ============================================================
// Mock Model Performance Metrics
// These are UI demonstration values only.
// Replace with actual trained model metrics from the backend.
// ============================================================
export const mockModelMetrics: ModelMetrics[] = [
  {
    model: 'Random Forest',
    accuracy: 0.82,
    precision: 0.80,
    recall: 0.88,
    f1Score: 0.84,
    rocAuc: 0.81,
  },
  {
    model: 'XGBoost',
    accuracy: 0.84,
    precision: 0.83,
    recall: 0.89,
    f1Score: 0.86,
    rocAuc: 0.83,
  },
  {
    model: 'LightGBM',
    accuracy: 0.85,
    precision: 0.84,
    recall: 0.90,
    f1Score: 0.87,
    rocAuc: 0.84,
  },
];

// ============================================================
// Mock Dashboard Statistics
// ============================================================
export const mockDashboardStats: DashboardStats = {
  totalApplications: 1248,
  approved: 846,
  rejected: 402,
  bestModel: 'LightGBM',
};

// ============================================================
// Mock Recent Predictions
// ============================================================
export const mockRecentPredictions: PredictionRecord[] = [
  {
    id: 'LP-2024-001',
    date: '2024-03-15',
    application: {
      Gender: 'Male',
      Married: 'Yes',
      Dependents: '1',
      Education: 'Graduate',
      Self_Employed: 'No',
      ApplicantIncome: 55000,
      CoapplicantIncome: 12000,
      LoanAmount: 200,
      Loan_Amount_Term: 360,
      Credit_History: 1,
      Property_Area: 'Urban',
    },
    result: {
      prediction: 'Approved',
      confidence: 0.912,
      model: 'LightGBM',
      feature_importance: [],
    },
  },
  {
    id: 'LP-2024-002',
    date: '2024-03-14',
    application: {
      Gender: 'Female',
      Married: 'No',
      Dependents: '0',
      Education: 'Graduate',
      Self_Employed: 'No',
      ApplicantIncome: 38000,
      CoapplicantIncome: 0,
      LoanAmount: 150,
      Loan_Amount_Term: 360,
      Credit_History: 1,
      Property_Area: 'Semiurban',
    },
    result: {
      prediction: 'Approved',
      confidence: 0.847,
      model: 'XGBoost',
      feature_importance: [],
    },
  },
  {
    id: 'LP-2024-003',
    date: '2024-03-14',
    application: {
      Gender: 'Male',
      Married: 'Yes',
      Dependents: '2',
      Education: 'Not Graduate',
      Self_Employed: 'Yes',
      ApplicantIncome: 22000,
      CoapplicantIncome: 5000,
      LoanAmount: 180,
      Loan_Amount_Term: 360,
      Credit_History: 0,
      Property_Area: 'Rural',
    },
    result: {
      prediction: 'Rejected',
      confidence: 0.783,
      model: 'LightGBM',
      feature_importance: [],
    },
  },
  {
    id: 'LP-2024-004',
    date: '2024-03-13',
    application: {
      Gender: 'Male',
      Married: 'Yes',
      Dependents: '0',
      Education: 'Graduate',
      Self_Employed: 'No',
      ApplicantIncome: 72000,
      CoapplicantIncome: 25000,
      LoanAmount: 350,
      Loan_Amount_Term: 180,
      Credit_History: 1,
      Property_Area: 'Urban',
    },
    result: {
      prediction: 'Approved',
      confidence: 0.934,
      model: 'Random Forest',
      feature_importance: [],
    },
  },
  {
    id: 'LP-2024-005',
    date: '2024-03-13',
    application: {
      Gender: 'Female',
      Married: 'No',
      Dependents: '0',
      Education: 'Not Graduate',
      Self_Employed: 'No',
      ApplicantIncome: 18000,
      CoapplicantIncome: 0,
      LoanAmount: 100,
      Loan_Amount_Term: 360,
      Credit_History: 0,
      Property_Area: 'Rural',
    },
    result: {
      prediction: 'Rejected',
      confidence: 0.891,
      model: 'XGBoost',
      feature_importance: [],
    },
  },
  {
    id: 'LP-2024-006',
    date: '2024-03-12',
    application: {
      Gender: 'Male',
      Married: 'Yes',
      Dependents: '3+',
      Education: 'Graduate',
      Self_Employed: 'Yes',
      ApplicantIncome: 95000,
      CoapplicantIncome: 30000,
      LoanAmount: 500,
      Loan_Amount_Term: 360,
      Credit_History: 1,
      Property_Area: 'Semiurban',
    },
    result: {
      prediction: 'Approved',
      confidence: 0.876,
      model: 'LightGBM',
      feature_importance: [],
    },
  },
  {
    id: 'LP-2024-007',
    date: '2024-03-12',
    application: {
      Gender: 'Female',
      Married: 'Yes',
      Dependents: '1',
      Education: 'Graduate',
      Self_Employed: 'No',
      ApplicantIncome: 42000,
      CoapplicantIncome: 8000,
      LoanAmount: 120,
      Loan_Amount_Term: 360,
      Credit_History: 1,
      Property_Area: 'Urban',
    },
    result: {
      prediction: 'Approved',
      confidence: 0.905,
      model: 'Random Forest',
      feature_importance: [],
    },
  },
  {
    id: 'LP-2024-008',
    date: '2024-03-11',
    application: {
      Gender: 'Male',
      Married: 'No',
      Dependents: '0',
      Education: 'Not Graduate',
      Self_Employed: 'Yes',
      ApplicantIncome: 15000,
      CoapplicantIncome: 0,
      LoanAmount: 80,
      Loan_Amount_Term: 180,
      Credit_History: 0,
      Property_Area: 'Rural',
    },
    result: {
      prediction: 'Rejected',
      confidence: 0.923,
      model: 'LightGBM',
      feature_importance: [],
    },
  },
];
