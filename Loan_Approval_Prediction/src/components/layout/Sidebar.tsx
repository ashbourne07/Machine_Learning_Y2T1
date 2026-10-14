import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  GitCompareArrows,
  History,
  Info,
  Activity,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/prediction', label: 'Loan Prediction', icon: FileText },
  { to: '/models', label: 'Model Comparison', icon: GitCompareArrows },
  { to: '/features', label: 'Feature Importance', icon: BarChart3 },
  { to: '/history', label: 'Prediction History', icon: History },
  { to: '/about', label: 'About Project', icon: Info },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-[264px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Activity className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900">LoanPredict AI</h1>
              <p className="text-[10px] text-slate-500">Ensemble Learning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
            Navigation
          </p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                location.pathname === to
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Icon
                className={cn(
                  'h-[18px] w-[18px] flex-shrink-0',
                  location.pathname === to ? 'text-blue-600' : 'text-slate-400'
                )}
              />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 px-5 py-4">
          <p className="text-[11px] font-medium text-slate-400">ML Decision Support System</p>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-slate-500">System Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
}
