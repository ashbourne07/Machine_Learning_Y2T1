import { FeatureImportanceByModel } from '../types';

// ============================================================
// Mock Feature Importance Data
// These are UI demonstration values only.
// Replace with actual feature importance from trained models.
// ============================================================
export const mockFeatureImportance: FeatureImportanceByModel[] = [
  {
    model: 'Random Forest',
    features: [
      { feature: 'Credit History', importance: 0.28 },
      { feature: 'Applicant Income', importance: 0.19 },
      { feature: 'Loan Amount', importance: 0.15 },
      { feature: 'Coapplicant Income', importance: 0.10 },
      { feature: 'Education', importance: 0.08 },
      { feature: 'Property Area', importance: 0.07 },
      { feature: 'Loan Amount Term', importance: 0.05 },
      { feature: 'Dependents', importance: 0.03 },
      { feature: 'Self Employment', importance: 0.03 },
      { feature: 'Married', importance: 0.01 },
      { feature: 'Gender', importance: 0.01 },
    ],
  },
  {
    model: 'XGBoost',
    features: [
      { feature: 'Credit History', importance: 0.31 },
      { feature: 'Applicant Income', importance: 0.21 },
      { feature: 'Loan Amount', importance: 0.14 },
      { feature: 'Education', importance: 0.09 },
      { feature: 'Property Area', importance: 0.08 },
      { feature: 'Coapplicant Income', importance: 0.06 },
      { feature: 'Loan Amount Term', importance: 0.04 },
      { feature: 'Married', importance: 0.03 },
      { feature: 'Dependents', importance: 0.02 },
      { feature: 'Self Employment', importance: 0.01 },
      { feature: 'Gender', importance: 0.01 },
    ],
  },
  {
    model: 'LightGBM',
    features: [
      { feature: 'Credit History', importance: 0.33 },
      { feature: 'Applicant Income', importance: 0.22 },
      { feature: 'Loan Amount', importance: 0.13 },
      { feature: 'Property Area', importance: 0.09 },
      { feature: 'Education', importance: 0.07 },
      { feature: 'Coapplicant Income', importance: 0.05 },
      { feature: 'Loan Amount Term', importance: 0.04 },
      { feature: 'Married', importance: 0.03 },
      { feature: 'Dependents', importance: 0.02 },
      { feature: 'Self Employment', importance: 0.01 },
      { feature: 'Gender', importance: 0.01 },
    ],
  },
];
