import Badge from '../ui/Badge';
import ActionMenu from '../ui/ActionMenu';

export default function DataTable({ columns, data, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
          {data.map((row, i) => (
            <tr key={row.id || i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {col.render ? col.render(row) : col.key === 'status' ? <Badge status={row[col.key]} /> : row[col.key]}
                </td>
              ))}
              <td className="px-4 py-4 text-right">
                <ActionMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}