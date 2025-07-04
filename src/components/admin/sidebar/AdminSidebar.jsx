import React, { useState, useEffect } from "react";
import Logo from "../../users/logo/Logo";
import {
  Users,
  Calendar,
  TrendingUp,
  Activity,
  BarChart2,
  Grid,
  Settings,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigationItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: Grid,
      badge: null,
      route: "/admin/dashboard",
    },
    {
      id: "users",
      name: "Users",
      icon: Users,
      badge: null,
      route: "/admin/users",
    },
    {
      id: "bookings",
      name: "Bookings",
      icon: Calendar,
      badge: null,
      route: "/admin/bookings",
    },
    {
      id: "plans",
      name: "Plans",
      icon: Activity,
      badge: null,
      route: "/admin/plans",
    },
  ];

  // Sync active tab with current route
  useEffect(() => {
    const currentItem = navigationItems.find((item) =>
      location.pathname.startsWith(item.route),
    );
    setActiveTab(currentItem ? currentItem.id : "dashboard");
  }, [location.pathname]);

  const handleNavigation = (route, itemId) => {
    setActiveTab(itemId);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/admin");
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 transition-all duration-500 ease-in-out transform ${
        sidebarOpen ? "w-72" : "w-20"
      } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="h-full glassmorphism border-r border-gray-700">
        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-700">
          <div
            className={`flex items-center transition-all duration-300 ${
              sidebarOpen ? "space-x-3" : "justify-center"
            }`}
          >
            {sidebarOpen && (
              <div className="animate-slideInRight">
                <Logo />
                {/* <p className="text-xs text-gray-400 ">Admin Dashboard</p> */}
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 ${
                sidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4 py-6">
          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.route, item.id)}
                className={`
                  flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 group
                  ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                  ${!sidebarOpen && "justify-center"}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    sidebarOpen && "mr-3"
                  } transition-transform duration-200 group-hover:scale-110`}
                />
                {sidebarOpen && (
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{item.name}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="mt-8 pt-6 border-t ">
            <div
              className={`flex items-center ${
                sidebarOpen ? "space-x-3" : "justify-center"
              } p-3 rounded-xl  hover:bg-gray-700 transition-colors duration-200 cursor-pointer`}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-700 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
              </div>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Admin
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    admin@aurafits.com
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className={`flex items-center w-full mt-4 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-xl transition-all duration-200 ${
                !sidebarOpen && "justify-center"
              }`}
            >
              <LogOut className={`w-5 h-5 ${sidebarOpen && "mr-3"}`} />
              {sidebarOpen && <span>Log out</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
