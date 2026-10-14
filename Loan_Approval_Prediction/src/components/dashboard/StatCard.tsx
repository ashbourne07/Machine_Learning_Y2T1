import { type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  variant?: 'default' | 'success' | 'danger' | 'info';
}

const variantStyles = {
  default: {
    icon: 'bg-slate-100 text-slate-600',
  },
  success: {
    icon: 'bg-emerald-50 text-emerald-600',
  },
  danger: {
    icon: 'bg-red-50 text-red-600',
  },
  info: {
    icon: 'bg-blue-50 text-blue-600',
  },
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = 'default',
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {description && (
            <p className="text-xs text-slate-400">{description}</p>
          )}
          {trend && (
            <p className="text-xs font-medium text-emerald-600">{trend}</p>
          )}
        </div>
        <div className={cn('rounded-lg p-2.5', styles.icon)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
