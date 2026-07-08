import Card from './Card';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function StatCard({ title, value, change, trend = 'up', icon: Icon, color = 'brand' }) {
  const colors = {
    brand: 'bg-brand-50 dark:bg-brand-500/10 text-brand-600',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
    amber: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
    rose: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600',
  };
  return (
    <Card hover className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />} {change}
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}