import { FiCalendar, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import ListPageTemplate from '../ListPageTemplate';
import { bookings } from '../../utils/staticData';

export default function BookingPage() {
  return (
    <ListPageTemplate
      title="Bookings"
      subtitle="Create, assign and manage fleet booking requests"
      addLabel="Create Booking"
      stats={[
        { title: 'Total Bookings', value: 67, icon: FiCalendar, color: 'brand' },
        { title: 'Approved', value: 42, icon: FiCheckCircle, color: 'emerald' },
        { title: 'Pending', value: 18, icon: FiClock, color: 'amber' },
        { title: 'Rejected', value: 7, icon: FiXCircle, color: 'rose' },
      ]}
      columns={[
        { key: 'id', label: 'Booking ID' },
        { key: 'company', label: 'Company' },
        { key: 'route', label: 'Route' },
        { key: 'date', label: 'Date' },
        { key: 'vehicle', label: 'Vehicle' },
        { key: 'driver', label: 'Driver' },
        { key: 'status', label: 'Status' },
      ]}
      data={bookings}
      filters={[
        { label: 'Status', options: [{ value: '', label: 'All' }, { value: 'Approved', label: 'Approved' }, { value: 'Pending', label: 'Pending' }, { value: 'Rejected', label: 'Rejected' }] },
        { label: 'Company', options: [{ value: '', label: 'All' }, { value: 'Acme', label: 'Acme Logistics' }, { value: 'Swift', label: 'Swift Transport' }] },
      ]}
      formFields={[
        { name: 'company', label: 'Company' },
        { name: 'route', label: 'Route' },
        { name: 'date', label: 'Booking Date', type: 'date' },
        { name: 'vehicle', label: 'Assign Vehicle' },
        { name: 'driver', label: 'Assign Driver' },
        { name: 'notes', label: 'Notes', type: 'textarea' },
      ]}
      detailFields={[
        { key: 'id', label: 'Booking ID' },
        { key: 'company', label: 'Company' },
        { key: 'route', label: 'Route' },
        { key: 'date', label: 'Date' },
        { key: 'vehicle', label: 'Vehicle' },
        { key: 'driver', label: 'Driver' },
        { key: 'status', label: 'Status' },
      ]}
    />
  );
}