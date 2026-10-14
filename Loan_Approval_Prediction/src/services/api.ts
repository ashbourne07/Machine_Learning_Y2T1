// ============================================================
// API Configuration
// ============================================================
// The base URL for the ML prediction backend.
// Replace with your actual backend URL when connecting the ML models.
//
// Development: Uses mock data (no backend required)
// Production: Set VITE_API_URL in your .env file
//   Example: VITE_API_URL=http://localhost:5000
// ============================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  predict: `${API_BASE_URL}/api/predict`,
  modelMetrics: `${API_BASE_URL}/api/models/metrics`,
  featureImportance: `${API_BASE_URL}/api/models/features`,
} as const;

export const USE_MOCK_DATA = !import.meta.env.VITE_API_URL;

export default API_BASE_URL;
