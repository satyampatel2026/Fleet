import { FiTool, FiClock, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import ListPageTemplate from '../ListPageTemplate';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { maintenanceRecords } from '../../utils/staticData';

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      <ListPageTemplate
        title="Maintenance"
        subtitle="Service history, upcoming maintenance, garages and parts"
        addLabel="Schedule Service"
        stats={[
          { title: 'Total Records', value: 342, icon: FiTool, color: 'brand' },
          { title: 'Upcoming', value: 14, icon: FiClock, color: 'amber' },
          { title: 'Completed', value: 298, icon: FiCheckCircle, color: 'emerald' },
          { title: 'Overdue', value: 3, icon: FiAlertTriangle, color: 'rose' },
        ]}
        columns={[
          { key: 'vehicle', label: 'Vehicle' },
          { key: 'type', label: 'Service Type' },
          { key: 'garage', label: 'Garage' },
          { key: 'date', label: 'Date' },
          { key: 'cost', label: 'Cost' },
          { key: 'status', label: 'Status' },
        ]}
        data={maintenanceRecords}
        filters={[
          { label: 'Status', options: [{ value: '', label: 'All' }, { value: 'Upcoming', label: 'Upcoming' }, { value: 'Completed', label: 'Completed' }, { value: 'In Progress', label: 'In Progress' }] },
          { label: 'Type', options: [{ value: '', label: 'All' }, { value: 'Scheduled', label: 'Scheduled Service' }, { value: 'Repair', label: 'Repair' }] },
        ]}
        formFields={[
          { name: 'vehicle', label: 'Vehicle' },
          { name: 'type', label: 'Service Type' },
          { name: 'garage', label: 'Garage' },
          { name: 'date', label: 'Service Date', type: 'date' },
          { name: 'cost', label: 'Estimated Cost' },
          { name: 'notes', label: 'Notes', type: 'textarea' },
        ]}
        detailFields={[
          { key: 'vehicle', label: 'Vehicle' },
          { key: 'type', label: 'Service Type' },
          { key: 'garage', label: 'Garage' },
          { key: 'date', label: 'Date' },
          { key: 'cost', label: 'Cost' },
          { key: 'status', label: 'Status' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader title="Garages" subtitle="Partner service centers" />
          <CardBody className="space-y-3">
            {['Tata Motors, Navi Mumbai', 'Toyota Whitefield', 'MRF Tyres Okhla', 'Ashok Leyland Ambattur'].map((g) => (
              <div key={g} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm font-medium">{g}</div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Common Parts" subtitle="Frequently replaced" />
          <CardBody className="space-y-3">
            {[
              { part: 'Engine Oil Filter', cost: '₹850' },
              { part: 'Brake Pads (Set)', cost: '₹3,200' },
              { part: 'Air Filter', cost: '₹620' },
              { part: 'Tyre (MRF ZLX)', cost: '₹6,200' },
            ].map((p) => (
              <div key={p.part} className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm">
                <span>{p.part}</span><span className="font-semibold">{p.cost}</span>
              </div>
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Upcoming This Week" subtitle="Priority services" />
          <CardBody className="space-y-3">
            {maintenanceRecords.filter(m => m.status === 'Upcoming' || m.status === 'In Progress').map((m) => (
              <div key={m.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium">{m.vehicle}</p>
                  <Badge status={m.status} />
                </div>
                <p className="text-xs text-slate-500 mt-1">{m.type} · {m.date}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}