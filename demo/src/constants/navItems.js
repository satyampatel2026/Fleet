import {
  FiHome, FiBriefcase, FiUsers, FiTruck, FiCalendar,
  FiMap, FiDroplet, FiTool, FiDollarSign, FiFileText,
  FiBarChart2, FiSettings,
} from 'react-icons/fi';
import { ROUTES } from './routes';

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: FiHome, path: ROUTES.DASHBOARD },
  { label: 'Companies', icon: FiBriefcase, path: ROUTES.COMPANIES },
  { label: 'Employees', icon: FiUsers, path: ROUTES.EMPLOYEES },
  { label: 'Drivers', icon: FiUsers, path: ROUTES.DRIVERS },
  { label: 'Vehicles', icon: FiTruck, path: ROUTES.VEHICLES },
  { label: 'Bookings', icon: FiCalendar, path: ROUTES.BOOKINGS },
  { label: 'Trips', icon: FiMap, path: ROUTES.TRIPS },
  { label: 'Fuel', icon: FiDroplet, path: ROUTES.FUEL },
  { label: 'Maintenance', icon: FiTool, path: ROUTES.MAINTENANCE },
  { label: 'Expenses', icon: FiDollarSign, path: ROUTES.EXPENSES },
  { label: 'Documents', icon: FiFileText, path: ROUTES.DOCUMENTS },
  { label: 'Reports', icon: FiBarChart2, path: ROUTES.REPORTS },
  { label: 'Settings', icon: FiSettings, path: ROUTES.SETTINGS },
];