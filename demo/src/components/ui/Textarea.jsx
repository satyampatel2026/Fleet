import { cn } from '../../utils/formatters';

export default function Textarea({ label, className, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
      <textarea
        className={cn(
          'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800',
          'px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/30',
          className
        )}
        rows={4}
        {...props}
      />
    </div>
  );
}