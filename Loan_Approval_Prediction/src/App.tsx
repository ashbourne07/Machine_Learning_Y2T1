import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import Result from './pages/Result';
import ModelComparison from './pages/ModelComparison';
import FeatureImportance from './pages/FeatureImportance';
import History from './pages/History';
import About from './pages/About';
import { PredictionHistoryProvider } from './context/PredictionHistoryContext';

export default function App() {
  return (
    <PredictionHistoryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/result" element={<Result />} />
            <Route path="/models" element={<ModelComparison />} />
            <Route path="/features" element={<FeatureImportance />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PredictionHistoryProvider>
  );
}
