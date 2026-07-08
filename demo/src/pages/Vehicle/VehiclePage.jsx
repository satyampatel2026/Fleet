import { FiTruck, FiCheckCircle, FiTool, FiPauseCircle } from 'react-icons/fi';
import ListPageTemplate from '../ListPageTemplate';
import { vehicles } from '../../utils/staticData';

export default function VehiclePage() {
  return (
    <ListPageTemplate
      title="Vehicles"
      subtitle="Fleet inventory, documents, insurance and service schedules"
      addLabel="Add Vehicle"
      stats={[
        { title: 'Total Fleet', value: 124, icon: FiTruck, color: 'brand' },
        { title: 'Active', value: 89, icon: FiCheckCircle, color: 'emerald' },
        { title: 'In Service', value: 18, icon: FiTool, color: 'amber' },
        { title: 'Idle', value: 12, icon: FiPauseCircle, color: 'rose' },
      ]}
      columns={[
        { key: 'number', label: 'Reg. Number' },
        { key: 'type', label: 'Type' },
        { key: 'make', label: 'Make' },
        { key: 'model', label: 'Model' },
        { key: 'fuel', label: 'Fuel' },
        { key: 'mileage', label: 'Mileage' },
        { key: 'status', label: 'Status' },
      ]}
      data={vehicles}
      filters={[
        { label: 'Type', options: [{ value: '', label: 'All' }, { value: 'Truck', label: 'Truck' }, { value: 'Van', label: 'Van' }, { value: 'SUV', label: 'SUV' }] },
        { label: 'Status', options: [{ value: '', label: 'All' }, { value: 'Active', label: 'Active' }, { value: 'In Service', label: 'In Service' }] },
      ]}
      formFields={[
        { name: 'number', label: 'Registration Number' },
        { name: 'type', label: 'Vehicle Type' },
        { name: 'make', label: 'Make' },
        { name: 'model', label: 'Model' },
        { name: 'fuel', label: 'Fuel Type', type: 'select', options: [{ value: 'Diesel', label: 'Diesel' }, { value: 'Petrol', label: 'Petrol' }, { value: 'CNG', label: 'CNG' }] },
        { name: 'mileage', label: 'Mileage' },
      ]}
      detailFields={[
        { key: 'number', label: 'Registration' },
        { key: 'type', label: 'Type' },
        { key: 'make', label: 'Make' },
        { key: 'model', label: 'Model' },
        { key: 'fuel', label: 'Fuel Type' },
        { key: 'mileage', label: 'Mileage' },
        { key: 'insurance', label: 'Insurance Expiry' },
        { key: 'service', label: 'Next Service' },
        { key: 'status', label: 'Status' },
      ]}
    />
  );
}