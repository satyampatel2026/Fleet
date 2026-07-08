import { FiMap, FiCheckCircle, FiNavigation, FiXCircle } from 'react-icons/fi';
import ListPageTemplate from "../ListPageTemplate";
import { trips } from '../../utils/staticData';
import Badge from '../../components/ui/Badge';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';

const timeline = [
  { time: '06:15 AM', event: 'Driver checked in', status: 'done' },
  { time: '06:30 AM', event: 'Trip started — Mumbai depot', status: 'done' },
  { time: '09:00 AM', event: 'Rest stop — Lonavala', status: 'done' },
  { time: '11:45 AM', event: 'Arrived at Pune warehouse', status: 'done' },
  { time: '12:00 PM', event: 'Unloading completed', status: 'done' },
];

export default function TripPage() {
  return (
    <div className="space-y-6">
      <ListPageTemplate
        title="Trips"
        subtitle="Monitor active trips, timelines and trip expenses"
        addLabel="Schedule Trip"
        stats={[
          { title: 'Total Trips', value: 284, icon: FiMap, color: 'brand' },
          { title: 'Completed', value: 198, icon: FiCheckCircle, color: 'emerald' },
          { title: 'In Progress', value: 24, icon: FiNavigation, color: 'amber' },
          { title: 'Cancelled', value: 12, icon: FiXCircle, color: 'rose' },
        ]}
        columns={[
          { key: 'id', label: 'Trip ID' },
          { key: 'booking', label: 'Booking' },
          { key: 'driver', label: 'Driver' },
          { key: 'vehicle', label: 'Vehicle' },
          { key: 'route', label: 'Route' },
          { key: 'start', label: 'Start' },
          { key: 'distance', label: 'Distance' },
          { key: 'status', label: 'Status' },
        ]}
        data={trips}
        filters={[
          { label: 'Status', options: [{ value: '', label: 'All' }, { value: 'Completed', label: 'Completed' }, { value: 'In Progress', label: 'In Progress' }, { value: 'Scheduled', label: 'Scheduled' }] },
        ]}
        formFields={[
          { name: 'booking', label: 'Booking ID' },
          { name: 'driver', label: 'Driver' },
          { name: 'vehicle', label: 'Vehicle' },
          { name: 'route', label: 'Route' },
          { name: 'start', label: 'Start Time', type: 'time' },
        ]}
        detailFields={[
          { key: 'id', label: 'Trip ID' },
          { key: 'route', label: 'Route' },
          { key: 'driver', label: 'Driver' },
          { key: 'vehicle', label: 'Vehicle' },
          { key: 'distance', label: 'Distance' },
          { key: 'status', label: 'Status' },
        ]}
      />

      <Card>
        <CardHeader title="Sample Trip Timeline" subtitle="TR-8821 · Mumbai → Pune" />
        <CardBody>
          <div className="relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-brand-200 dark:bg-brand-800" />
            {timeline.map((t, i) => (
              <div key={i} className="relative pb-6 last:pb-0">
                <div className="absolute -left-5 w-4 h-4 rounded-full bg-brand-600 ring-4 ring-brand-100 dark:ring-brand-900" />
                <p className="text-xs text-slate-500">{t.time}</p>
                <p className="text-sm font-medium mt-0.5">{t.event}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}