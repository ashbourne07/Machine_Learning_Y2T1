import { useLocation } from 'react-router-dom';
import { Menu, Settings } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/prediction': 'Loan Prediction',
  '/result': 'Prediction Result',
  '/models': 'Model Comparison',
  '/features': 'Feature Importance',
  '/history': 'Prediction History',
  '/about': 'About Project',
};

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Loan Approval Prediction';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden text-xs text-slate-400 sm:block">Ensemble ML System</span>
        <button
          className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Settings"
        >
          <Settings className="h-[18px] w-[18px]" />
        </button>
      </div>
    </header>
  );
}
