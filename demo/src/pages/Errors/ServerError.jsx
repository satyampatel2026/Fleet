import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';
import Button from '../../components/ui/Button';

export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mx-auto">
          <FiAlertTriangle className="w-10 h-10 text-amber-500" />
        </div>
        <p className="text-6xl font-bold text-amber-600 mt-6">500</p>
        <h1 className="text-2xl font-bold mt-4">Server Error</h1>
        <p className="text-slate-500 mt-2 max-w-md">Something went wrong on our end. Please try again later.</p>
        <div className="flex gap-3 justify-center mt-6">
          <Button icon={FiRefreshCw} variant="secondary">Try Again</Button>
          <Link to="/dashboard"><Button icon={FiHome}>Back to Dashboard</Button></Link>
        </div>
      </motion.div>
    </div>
  );
}