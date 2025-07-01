"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../logo/Logo";
import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user: reduxUser } = useSelector(
    (state) => state.auth,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [animationsApplied, setAnimationsApplied] = useState(false);

  // Set current path on client-side
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);

          // Update Redux state
          dispatch(
            login({
              user: parsedUser,
              token: token,
            }),
          );

          // Update local state
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
      }

      setIsInitializing(false);
    };

    initializeAuth();
  }, [dispatch]);

  // Sync local state with Redux state
  useEffect(() => {
    if (isAuthenticated && reduxUser) {
      setUser(reduxUser);
    }
  }, [isAuthenticated, reduxUser]);

  // Handle scroll for background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".user-dropdown-container")) {
        setShowDropdown(false);
      }
    };

    // Add escape key handler
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showDropdown]);

  // Animate desktop links on mount with stagger effect - FIXED
  useEffect(() => {
    // Only apply animations once and only after initialization
    if (!isInitializing && !animationsApplied) {
      const links = document.querySelectorAll(".gym-glass-nav-link");

      if (links.length > 0) {
        links.forEach((link, index) => {
          // Make sure links are visible first
          link.style.opacity = "1";
          link.style.transform = "translateY(0)";

          // Then apply animation
          link.style.opacity = "0";
          link.style.transform = "translateY(-20px)";

          setTimeout(
            () => {
              link.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
              link.style.opacity = "1";
              link.style.transform = "translateY(0)";
            },
            index * 100 + 200,
          );
        });

        setAnimationsApplied(true);
      }
    }
  }, [isInitializing, animationsApplied]);

  // Animate mobile links when menu opens
  useEffect(() => {
    if (isOpen) {
      const mobileLinks = document.querySelectorAll(
        ".gym-glass-nav-mobile-link",
      );
      mobileLinks.forEach((link, index) => {
        // Make sure links are visible first
        link.style.opacity = "1";
        link.style.transform = "translateX(0)";

        // Then apply animation
        link.style.opacity = "0";
        link.style.transform = "translateX(-30px)";

        setTimeout(() => {
          link.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
          link.style.opacity = "1";
          link.style.transform = "translateX(0)";
        }, index * 80);
      });
    }
  }, [isOpen]);

  // Toggle mobile menu with animation
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Toggle user dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    setCurrentPath(path);
    setIsOpen(false);
    // Add your navigation logic here (e.g., window.location.href = path)
    window.location.href = path;
  };

  // Handle dropdown item clicks
  const handleDropdownNavigation = (path) => {
    setCurrentPath(path);
    setShowDropdown(false);
    // Add your navigation logic here
    window.location.href = path;
  };

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
    setShowDropdown(false); // Close dropdown after login

    // Optional: Show success message
    const successMsg = document.createElement("div");
    successMsg.className = "login-success-toast";
    successMsg.textContent = `Welcome back, ${userData.name}!`;
    document.body.appendChild(successMsg);

    setTimeout(() => {
      successMsg.remove();
    }, 3000);
  };

  // Handle logout with animation

  // Handle logout with animation
  const handleLogout = async () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");

  setUser(null);
  setShowDropdown(false);

  try {
    const { logout } = await import("../../../redux/slices/authSlice");
    dispatch(logout());
  } catch (error) {
    console.error("Error dispatching logout:", error);
  }

  // Navigate to home page
  navigate("/");

  // Optional: Toast
  setTimeout(() => {
    const logoutMsg = document.createElement("div");
    logoutMsg.className = "login-success-toast";
    logoutMsg.textContent = "You have been logged out successfully.";
    document.body.appendChild(logoutMsg);

    requestAnimationFrame(() => {
      logoutMsg.style.opacity = "1";
      logoutMsg.style.transform = "translateX(0)";
    });

    setTimeout(() => {
      logoutMsg.style.opacity = "0";
      logoutMsg.style.transform = "translateX(100%)";
      setTimeout(() => {
        logoutMsg.remove();
      }, 300);
    }, 2000);
  }, 100);
};


  // Check if current path is active
  const isActivePath = (path) => {
    return currentPath === path;
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Trainers", path: "/trainers" },
    { name: "Memberships", path: "/memberships" },
    { name: "Facilities", path: "/facilities" },
    { name: "Contacts", path: "/contacts" },
  ];

  // Add this useEffect to reset dropdown when user changes
  useEffect(() => {
    setShowDropdown(false);
  }, [user]);

  // Show loading state while initializing
  if (isInitializing) {
    return (
      <nav
        className={`gym-glass-nav-container ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="navbar-content">
          <div className="navbar-inner">
            <div className="logo-container">
              <Logo />
            </div>
            <div className="desktop-nav">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="gym-glass-nav-link nav-link-placeholder"
                ></div>
              ))}
            </div>
            <div className="desktop-auth">
              <div className="auth-buttons-placeholder"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/30 backdrop-blur-md border-b border-white/20"
          : "bg-black/10 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo with hover animation */}
          <div
            onClick={() => handleNavigation("/")}
            className="logo-container"
            style={{
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`gym-glass-nav-link nav-link relative overflow-hidden cursor-pointer px-2 lg:px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 hover:text-yellow-400 hover:-translate-y-0.5 ${
                  isActivePath(item.path) ? "text-yellow-400" : "text-white"
                }`}
                style={{
                  opacity: 1,
                  transform: "translateY(0)",
                }}
              >
                {item.name}
                <span className="nav-link-underline absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {!user ? (
             <div className="auth-buttons">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="login-btn"
                  style={{
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="desktop-user-section user-dropdown-container relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 px-2 lg:px-3 py-2 bg-transparent border border-white/10 rounded-lg text-white hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="hidden lg:block text-sm font-medium">{user?.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown */}
                {showDropdown && (
                  <div className="user-dropdown show absolute top-full right-0 mt-2 w-48 lg:w-56 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-white/20">
                      <p className="font-medium text-white text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => handleDropdownNavigation("/profile")}
                        className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors duration-200 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profile
                      </button>
                      <div className="h-px bg-white/20 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/20 transition-colors duration-200 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-white hover:text-yellow-400 hover:bg-white/10 transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              <div
                className={`hamburger-icon ${isOpen ? "open" : ""} w-6 h-6 flex flex-col justify-center items-center`}
              >
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10 px-3 sm:px-4 py-4">
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`gym-glass-nav-mobile-link mobile-nav-link block px-4 py-3 rounded-lg text-base font-medium cursor-pointer transition-all duration-300 hover:bg-white/10 hover:text-yellow-400 ${
                  isActivePath(item.path) ? "text-yellow-400 bg-white/10" : "text-white"
                }`}
                style={{
                  opacity: 1,
                  transform: "translateX(0)",
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Auth Section */}
          <div className="mt-6 pt-4 border-t border-white/20">
            {!user ? (
               <div className="mobile-auth-buttons">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="mobile-login-btn"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-medium text-white">{user?.name}</p>
                    <p className="text-sm text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className="w-full px-4 py-3 text-left text-base text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-base text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-success-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10000;
          font-size: 14px;
          font-weight: 500;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.3s ease-in-out;
          animation: slideInToast 0.3s ease-out forwards;
        }

        .logout-toast {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        @keyframes slideInToast {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .nav-link-underline {
          transition: width 0.3s ease;
        }

        .nav-link:hover .nav-link-underline {
          width: 100%;
        }

        @media (max-width: 480px) {
          .xs\:block {
            display: block;
          }
        }

        @media (max-width: 360px) {
          .xs\:block {
            display: none;
          }
        }
      `}</style>

       {/* Login Modal */}
      {showLoginModal && (
        <Login
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </nav>
  )
}

export default Navbar;
