import Button from './Button';
import { FiPlus, FiDownload } from 'react-icons/fi';

export default function PageHeader({ title, subtitle, onAdd, addLabel = 'Add New', showExport = true }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {showExport && <Button variant="secondary" icon={FiDownload}>Export</Button>}
        {onAdd && <Button icon={FiPlus} onClick={onAdd}>{addLabel}</Button>}
      </div>
    </div>
  );
}