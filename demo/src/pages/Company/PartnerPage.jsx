import { FiUsers, FiCheckCircle, FiXCircle, FiMapPin } from 'react-icons/fi';
import ListPageTemplate from '../ListPageTemplate';
import { partners } from '../../utils/staticData';
import axios from "axios";

const columns = [
  { key: 'name', label: 'Partner Name' },
  { key: 'code', label: 'Partner Code' },
  { key: 'city', label: 'City' },
  { key: 'vehicles', label: 'Vehicles' },
  { key: 'contact', label: 'Contact Person' },
  { key: 'status', label: 'Status' },
];

export default function PartnerPage() {
  return (
    <ListPageTemplate
      title="Partners"
      subtitle="Manage partners and their operations"
      addLabel="Add Partner"

      stats={[
        {
          title: 'Total Partners',
          value: 120,
          icon: FiUsers,
          color: 'brand'
        },
        {
          title: 'Active Partners',
          value: 105,
          icon: FiCheckCircle,
          color: 'emerald'
        },
        {
          title: 'Inactive Partners',
          value: 15,
          icon: FiXCircle,
          color: 'rose'
        },
        {
          title: 'Cities Covered',
          value: 25,
          icon: FiMapPin,
          color: 'amber'
        },
      ]}

      columns={columns}
      data={partners}

      filters={[
        {
          label: 'Status',
          options: [
            { value: '', label: 'All' },
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
          ]
        },
        {
          label: 'City',
          options: [
            { value: '', label: 'All' },
            { value: 'Mumbai', label: 'Mumbai' },
            { value: 'Delhi', label: 'Delhi' },
            { value: 'Bhopal', label: 'Bhopal' }
          ]
        }
      ]}

      formFields={[
        {
          name: 'name',
          label: 'Partner Name'
        },
        {
          name: 'code',
          label: 'Partner Code'
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email'
        },
        {
          name: 'phone',
          label: 'Phone'
        },
        {
          name: 'city',
          label: 'City'
        },
        {
          name: 'vehicles',
          label: 'Number of Vehicles',
          type: 'number'
        },
        {
          name: 'contact',
          label: 'Contact Person'
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          options: [
            {
              value: 'Active',
              label: 'Active'
            },
            {
              value: 'Inactive',
              label: 'Inactive'
            }
          ]
        }
      ]}

      detailFields={[
        {
          key: 'name',
          label: 'Partner Name'
        },
        {
          key: 'code',
          label: 'Partner Code'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'phone',
          label: 'Phone'
        },
        {
          key: 'city',
          label: 'City'
        },
        {
          key: 'vehicles',
          label: 'Total Vehicles'
        },
        {
          key: 'contact',
          label: 'Contact Person'
        },
        {
          key: 'status',
          label: 'Status'
        }
      ]}
    />
  );
}