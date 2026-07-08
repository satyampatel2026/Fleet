import { FiInbox } from 'react-icons/fi';
import Button from './Button';

export default function EmptyState({ title = 'No records found', description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <FiInbox className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      {description && <p className="text-sm text-slate-500 mt-1 max-w-sm">{description}</p>}
      {actionLabel && <Button className="mt-4" onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}