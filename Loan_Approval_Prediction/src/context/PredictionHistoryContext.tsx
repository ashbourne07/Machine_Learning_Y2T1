import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { PredictionRecord } from '../types';
import { mockRecentPredictions } from '../data/mockPredictions';

const STORAGE_KEY = 'loan-predict-history';

interface PredictionHistoryContextType {
  history: PredictionRecord[];
  addPrediction: (record: PredictionRecord) => void;
  clearHistory: () => void;
}

const PredictionHistoryContext = createContext<PredictionHistoryContextType | undefined>(undefined);

function loadHistory(): PredictionRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PredictionRecord[];
      if (parsed.length > 0) return parsed;
    }
  } catch {
    // Fall through to defaults
  }
  // Pre-populate with mock data for demonstration
  return mockRecentPredictions;
}

export function PredictionHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<PredictionRecord[]>(loadHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addPrediction = useCallback((record: PredictionRecord) => {
    setHistory((prev) => [record, ...prev]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <PredictionHistoryContext.Provider value={{ history, addPrediction, clearHistory }}>
      {children}
    </PredictionHistoryContext.Provider>
  );
}

export function usePredictionHistory() {
  const context = useContext(PredictionHistoryContext);
  if (!context) {
    throw new Error('usePredictionHistory must be used within a PredictionHistoryProvider');
  }
  return context;
}
