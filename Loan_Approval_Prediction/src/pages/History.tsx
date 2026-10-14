import { useState, useMemo } from 'react';
import { usePredictionHistory } from '../context/PredictionHistoryContext';
import { ModelName, PredictionOutcome } from '../types';
import { formatCurrency, formatDate, formatPercent } from '../lib/utils';
import { Search, Filter, History as HistoryIcon, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export default function History() {
  const { history, clearHistory } = usePredictionHistory();
  const [search, setSearch] = useState('');
  const [filterPrediction, setFilterPrediction] = useState<PredictionOutcome | 'All'>('All');
  const [filterModel, setFilterModel] = useState<ModelName | 'All'>('All');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let items = [...history];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.result.model.toLowerCase().includes(q) ||
          r.result.prediction.toLowerCase().includes(q)
      );
    }

    // Filter prediction
    if (filterPrediction !== 'All') {
      items = items.filter((r) => r.result.prediction === filterPrediction);
    }

    // Filter model
    if (filterModel !== 'All') {
      items = items.filter((r) => r.result.model === filterModel);
    }

    // Sort by date
    items.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDir === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return items;
  }, [history, search, filterPrediction, filterModel, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prediction History</h1>
          <p className="mt-1 text-sm text-slate-500">
            {filtered.length} prediction{filtered.length !== 1 ? 's' : ''} recorded
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Clear all prediction history? This cannot be undone.')) {
                clearHistory();
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear History
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, model, or prediction..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Filter Prediction */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={filterPrediction}
            onChange={(e) => {
              setFilterPrediction(e.target.value as PredictionOutcome | 'All');
              setCurrentPage(1);
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm"
          >
            <option value="All">All Predictions</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Filter Model */}
        <select
          value={filterModel}
          onChange={(e) => {
            setFilterModel(e.target.value as ModelName | 'All');
            setCurrentPage(1);
          }}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm"
        >
          <option value="All">All Models</option>
          <option value="Random Forest">Random Forest</option>
          <option value="XGBoost">XGBoost</option>
          <option value="LightGBM">LightGBM</option>
        </select>

        {/* Sort */}
        <button
          onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          Date {sortDir === 'desc' ? '↓' : '↑'}
        </button>
      </div>

      {/* Table */}
      {paginated.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">ID</th>
                  <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Date</th>
                  <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Income</th>
                  <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Loan Amt</th>
                  <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Credit</th>
                  <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Model</th>
                  <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Prediction</th>
                  <th className="whitespace-nowrap px-5 py-3 font-medium text-slate-500">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/50"
                  >
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-slate-600">
                      {record.id}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-slate-500">
                      {formatDate(record.date)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                      {formatCurrency(record.application.ApplicantIncome)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                      {formatCurrency(record.application.LoanAmount * 1000)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3">
                      <span
                        className={
                          record.application.Credit_History === 1
                            ? 'text-emerald-600'
                            : 'text-red-500'
                        }
                      >
                        {record.application.Credit_History === 1 ? 'Good' : 'Poor'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-xs text-slate-500">
                      {record.result.model}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          record.result.prediction === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        )}
                      >
                        {record.result.prediction}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-slate-600">
                      {formatPercent(record.result.confidence)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
              <p className="text-xs text-slate-500">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16">
          <div className="mb-4 rounded-full bg-slate-100 p-4">
            <HistoryIcon className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No Predictions Found</h3>
          <p className="mt-1 text-sm text-slate-500">
            {history.length === 0
              ? 'Start by making a loan approval prediction.'
              : 'No predictions match your current filters.'}
          </p>
        </div>
      )}
    </div>
  );
}
