import {
  FiBriefcase, FiUsers, FiTruck, FiCalendar, FiMap, FiDroplet,
  FiTool, FiActivity, FiClock, FiMapPin,
} from 'react-icons/fi';
import StatCard from '../../components/ui/StatCard';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { stats, chartMonthlyTrips, chartFleetStatus, trips, bookings, maintenanceRecords } from '../../utils/staticData';

function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.trips));
  return (
    <div className="flex items-end gap-2 h-48 pt-4">
      {data.map((d) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-brand-100 dark:bg-brand-500/20 rounded-t-lg relative group" style={{ height: `${(d.trips / max) * 100}%`, minHeight: 8 }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
              {d.trips} trips
            </div>
          </div>
          <span className="text-xs text-slate-500">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function FleetDonut({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="flex items-center gap-8">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {data.reduce((acc, d, i) => {
            const offset = acc.offset;
            const pct = (d.value / total) * 100;
            acc.elements.push(
              <circle key={d.label} cx="18" cy="18" r="15.9" fill="none" strokeWidth="3.5"
                stroke={d.color.replace('bg-', '').includes('emerald') ? '#10b981' : d.color.replace('bg-', '').includes('amber') ? '#f59e0b' : d.color.replace('bg-', '').includes('rose') ? '#f43f5e' : d.color.replace('bg-', '').includes('blue') ? '#3b82f6' : '#94a3b8'}
                strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={-offset} className="transition-all duration-500" />
            );
            acc.offset += pct;
            return acc;
          }, { elements: [], offset: 0 }).elements}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-xs text-slate-500">Total</span>
        </div>
      </div>
      <div className="space-y-3 flex-1">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${d.color}`} />
              <span className="text-sm text-slate-600 dark:text-slate-300">{d.label}</span>
            </div>
            <span className="text-sm font-semibold">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back! Here's your fleet overview for July 6, 2026.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Companies" value={stats.companies} change="+3 this month" icon={FiBriefcase} color="brand" />
        <StatCard title="Employees" value={stats.employees} change="+12 this month" icon={FiUsers} color="emerald" />
        <StatCard title="Drivers" value={stats.drivers} change="+5 this month" icon={FiUsers} color="brand" />
        <StatCard title="Vehicles" value={stats.vehicles} change="+2 this month" icon={FiTruck} color="amber" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Active Bookings" value={stats.bookings} icon={FiCalendar} color="brand" />
        <StatCard title="Trips Today" value={stats.trips} change="+18% vs yesterday" icon={FiMap} color="emerald" />
        <StatCard title="Fuel Cost (MTD)" value={stats.fuelCost} change="+4.2%" trend="down" icon={FiDroplet} color="rose" />
        <StatCard title="Maintenance (MTD)" value={stats.maintenanceCost} icon={FiTool} color="amber" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard title="Vehicle Utilization" value={`${stats.utilization}%`} change="+2.1%" icon={FiActivity} color="emerald" />
        <StatCard title="Driver Availability" value={`${stats.availability}%`} change="-1.5%" trend="down" icon={FiClock} color="brand" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Monthly Trips" subtitle="Trip volume over the last 7 months" />
          <CardBody><MiniBarChart data={chartMonthlyTrips} /></CardBody>
        </Card>
        <Card>
          <CardHeader title="Fleet Status" subtitle="Current vehicle distribution" />
          <CardBody><FleetDonut data={chartFleetStatus} /></CardBody>
        </Card>
      </div>

      {/* Map Placeholder + Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Live Fleet Map" subtitle="Real-time vehicle tracking" />
          <CardBody>
            <div className="relative h-64 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="text-center z-10">
                <FiMapPin className="w-10 h-10 text-brand-600 mx-auto mb-3" />
                <p className="font-semibold text-slate-700 dark:text-slate-300">24 vehicles active on map</p>
                <p className="text-sm text-slate-500 mt-1">Mumbai · Delhi · Bangalore · Chennai</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Revenue Summary" subtitle="July 2026" />
          <CardBody>
            <div className="space-y-4">
              {[
                { label: 'Trip Revenue', amount: '₹5,68,000', pct: 72 },
                { label: 'Contract Revenue', amount: '₹2,40,000', pct: 48 },
                { label: 'Additional Services', amount: '₹86,000', pct: 22 },
              ].map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="font-semibold">{r.amount}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-700" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <span className="font-semibold">Total Revenue</span>
                <span className="text-xl font-bold text-brand-600">₹8,94,000</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Recent Trips" subtitle="Latest fleet movements" />
          <CardBody className="pt-4">
            <div className="space-y-3">
              {trips.slice(0, 4).map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{t.id} · {t.route}</p>
                    <p className="text-xs text-slate-500">{t.driver} · {t.vehicle}</p>
                  </div>
                  <Badge status={t.status} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent Bookings" subtitle="Latest booking requests" />
          <CardBody className="pt-4">
            <div className="space-y-3">
              {bookings.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{b.id} · {b.route}</p>
                    <p className="text-xs text-slate-500">{b.company} · {b.date}</p>
                  </div>
                  <Badge status={b.status} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Upcoming Services + Expense */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Upcoming Services" subtitle="Scheduled maintenance" />
          <CardBody className="pt-4">
            {maintenanceRecords.filter(m => m.status === 'Upcoming').map((m) => (
              <div key={m.id} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-800 last:border-0">
                <div>
                  <p className="text-sm font-medium">{m.vehicle}</p>
                  <p className="text-xs text-slate-500">{m.type} · {m.garage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{m.date}</p>
                  <p className="text-xs text-slate-500">{m.cost}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Expense Summary" subtitle="July 2026 breakdown" />
          <CardBody className="pt-4">
            {[
              { cat: 'Fuel', amt: '₹2,45,000', pct: 55 },
              { cat: 'Maintenance', amt: '₹98,000', pct: 22 },
              { cat: 'Insurance', amt: '₹1,85,000', pct: 41 },
              { cat: 'Toll & Parking', amt: '₹21,000', pct: 5 },
            ].map((e) => (
              <div key={e.cat} className="flex items-center gap-4 py-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{e.cat}</span><span className="font-medium">{e.amt}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${e.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}