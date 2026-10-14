import {
  Brain,
  Database,
  Settings2,
  Cpu,
  SlidersHorizontal,
  BarChart3,
  Trophy,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../lib/utils';

const workflowSteps = [
  { icon: Database, label: 'Data Collection', desc: 'Historical loan application data' },
  { icon: Settings2, label: 'Data Preprocessing', desc: 'Cleaning & transformation' },
  { icon: SlidersHorizontal, label: 'Feature Engineering', desc: 'Variable selection & creation' },
  { icon: Cpu, label: 'Model Training', desc: 'RF, XGBoost, LightGBM' },
  { icon: SlidersHorizontal, label: 'Hyperparameter Tuning', desc: 'Grid/Random search' },
  { icon: BarChart3, label: 'Model Evaluation', desc: 'Cross-validation & metrics' },
  { icon: Trophy, label: 'Best Model Selection', desc: 'Performance comparison' },
  { icon: FileText, label: 'Loan Prediction', desc: 'Real-time inference' },
];

const models = [
  {
    name: 'Random Forest',
    desc: 'An ensemble of decision trees that reduces overfitting through bootstrap aggregation (bagging) and feature randomization.',
    color: 'bg-emerald-50 border-emerald-200',
    iconColor: 'text-emerald-600',
  },
  {
    name: 'XGBoost',
    desc: 'Extreme Gradient Boosting uses sequential tree building with regularization to achieve high performance on structured data.',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
  },
  {
    name: 'LightGBM',
    desc: 'Light Gradient Boosting Machine uses histogram-based algorithms and leaf-wise growth for fast, memory-efficient training.',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
  },
];

const metrics = [
  { name: 'Accuracy', desc: 'Overall correctness of predictions' },
  { name: 'Precision', desc: 'Ratio of true positive predictions' },
  { name: 'Recall', desc: 'Ability to find all positive instances' },
  { name: 'F1 Score', desc: 'Harmonic mean of precision and recall' },
  { name: 'ROC-AUC', desc: 'Model discrimination capability' },
  { name: 'Confusion Matrix', desc: 'Classification breakdown table' },
];

const techStack = [
  { category: 'ML & Data', items: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'LightGBM'] },
  { category: 'Visualization', items: ['Matplotlib', 'Seaborn'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts'] },
];

export default function About() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">About the Project</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          This system uses machine learning to assist loan approval screening by learning patterns
          from historical loan application data. It employs ensemble learning methods to combine
          multiple models for improved prediction accuracy and reliability.
        </p>
      </div>

      {/* Models */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Ensemble Learning Models</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {models.map((m) => (
            <div
              key={m.name}
              className={cn('rounded-xl border p-5', m.color)}
            >
              <div className="mb-2 flex items-center gap-2">
                <Brain className={cn('h-5 w-5', m.iconColor)} />
                <h3 className="font-semibold text-slate-900">{m.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">ML Pipeline Workflow</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, idx) => (
              <div key={step.label} className="relative flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <step.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  {idx < workflowSteps.length - 1 && (
                    <div className="mt-1 hidden h-full w-px bg-blue-200 sm:block lg:hidden" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-blue-500">STEP {idx + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">{step.label}</p>
                  <p className="text-xs text-slate-500">{step.desc}</p>
                </div>
                {idx < workflowSteps.length - 1 && (
                  <ArrowRight className="mt-3 hidden h-4 w-4 flex-shrink-0 text-slate-300 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Metrics */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Evaluation Metrics</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.name}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-900">{m.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Technology Stack</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {techStack.map((cat) => (
            <div
              key={cat.category}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {cat.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Info */}
      <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-2 text-base font-semibold text-slate-900">Project Details</h2>
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <div className="flex gap-2">
            <span className="text-slate-500">Project:</span>
            <span className="font-medium text-slate-800">Loan Approval Prediction Using Ensemble Learning</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-500">Type:</span>
            <span className="font-medium text-slate-800">Machine Learning Academic Project</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-500">Subject:</span>
            <span className="font-medium text-slate-800">Machine Learning</span>
          </div>
          <div className="flex gap-2">
            <span className="text-slate-500">Classification:</span>
            <span className="font-medium text-slate-800">Binary (Approved / Rejected)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
