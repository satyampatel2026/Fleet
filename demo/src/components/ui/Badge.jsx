import { cn } from '../../utils/formatters';

const styles = {
  Active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Approved: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  Rejected: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  Scheduled: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
  Cancelled: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  Valid: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Expiring Soon': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Expired: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  Upcoming: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
  Available: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  'On Trip': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  'Off Duty': 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  'On Leave': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Idle: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  'In Service': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  Expiring: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
};

export default function Badge({ status, children }) {
  const label = children || status;
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium', styles[status] || styles.Inactive)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-60" />
      {label}
    </span>
  );
}