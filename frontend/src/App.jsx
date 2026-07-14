import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./components/Dashboard";
import Users from "./pages/user";
import ServiceCategory from "./pages/servicecategory";
import AdminLogin from "./pages/AdminLogin";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminResetPassword from "./pages/AdminResetPassword";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";


function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      {/* Public admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/forgot-password"
        element={<AdminForgotPassword />}
      />
      <Route
        path="/admin/reset-password/:token"
        element={<AdminResetPassword />}
      />

      {/* Protected admin routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="servicecategory" element={<ServiceCategory />} />
        </Route>
      </Route>

      {/* Optional: catch unknown routes */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default App;