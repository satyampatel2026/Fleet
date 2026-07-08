import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <Outlet />;
}