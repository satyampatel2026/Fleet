import { FiDroplet, FiTrendingUp, FiTruck, FiDollarSign } from 'react-icons/fi';
import ListPageTemplate from "../ListPageTemplate";
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import { fuelEntries } from '../../utils/staticData';

function FuelAnalytics() {
  const weeks = [
    { week: 'W1', cost: 62000 }, { week: 'W2', cost: 58000 },
    { week: 'W3', cost: 71000 }, { week: 'W4', cost: 65000 },
  ];
  const max = Math.max(...weeks.map((w) => w.cost));
  return (
    <div className="flex items-end gap-3 h-32">
      {weeks.map((w) => (
        <div key={w.week} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-gradient-to-t from-brand-600 to-brand-400 rounded-t-lg" style={{ height: `${(w.cost / max) * 100}%`, minHeight: 12 }} />
          <span className="text-xs text-slate-500">{w.week}</span>
        </div>
      ))}
    </div>
  );
}

export default function FuelPage() {
  return (
    <div className="space-y-6">
      <ListPageTemplate
        title="Fuel Management"
        subtitle="Track fuel entries, costs, mileage and analytics"
        addLabel="Add Fuel Entry"
        stats={[
          { title: 'Total Entries', value: 486, icon: FiDroplet, color: 'brand' },
          { title: 'MTD Cost', value: '₹2.56L', icon: FiDollarSign, color: 'rose' },
          { title: 'Avg Mileage', value: '11.2 km/l', icon: FiTrendingUp, color: 'emerald' },
          { title: 'Vehicles Fueled', value: 98, icon: FiTruck, color: 'amber' },
        ]}
        columns={[
          { key: 'vehicle', label: 'Vehicle' },
          { key: 'date', label: 'Date' },
          { key: 'liters', label: 'Liters' },
          { key: 'cost', label: 'Cost' },
          { key: 'station', label: 'Station' },
          { key: 'mileage', label: 'Mileage' },
        ]}
        data={fuelEntries}
        filters={[
          { label: 'Vehicle', options: [{ value: '', label: 'All' }, { value: 'MH', label: 'MH-12-AB-1234' }, { value: 'DL', label: 'DL-01-CD-5678' }] },
          { label: 'Month', options: [{ value: '', label: 'All' }, { value: 'Jul', label: 'July 2026' }, { value: 'Jun', label: 'June 2026' }] },
        ]}
        formFields={[
          { name: 'vehicle', label: 'Vehicle' },
          { name: 'date', label: 'Date', type: 'date' },
          { name: 'liters', label: 'Liters', type: 'number' },
          { name: 'cost', label: 'Total Cost' },
          { name: 'station', label: 'Fuel Station' },
          { name: 'mileage', label: 'Mileage (km/l)' },
        ]}
        detailFields={[
          { key: 'vehicle', label: 'Vehicle' },
          { key: 'date', label: 'Date' },
          { key: 'liters', label: 'Liters' },
          { key: 'cost', label: 'Cost' },
          { key: 'station', label: 'Station' },
          { key: 'mileage', label: 'Mileage' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Weekly Fuel Cost" subtitle="July 2026" />
          <CardBody><FuelAnalytics /></CardBody>
        </Card>
        <Card>
          <CardHeader title="Fuel Type Breakdown" subtitle="Fleet consumption split" />
          <CardBody>
            {[
              { type: 'Diesel', pct: 78, vehicles: 96 },
              { type: 'Petrol', pct: 18, vehicles: 22 },
              { type: 'CNG', pct: 4, vehicles: 6 },
            ].map((f) => (
              <div key={f.type} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{f.type} · {f.vehicles} vehicles</span>
                  <span className="font-semibold">{f.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${f.pct}%` }} />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}