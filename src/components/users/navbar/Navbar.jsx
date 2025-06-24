"use client";

import { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../logo/LOgo";
import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";

function Navbar() {
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
    // Add logout animation
    const userSection = document.querySelector(".desktop-user-section");
    if (userSection) {
      // userSection.style.transform = "scale(0.9)"
      // userSection.style.opacity = "0.5"
    }

    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Update state immediately
    setUser(null);
    setShowDropdown(false);
    setCurrentPath("/");

    // Dispatch logout action to Redux
    try {
      const { logout } = await import("../../../redux/slices/authSlice");
      dispatch(logout());
    } catch (error) {
      console.error("Error dispatching logout:", error);
    }

    // Show logout success toast after state updates
    setTimeout(() => {
      const logoutMsg = document.createElement("div");
      logoutMsg.className = "login-success-toast";
      logoutMsg.textContent = "You have been logged out successfully.";
      logoutMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #ff4e50 0%, #f00000 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease-in-out;
        `;

      document.body.appendChild(logoutMsg);

      // Trigger animation
      requestAnimationFrame(() => {
        logoutMsg.style.opacity = "1";
        logoutMsg.style.transform = "translateX(0)";
      });

      // Remove toast after 3 seconds with fade out animation
      setTimeout(() => {
        logoutMsg.style.opacity = "0";
        logoutMsg.style.transform = "translateX(100%)";

        setTimeout(() => {
          if (logoutMsg.parentNode) {
            logoutMsg.remove();
          }
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
    { name: "Contact", path: "/contacts" },
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
    <nav className={`gym-glass-nav-container ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        <div className="navbar-inner">
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

          {/* Desktop Navigation - FIXED */}
          <div className="desktop-nav" style={{ display: "flex" }}>
            {navItems.map((item, index) => (
              <a
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`gym-glass-nav-link nav-link ${isActivePath(item.path) ? "active" : ""}`}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  opacity: 1, // Ensure initial visibility
                  transform: "translateY(0)", // Ensure initial position
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {item.name}
                <span className="nav-link-underline"></span>
              </a>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="desktop-auth" style={{ display: "flex" }}>
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
              <div className="desktop-user-section user-dropdown-container">
                <button
                  onClick={toggleDropdown}
                  className="user-profile-btn"
                  style={{
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <span className="user-name">{user?.name}</span>
                  <svg
                    className={`dropdown-arrow ${showDropdown ? "rotated" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* User Dropdown */}
                {showDropdown && (
                  <div className="user-dropdown show">
                    <div className="dropdown-content">
                      <button
                        onClick={() => handleDropdownNavigation("/profile")}
                        className="dropdown-item"
                      >
                        <svg
                          className="dropdown-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profile
                      </button>
                      {/* <button
                        onClick={() => handleDropdownNavigation("/settings")}
                        className="dropdown-item"
                      >
                        <svg
                          className="dropdown-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Settings
                      </button> */}
                      <div className="dropdown-divider"></div>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item logout"
                      >
                        <svg
                          className="dropdown-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
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
          <div className="mobile-menu-btn">
            <button
              onClick={toggleMenu}
              className="hamburger-btn"
              style={{
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <span className="sr-only">Open main menu</span>
              <div className={`hamburger-icon ${isOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`mobile-nav ${isOpen ? "mobile-nav-open" : "mobile-nav-closed"}`}
      >
        <div className="mobile-nav-content">
          {/* Mobile Navigation Links */}
          <div className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`gym-glass-nav-mobile-link mobile-nav-link ${isActivePath(item.path) ? "active" : ""}`}
                style={{
                  opacity: 1, // Ensure initial visibility
                  transform: "translateX(0)", // Ensure initial position
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Auth Section */}
          <div className="mobile-auth">
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
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <div className="user-avatar">
                    {user?.avatar ? (
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="avatar-img"
                      />
                    ) : (
                      <div className="avatar-fallback">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <div className="mobile-user-details">
                    <span className="mobile-user-name">{user?.name}</span>
                    <span className="mobile-user-email">{user?.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="mobile-menu-item"
                >
                  <svg
                    className="mobile-menu-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>    
                  Profile
                </button>
                {/* <button
                  onClick={() => handleNavigation("/settings")}
                  className="mobile-menu-item"
                >
                  <svg
                    className="mobile-menu-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </button> */}
                <button
                  onClick={handleLogout}
                  className="mobile-menu-item logout-mobile"
                >
                  <svg
                    className="mobile-menu-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <Login
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </nav>
  );
}

export default Navbar;
