import { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function ActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const items = [
    { label: 'View', icon: FiEye, action: onView },
    { label: 'Edit', icon: FiEdit2, action: onEdit },
    { label: 'Delete', icon: FiTrash2, action: onDelete, danger: true },
  ];

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <FiMoreVertical className="w-4 h-4 text-slate-500" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 py-1 z-20">
          {items.map((item) => (
            <button key={item.label} onClick={() => { item.action?.(); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${item.danger ? 'text-rose-600' : 'text-slate-700 dark:text-slate-200'}`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}