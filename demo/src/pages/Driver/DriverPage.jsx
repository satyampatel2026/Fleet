// DriverPage.jsx
import { FiUsers, FiCheckCircle, FiNavigation, FiStar } from 'react-icons/fi';
import ListPageTemplate from '../ListPageTemplate';
import { drivers } from '../../utils/staticData';

export default function DriverPage() {
  return (
    <ListPageTemplate
      title="Drivers" subtitle="Driver profiles, licenses, availability and performance"
      addLabel="Add Driver"
      stats={[
        { title: 'Total Drivers', value: 156, icon: FiUsers, color: 'brand' },
        { title: 'Available', value: 98, icon: FiCheckCircle, color: 'emerald' },
        { title: 'On Trip', value: 42, icon: FiNavigation, color: 'amber' },
        { title: 'Avg Rating', value: '4.7', icon: FiStar, color: 'rose' },
      ]}
      columns={[
        { key: 'name', label: 'Driver' }, { key: 'license', label: 'License No.' },
        { key: 'expiry', label: 'License Expiry' }, { key: 'medical', label: 'Medical' },
        { key: 'availability', label: 'Availability' },
        { key: 'trips', label: 'Total Trips' },
        { key: 'rating', label: 'Rating', render: (r) => `⭐ ${r.rating}` },
      ]}
      data={drivers}
      filters={[
        { label: 'Availability', options: [{ value: '', label: 'All' }, { value: 'Available', label: 'Available' }, { value: 'On Trip', label: 'On Trip' }] },
        { label: 'Medical', options: [{ value: '', label: 'All' }, { value: 'Valid', label: 'Valid' }, { value: 'Expiring', label: 'Expiring' }] },
      ]}
      formFields={[
        { name: 'name', label: 'Full Name' }, { name: 'license', label: 'License Number' },
        { name: 'expiry', label: 'License Expiry', type: 'date' },
        { name: 'medical', label: 'Medical Status', type: 'select', options: [{ value: 'Valid', label: 'Valid' }, { value: 'Expiring', label: 'Expiring' }] },
      ]}
      detailFields={[
        { key: 'name', label: 'Name' }, { key: 'license', label: 'License' },
        { key: 'expiry', label: 'Expiry' }, { key: 'medical', label: 'Medical' },
        { key: 'availability', label: 'Availability' }, { key: 'trips', label: 'Trips' }, { key: 'rating', label: 'Rating' },
      ]}
    />
  );
}