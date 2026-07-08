import { cn } from '../../utils/formatters';

export default function Input({ label, error, icon: Icon, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />}
        <input
          className={cn(
            'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800',
            'px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all',
            Icon && 'pl-10', error && 'border-rose-500', className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}