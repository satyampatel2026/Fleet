import { Link, useLocation } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const labels = {
  dashboard: 'Dashboard', vendors: 'Vendors', employees: 'Employees',
  drivers: 'Drivers', vehicles: 'Vehicles', bookings: 'Bookings',
  trips: 'Trips', fuel: 'Fuel', maintenance: 'Maintenance',
  expenses: 'Expenses', documents: 'Documents', reports: 'Reports',
  settings: 'Settings', profile: 'Profile', notifications: 'Notifications',
};

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      <Link to="/dashboard" className="text-slate-400 hover:text-brand-600 transition-colors">
        <FiHome className="w-4 h-4" />
      </Link>
      {segments.map((seg, i) => (
        <span key={seg} className="flex items-center gap-1.5">
          <FiChevronRight className="w-3.5 h-3.5 text-slate-300" />
          {i === segments.length - 1 ? (
            <span className="font-medium text-slate-900 dark:text-white">{labels[seg] || seg}</span>
          ) : (
            <Link to={`/${segments.slice(0, i + 1).join('/')}`} className="text-slate-500 hover:text-brand-600 transition-colors">
              {labels[seg] || seg}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}