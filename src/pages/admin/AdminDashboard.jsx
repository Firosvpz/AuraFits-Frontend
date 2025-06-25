"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "../../components/admin/sidebar/AdminSidebar";
import Dashboard from "../../components/admin/dashboard/Dashboard";

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-t-blue-500 border-r-purple-500 border-b-blue-500 border-l-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 w-16 h-16 border-4 border-t-purple-400 border-r-blue-400 border-b-purple-400 border-l-blue-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              AuraFits Dashboard
            </h2>
            <p className="text-gray-400 animate-pulse">
              Loading your analytics...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen  text-white overflow-hidden">
        <FloatingParticles />

        <AdminSidebar />

        <Dashboard />
      </div>
    </>
  );
};

export default AdminDashboard;
