import { cn } from '../../utils/formatters';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-600/25',
  secondary: 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
  ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
  outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-600/10',
};

const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' };

export default function Button({ children, variant = 'primary', size = 'md', icon: Icon, className, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-brand-500/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant], sizes[size], className
      )}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}