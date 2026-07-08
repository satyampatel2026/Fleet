import { useState } from 'react';
import { FiDownload, FiPrinter, FiBarChart2, FiFileText } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import DataTable from '../../components/tables/DataTable';
import { trips, fuelEntries, expenses, maintenanceRecords } from '../../utils/staticData';

const reportTypes = [
  { id: 'trip', label: 'Trip Report', icon: FiBarChart2 },
  { id: 'vehicle', label: 'Vehicle Report', icon: FiFileText },
  { id: 'fuel', label: 'Fuel Report', icon: FiBarChart2 },
  { id: 'expense', label: 'Expense Report', icon: FiFileText },
  { id: 'maintenance', label: 'Maintenance Report', icon: FiFileText },
  { id: 'driver', label: 'Driver Report', icon: FiFileText },
];

const reportData = {
  trip: { columns: [{ key: 'id', label: 'Trip' }, { key: 'route', label: 'Route' }, { key: 'driver', label: 'Driver' }, { key: 'distance', label: 'Distance' }, { key: 'status', label: 'Status' }], data: trips },
  fuel: { columns: [{ key: 'vehicle', label: 'Vehicle' }, { key: 'date', label: 'Date' }, { key: 'liters', label: 'Liters' }, { key: 'cost', label: 'Cost' }], data: fuelEntries },
  expense: { columns: [{ key: 'category', label: 'Category' }, { key: 'description', label: 'Description' }, { key: 'amount', label: 'Amount' }, { key: 'status', label: 'Status' }], data: expenses },
  maintenance: { columns: [{ key: 'vehicle', label: 'Vehicle' }, { key: 'type', label: 'Type' }, { key: 'cost', label: 'Cost' }, { key: 'status', label: 'Status' }], data: maintenanceRecords },
  vehicle: { columns: [{ key: 'number', label: 'Vehicle' }, { key: 'type', label: 'Type' }, { key: 'mileage', label: 'Mileage' }, { key: 'status', label: 'Status' }], data: trips },
  driver: { columns: [{ key: 'driver', label: 'Driver' }, { key: 'route', label: 'Route' }, { key: 'distance', label: 'Distance' }, { key: 'status', label: 'Status' }], data: trips },
};

export default function Reports() {
  const [active, setActive] = useState('trip');
  const current = reportData[active];

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Generate, export and print fleet reports" showExport={false} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {reportTypes.map((r) => (
          <button key={r.id} onClick={() => setActive(r.id)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
              active === r.id
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 shadow-md'
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md'
            }`}>
            <r.icon className={`w-5 h-5 mb-2 ${active === r.id ? 'text-brand-600' : 'text-slate-400'}`} />
            <p className="text-sm font-medium">{r.label}</p>
          </button>
        ))}
      </div>

      <Card>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Input label="From Date" type="date" defaultValue="2026-07-01" />
            <Input label="To Date" type="date" defaultValue="2026-07-06" />
            <Select label="Format" options={[{ value: 'pdf', label: 'PDF' }, { value: 'csv', label: 'CSV' }, { value: 'xlsx', label: 'Excel' }]} />
            <div className="flex items-end gap-2">
              <Button icon={FiDownload} className="flex-1">Export</Button>
              <Button variant="secondary" icon={FiPrinter}>Print</Button>
            </div>
          </div>

          <DataTable columns={current.columns} data={current.data} />
        </CardBody>
      </Card>
    </div>
  );
}