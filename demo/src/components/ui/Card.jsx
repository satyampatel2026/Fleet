import { motion } from 'framer-motion';
import { cn } from '../../utils/formatters';

export default function Card({ children, className, hover = false, glass = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm',
        glass && 'glass',
        hover && 'card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between p-6 pb-0">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({ children, className }) {
  return <div className={cn('p-6', className)}>{children}</div>;
}