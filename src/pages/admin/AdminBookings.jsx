import React from "react";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import Bookings from "../../components/admin/bookings/Bookings";

const AdminBookings = () => {
  return (
    <div className="flex h-screen  text-white overflow-hidden">
      <AdminSidebar />
      <Bookings />
    </div>
  );
};

export default AdminBookings;
