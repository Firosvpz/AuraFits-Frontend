import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminPlans from "../pages/admin/AdminPlans";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/plans" element={<AdminPlans />} />
    </Routes>
  );
};

export default AdminRoutes;
