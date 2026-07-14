import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute() {
  const token = localStorage.getItem("adminToken");
  const storedUser = localStorage.getItem("adminUser");

  let adminUser = null;

  try {
    adminUser = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    console.error("Invalid admin user data:", error);
  }

  const role =
    adminUser?.role_name ||
    adminUser?.role ||
    "";

  const isAdmin =
    role.toUpperCase() === "ADMIN";

  if (!token || !isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
}