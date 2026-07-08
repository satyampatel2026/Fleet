import { FiDollarSign, FiCheckCircle, FiClock, FiPieChart } from 'react-icons/fi';
import ListPageTemplate from "../ListPageTemplate";
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import { expenses } from '../../utils/staticData';

export default function ExpensePage() {
  return (
    <div className="space-y-6">
      <ListPageTemplate
        title="Expenses"
        subtitle="Trip, vehicle and monthly expense tracking by category"
        addLabel="Add Expense"
        stats={[
          { title: 'Total Expenses', value: '₹5.49L', icon: FiDollarSign, color: 'brand' },
          { title: 'Approved', value: '₹4.82L', icon: FiCheckCircle, color: 'emerald' },
          { title: 'Pending', value: '₹67K', icon: FiClock, color: 'amber' },
          { title: 'Categories', value: 12, icon: FiPieChart, color: 'rose' },
        ]}
        columns={[
          { key: 'category', label: 'Category' },
          { key: 'description', label: 'Description' },
          { key: 'amount', label: 'Amount' },
          { key: 'date', label: 'Date' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status' },
        ]}
        data={expenses}
        filters={[
          { label: 'Category', options: [{ value: '', label: 'All' }, { value: 'Fuel', label: 'Fuel' }, { value: 'Toll', label: 'Toll' }, { value: 'Maintenance', label: 'Maintenance' }] },
          { label: 'Type', options: [{ value: '', label: 'All' }, { value: 'Trip', label: 'Trip' }, { value: 'Vehicle', label: 'Vehicle' }, { value: 'Monthly', label: 'Monthly' }] },
        ]}
        formFields={[
          { name: 'category', label: 'Category', type: 'select', options: [{ value: 'Fuel', label: 'Fuel' }, { value: 'Toll', label: 'Toll' }, { value: 'Maintenance', label: 'Maintenance' }, { value: 'Parking', label: 'Parking' }, { value: 'Insurance', label: 'Insurance' }] },
          { name: 'description', label: 'Description' },
          { name: 'amount', label: 'Amount' },
          { name: 'date', label: 'Date', type: 'date' },
          { name: 'type', label: 'Expense Type', type: 'select', options: [{ value: 'Trip', label: 'Trip' }, { value: 'Vehicle', label: 'Vehicle' }, { value: 'Monthly', label: 'Monthly' }] },
        ]}
        detailFields={[
          { key: 'category', label: 'Category' },
          { key: 'description', label: 'Description' },
          { key: 'amount', label: 'Amount' },
          { key: 'date', label: 'Date' },
          { key: 'type', label: 'Type' },
          { key: 'status', label: 'Status' },
        ]}
      />

      <Card>
        <CardHeader title="Monthly Expense Breakdown" subtitle="July 2026" />
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { cat: 'Fuel', amt: '₹2,45,000', color: 'bg-brand-500' },
              { cat: 'Maintenance', amt: '₹98,000', color: 'bg-amber-500' },
              { cat: 'Insurance', amt: '₹1,85,000', color: 'bg-emerald-500' },
              { cat: 'Toll & Other', amt: '₹21,000', color: 'bg-rose-500' },
            ].map((e) => (
              <div key={e.cat} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                <div className={`w-3 h-3 rounded-full ${e.color} mx-auto mb-2`} />
                <p className="text-xs text-slate-500">{e.cat}</p>
                <p className="text-lg font-bold mt-1">{e.amt}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}