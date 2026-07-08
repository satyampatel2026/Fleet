import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';
import Button from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <p className="text-8xl font-bold text-brand-600">404</p>
        <h1 className="text-2xl font-bold mt-4">Page Not Found</h1>
        <p className="text-slate-500 mt-2 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard"><Button icon={FiHome} className="mt-6">Back to Dashboard</Button></Link>
      </motion.div>
    </div>
  );
}