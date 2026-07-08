import { FiUser, FiMail, FiPhone, FiLock, FiCamera } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function Profile() {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Manage your account settings and preferences" showExport={false} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardBody className="text-center py-8">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <FiUser className="w-10 h-10 text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center border border-slate-100 dark:border-slate-700">
                <FiCamera className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <h2 className="text-xl font-bold mt-4">Admin User</h2>
            <p className="text-sm text-slate-500">Super Admin</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
            </div>
            <div className="mt-6 space-y-2 text-left">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <FiMail className="w-4 h-4" /> admin@fleetpro.com
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <FiPhone className="w-4 h-4" /> +91 98765 43210
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Personal Information" />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" defaultValue="Admin" />
              <Input label="Last Name" defaultValue="User" />
              <Input label="Email" type="email" defaultValue="admin@fleetpro.com" />
              <Input label="Phone" defaultValue="+91 98765 43210" />
              <Input label="Department" defaultValue="Administration" />
              <Input label="Designation" defaultValue="Super Admin" />
            </div>
            <div className="flex justify-end mt-6">
              <Button>Save Profile</Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Change Password" subtitle="Update your account password" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
            <Input label="Current Password" type="password" icon={FiLock} />
            <Input label="New Password" type="password" icon={FiLock} />
            <Input label="Confirm Password" type="password" icon={FiLock} />
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="secondary">Update Password</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}