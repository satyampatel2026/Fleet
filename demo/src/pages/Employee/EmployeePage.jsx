import { FiUsers, FiUserCheck, FiUserMinus, FiShield } from 'react-icons/fi';
import ListPageTemplate from '../ListPageTemplate';
import { employees } from '../../utils/staticData';

export default function EmployeePage() {
  return (
    <ListPageTemplate
      title="Employees" subtitle="Manage staff, departments, roles and permissions"
      addLabel="Add Employee"
      stats={[
        { title: 'Total Staff', value: 312, icon: FiUsers, color: 'brand' },
        { title: 'Active', value: 298, icon: FiUserCheck, color: 'emerald' },
        { title: 'On Leave', value: 14, icon: FiUserMinus, color: 'amber' },
        { title: 'Admins', value: 8, icon: FiShield, color: 'rose' },
      ]}
      columns={[
        { key: 'name', label: 'Name' }, { key: 'dept', label: 'Department' },
        { key: 'designation', label: 'Designation' }, { key: 'role', label: 'Role' },
        { key: 'email', label: 'Email' }, { key: 'status', label: 'Status' },
      ]}
      data={employees}
      filters={[
        { label: 'Department', options: [{ value: '', label: 'All' }, { value: 'Operations', label: 'Operations' }, { value: 'HR', label: 'HR' }, { value: 'Finance', label: 'Finance' }] },
        { label: 'Role', options: [{ value: '', label: 'All' }, { value: 'Admin', label: 'Admin' }, { value: 'Manager', label: 'Manager' }] },
      ]}
      formFields={[
        { name: 'name', label: 'Full Name' }, { name: 'email', label: 'Email', type: 'email' },
        { name: 'dept', label: 'Department', type: 'select', options: [{ value: 'Operations', label: 'Operations' }, { value: 'HR', label: 'HR' }, { value: 'Finance', label: 'Finance' }, { value: 'IT', label: 'IT' }] },
        { name: 'designation', label: 'Designation' },
        { name: 'role', label: 'Role', type: 'select', options: [{ value: 'Admin', label: 'Admin' }, { value: 'Manager', label: 'Manager' }, { value: 'Staff', label: 'Staff' }] },
      ]}
      detailFields={[
        { key: 'name', label: 'Name' }, { key: 'dept', label: 'Department' },
        { key: 'designation', label: 'Designation' }, { key: 'role', label: 'Role' },
        { key: 'email', label: 'Email' }, { key: 'status', label: 'Status' },
      ]}
    />
  );
}