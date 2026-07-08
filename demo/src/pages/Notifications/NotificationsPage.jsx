import { FiBell, FiAlertTriangle, FiInfo, FiCheckCircle } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { notifications } from '../../utils/staticData';

const typeIcons = {
  warning: { icon: FiAlertTriangle, color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
  info: { icon: FiInfo, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
  success: { icon: FiCheckCircle, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  danger: { icon: FiAlertTriangle, color: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' },
};

export default function NotificationsPage() {
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" subtitle={`You have ${unread} unread notifications`} showExport={false} />

      <div className="flex gap-3">
        <Button size="sm">All</Button>
        <Button size="sm" variant="secondary">Unread ({unread})</Button>
        <Button size="sm" variant="ghost">Mark All Read</Button>
      </div>

      <Card>
        <CardBody className="p-0 divide-y divide-slate-50 dark:divide-slate-800">
          {notifications.map((n) => {
            const t = typeIcons[n.type];
            return (
              <div key={n.id} className={`flex gap-4 p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${!n.read ? 'bg-brand-50/30 dark:bg-brand-500/5' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${t.color}`}>
                  <t.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-medium text-sm">{n.title}</p>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{n.message}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0 mt-2" />}
              </div>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
}