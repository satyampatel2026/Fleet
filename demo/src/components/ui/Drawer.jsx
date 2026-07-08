import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

export default function Drawer({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><FiX className="w-5 h-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100%-73px)]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}