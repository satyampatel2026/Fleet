import Select from './Select';
import Button from './Button';
import { FiFilter, FiX } from 'react-icons/fi';

export default function FilterPanel({ filters = [], onReset }) {
  return (
    <div className="flex flex-wrap items-end gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 mr-2">
        <FiFilter className="w-4 h-4" /> Filters
      </div>
      {filters.map((f) => (
        <Select key={f.label} label={f.label} options={f.options} className="min-w-[140px]" defaultValue="" />
      ))}
      <Button variant="ghost" size="sm" icon={FiX} onClick={onReset}>Reset</Button>
    </div>
  );
}