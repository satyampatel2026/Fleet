import { useState } from 'react';
import { FiShield, FiBell, FiSettings, FiUsers } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

const tabs = [
  { id: 'roles', label: 'Roles & Permissions', icon: FiShield },
  { id: 'system', label: 'System Settings', icon: FiSettings },
  { id: 'notifications', label: 'Notifications', icon: FiBell },
  { id: 'users', label: 'User Management', icon: FiUsers },
];

const roles = [
  { name: 'Super Admin', users: 2, permissions: 'Full Access' },
  { name: 'Fleet Manager', users: 8, permissions: 'Fleet, Trips, Reports' },
  { name: 'Dispatcher', users: 14, permissions: 'Bookings, Trips, Drivers' },
  { name: 'Accountant', users: 6, permissions: 'Expenses, Reports, Fuel' },
  { name: 'Viewer', users: 12, permissions: 'Read Only' },
];

export default function Settings() {
  const [tab, setTab] = useState('roles');

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Configure system, roles, permissions and notifications" showExport={false} />

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-64 shrink-0">
          <CardBody className="p-3">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  tab === t.id ? 'bg-brand-600 text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </CardBody>
        </Card>

        <Card className="flex-1">
          <CardBody>
            {tab === 'roles' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Roles & Permissions</h3>
                  <Button size="sm">Add Role</Button>
                </div>
                {roles.map((r) => (
                  <div key={r.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-sm text-slate-500">{r.permissions}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-500">{r.users} users</span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'system' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company Name" defaultValue="FleetPro Enterprise" />
                <Input label="Support Email" defaultValue="support@fleetpro.com" />
                <Select label="Timezone" options={[{ value: 'IST', label: 'Asia/Kolkata (IST)' }, { value: 'UTC', label: 'UTC' }]} />
                <Select label="Date Format" options={[{ value: 'DMY', label: 'DD/MM/YYYY' }, { value: 'MDY', label: 'MM/DD/YYYY' }]} />
                <Select label="Currency" options={[{ value: 'INR', label: 'INR (₹)' }, { value: 'USD', label: 'USD ($)' }]} />
                <Select label="Distance Unit" options={[{ value: 'km', label: 'Kilometers' }, { value: 'mi', label: 'Miles' }]} />
                <div className="md:col-span-2 flex justify-end pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div className="space-y-4">
                {[
                  { label: 'Document Expiry Alerts', desc: 'Notify when documents are expiring within 30 days' },
                  { label: 'Trip Status Updates', desc: 'Real-time notifications for trip start, end and delays' },
                  { label: 'Maintenance Reminders', desc: 'Alert before scheduled service dates' },
                  { label: 'Booking Requests', desc: 'New booking request notifications' },
                  { label: 'Fuel Anomaly Detection', desc: 'Alert on unusual fuel consumption patterns' },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="font-medium">{n.label}</p>
                      <p className="text-sm text-slate-500">{n.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-checked:bg-brand-600 rounded-full peer transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}
              </div>
            )}

            {tab === 'users' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <Button size="sm">Invite User</Button>
                </div>
                {['Admin User · admin@fleet.com', 'Fleet Manager · manager@fleet.com', 'Dispatcher · dispatch@fleet.com'].map((u) => (
                  <div key={u} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-sm font-medium">{u}</span>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}