import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
// import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

// Auth
// import Login from '../pages/Authentication/Login';
// import ForgotPassword from '../pages/Authentication/ForgotPassword';
// import ResetPassword from '../pages/Authentication/ResetPassword';

// Pages
// import Dashboard from '../pages/Dashboard/Dashboard';
// import CompanyList from '../pages/Company/CompanyList';
// import EmployeeList from '../pages/Employee/EmployeeList';
// import DriverList from '../pages/Driver/DriverList';
// import VehicleList from '../pages/Vehicle/VehicleList';
// import BookingList from '../pages/Booking/BookingList';
// import TripList from '../pages/Trip/TripList';
// import FuelList from '../pages/Fuel/FuelList';
// import MaintenanceList from '../pages/Maintenance/MaintenanceList';
// import ExpenseList from '../pages/Expense/ExpenseList';
// import DocumentsList from '../pages/Documents/DocumentsList';
// import Reports from '../pages/Reports/Reports';
// import Settings from '../pages/Settings/Settings';
// import Profile from '../pages/Profile/Profile';
// import NotFound from '../pages/Authentication/NotFound';
// import Forbidden from '../pages/Authentication/Forbidden';
// import ServerError from '../pages/Authentication/ServerError';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.COMPANIES} element={<CompanyList />} />
          <Route path={ROUTES.EMPLOYEES} element={<EmployeeList />} />
          <Route path={ROUTES.DRIVERS} element={<DriverList />} />
          <Route path={ROUTES.VEHICLES} element={<VehicleList />} />
          <Route path={ROUTES.BOOKINGS} element={<BookingList />} />
          <Route path={ROUTES.TRIPS} element={<TripList />} />
          <Route path={ROUTES.FUEL} element={<FuelList />} />
          <Route path={ROUTES.MAINTENANCE} element={<MaintenanceList />} />
          <Route path={ROUTES.EXPENSES} element={<ExpenseList />} />
          <Route path={ROUTES.DOCUMENTS} element={<DocumentsList />} />
          <Route path={ROUTES.REPORTS} element={<Reports />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Route>
      </Route>

      <Route path={ROUTES.FORBIDDEN} element={<Forbidden />} />
      <Route path={ROUTES.SERVER_ERROR} element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}