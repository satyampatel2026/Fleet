import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Pagination({ current = 1, total = 5 }) {
  return (
    <div className="flex items-center justify-between px-2 py-3">
      <p className="text-sm text-slate-500">Showing page {current} of {total}</p>
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40" disabled={current === 1}>
          <FiChevronLeft className="w-4 h-4" />
        </button>
        {[1, 2, 3].map((p) => (
          <button key={p} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === current ? 'bg-brand-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            {p}
          </button>
        ))}
        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}