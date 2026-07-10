import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "./layout/MainLayout";
import Dashboard from "./components/Dashboard";
import Vendors from "./pages/vendor";
import Users from "./pages/user";
import ServiceCategory from "./pages/servicecategory";

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/users" element={<Users />} />
        <Route path="/servicecategory" element={<ServiceCategory/>} />
      </Route>
    </Routes>
  );
}

export default App
