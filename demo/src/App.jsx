import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Dashboard from './pages/Dashboard/Dashboard';
import Vendors from "./pages/Company/Vendors";
// import PartnerPage from "./pages/Company/PartnerPage"
import EmployeePage from './pages/Employee/EmployeePage';
import DriverPage from './pages/Driver/DriverPage';
import VehiclePage from './pages/Vehicle/VehiclePage';
import BookingPage from './pages/Booking/BookingPage';
import TripPage from './pages/Trip/TripPage';
import FuelPage from './pages/Fuel/FuelPage';
import MaintenancePage from './pages/Maintenance/MaintenancePage';
import ExpensePage from './pages/Expense/ExpensePage';
import DocumentsPage from './pages/Documents/DocumentsPage';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import Profile from './pages/Profile/Profile';
import NotificationsPage from './pages/Notifications/NotificationsPage';
import NotFound from './pages/Errors/NotFound';
import Forbidden from './pages/Errors/Forbidden';
import ServerError from './pages/Errors/ServerError';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendors" element={<Vendors />} />
        {/* <Route path="/partners" element={<PartnerPage />} /> */}
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/drivers" element={<DriverPage />} />
        <Route path="/vehicles" element={<VehiclePage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/trips" element={<TripPage />} />
        <Route path="/fuel" element={<FuelPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/expenses" element={<ExpensePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      <Route path="/403" element={<Forbidden />} />
      <Route path="/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}