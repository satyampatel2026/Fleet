import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { FiAward } from "react-icons/fi";


import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiBriefcase, FiUsers, FiTruck, FiCalendar, FiMap,
  FiDroplet, FiTool, FiDollarSign, FiFileText, FiBarChart2,
  FiSettings, FiBell, FiX,
} from 'react-icons/fi';

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiHome },   

  {
    label: "Users",
    icon: FiUsers,
    children: [
      { to: "/vendors", label: "Partners" },
      { to: "/users", label: "Fleet Owners" },
    ],
  },

  { to: "/employees", label: "Employees", icon: FiBriefcase },
  { to: "/servicecategory", label: "Service Category", icon: FiUsers },
  { to: "/vehicles", label: "Vehicles", icon: FiTruck },
  { to: "/bookings", label: "Bookings", icon: FiCalendar },
  { to: "/trips", label: "Trips", icon: FiMap },
  { to: "/fuel", label: "Fuel", icon: FiDroplet },
  { to: "/maintenance", label: "Maintenance", icon: FiTool },
  { to: "/expenses", label: "Expenses", icon: FiDollarSign },
  { to: "/documents", label: "Documents", icon: FiFileText },
  { to: "/reports", label: "Reports", icon: FiBarChart2 },
  { to: "/notifications", label: "Notifications", icon: FiBell },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

export default function Sidebar({ open, onClose, dark }) {
  const [openMenus, setOpenMenus] = useState({});
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
    }`;

  const sidebar = (
    <aside className="flex flex-col h-full w-72 glass border-r border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
  <FiTruck size={22} color="white" />
</div>
           <div>
  <div className="flex items-center gap-2">
    <h1 className="font-bold text-lg text-slate-900 dark:text-white">
      FleetPro
    </h1>
      <FiAward className="w-5 h-5 text-yellow-500" />
    <FiChevronRight className="w-4 h-4 text-brand-600" />
  </div>

  <p className="text-xs text-slate-500">
    Enterprise Admin
  </p>
</div>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <FiX className="w-5 h-5" />
        </button>
      </div>

<nav className="flex-1 px-4 space-y-1 overflow-y-auto">
  {navItems.map((item) => {
    if (item.children) {
      return (
        <div key={item.label}>
          <button
            onClick={() =>
              setOpenMenus((prev) => ({
                ...prev,
                [item.label]: !prev[item.label],
              }))
            }
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </div>

            {openMenus[item.label] ? (
              <FiChevronDown />
            ) : (
              <FiChevronRight />
            )}
          </button>

          {openMenus[item.label] && (
            <div className="ml-8 mt-1 space-y-1">
              {item.children.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  className={linkClass}
                  onClick={onClose}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.to}
        to={item.to}
        className={linkClass}
        onClick={onClose}
      >
        <item.icon className="w-[18px] h-[18px]" />
        {item.label}
      </NavLink>
    );
  })}
</nav>

      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white">
        <p className="text-sm font-semibold">Fleet Analytics Pro</p>
        <p className="text-xs opacity-80 mt-1">Upgrade for advanced reporting & live tracking</p>
        <button className="mt-3 w-full py-2 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-medium transition-colors">
          Learn More
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30">{sidebar}</div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
            <motion.div initial={{ x: -288 }} animate={{ x: 0 }} exit={{ x: -288 }}
              transition={{ type: 'spring', damping: 30 }} className="fixed inset-y-0 left-0 z-50 lg:hidden">
              {sidebar}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}