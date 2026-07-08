import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShield, FiHome } from 'react-icons/fi';
import Button from '../../components/ui/Button';

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mx-auto">
          <FiShield className="w-10 h-10 text-rose-500" />
        </div>
        <p className="text-6xl font-bold text-rose-600 mt-6">403</p>
        <h1 className="text-2xl font-bold mt-4">Access Denied</h1>
        <p className="text-slate-500 mt-2 max-w-md">You don't have permission to access this resource.</p>
        <Link to="/dashboard"><Button icon={FiHome} className="mt-6">Back to Dashboard</Button></Link>
      </motion.div>
    </div>
  );
}