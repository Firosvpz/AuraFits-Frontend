"use client";

import { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { userLogin, userRegister } from "../../../api/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/slices/authSlice";

const Login = ({ onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
  const modalRef = useRef(null);
  const formRef = useRef(null);
  //   console.log('formdata',formData);

  // Animation entrance effect with staggered phases
  useEffect(() => {
    setIsOpen(true);
    setTimeout(() => setAnimationPhase(1), 150);
    setTimeout(() => setAnimationPhase(2), 300);
  }, []);

  // Focus trap for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });

    if (errors[key]) {
      setErrors({ ...errors, [key]: null });
    }

    if (key === "password" && typeof value === "string") {
      updatePasswordStrength(value);
    }
  };

  const updatePasswordStrength = (password) => {
    const length = password.length;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);

    let strength = 0;
    if (length >= 8) strength += 25;
    if (hasSpecialChar) strength += 25;
    if (hasNumber) strength += 25;
    if (hasUpper && hasLower) strength += 25;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return "Strong password";
    if (passwordStrength >= 50) return "Good password";
    if (passwordStrength >= 25) return "Weak password";
    return "";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "bg-green-500";
    if (passwordStrength >= 50) return "bg-yellow-500";
    if (passwordStrength >= 25) return "bg-yellow-400";
    return "bg-red-500";
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleMode = (mode) => {
    setIsSignUp(mode === "signup");
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    });
  };

  const handleClose = () => {
    setAnimationPhase(1);
    setTimeout(() => {
      setAnimationPhase(0);
      setIsOpen(false);
    }, 200);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const showSuccessMessage = (message) => {
    const successMsg = document.createElement("div");
    successMsg.className =
      "fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-[1002] animate-slide-in-right";
    successMsg.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(successMsg);

    setTimeout(() => {
      successMsg.style.transform = "translateX(100%)";
      successMsg.style.opacity = "0";
      setTimeout(() => successMsg.remove(), 300);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear any previous errors

    try {
      let result;

      if (isSignUp) {
        // Register new user
        result = await userRegister(
          formData.name,
          formData.email,
          formData.password,
        );
      } else {
        // Login existing user
        result = await userLogin(formData.email, formData.password);
      }

      if (result) {
        // Handle successful authentication
        const userData = {
          name: result.data.user?.name || result.data.name || formData.name,
          email: result.data.user?.email || result.data.email || formData.email,
          avatar:
            result.data.user?.avatar || "/public/assets/trainers/trainee-1.jpg",
          token: result.data.token || result.data.accessToken,
          ...result.data.user,
        };

        // Dispatch Redux action
        dispatch(
          login({
            user: userData,
            token: result.data.token,
          }),
        );

        // Store in localStorage
        localStorage.setItem("authToken", result.data.token);
        localStorage.setItem("userData", JSON.stringify(userData));

        // Show success message
        const successMessage = isSignUp
          ? "Account created successfully!"
          : `Welcome back, ${userData.name}!`;

        showSuccessMessage(successMessage);

        // Call success callback and close modal
        setTimeout(() => {
          onLoginSuccess(userData);
          handleClose();
        }, 800);
      } else {
        // Handle API errors
        setErrors({
          general: result.error || "Authentication failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={` inset-0 z-[1000] flex items-center justify-center p-4 transition-all duration-500 ease-out  ${
        isOpen
          ? "bg-black/80 backdrop-blur-xl opacity-100 visible pointer-events-auto"
          : "bg-black/0 backdrop-blur-none opacity-0 invisible pointer-events-none"
      }`}
      style={{
        background: isOpen
          ? "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)"
          : "transparent",
      }}
    >
      <div
        className={`relative w-full max-w-md transition-all duration-700 ease-out transform-gpu  ${
          animationPhase >= 1
            ? "scale-100 translate-y-0 opacity-100 rotate-0"
            : "scale-75 translate-y-16 opacity-0 rotate-3"
        } ${isSignUp ? "max-h-[90vh]" : "max-h-[80vh]"} overflow-hidden`}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        {/* Animated Background with Glow Effect */}
        <div className="absolute inset-0 bg-black rounded-3xl shadow-2xl scrollbar-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-400/5 rounded-3xl shadow-xl" />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-gray-800 rounded-3xl" /> */}
          {/* <div className="absolute inset-0 border border-yellow-500/20 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.15)]" /> */}

          {/* Animated Particles */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-8 right-8 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-40" />
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce opacity-50" />
        </div>

        {/* Close Button with Enhanced Animation */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-red-500/20 border border-yellow-500/30 hover:border-red-500/50 rounded-full text-gray-400 hover:text-red-400 transition-all duration-300 hover:rotate-90 hover:scale-110 backdrop-blur-sm group"
          aria-label="Close"
        >
          <X className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/0 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <div className="relative z-10 overflow-y-auto max-h-full">
          {/* Header with Enhanced Toggle */}
          <div
            className={`text-center px-8 pt-8 pb-6 transition-all duration-700 delay-100 transform-gpu ${
              animationPhase >= 2
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="relative">
              <h2
                id="login-title"
                className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-gradient-x"
              >
                AuraFits
              </h2>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60" />
            </div>

            <p className="text-gray-400 text-sm mb-8 animate-fade-in-up">
              {isSignUp
                ? "Join our fitness community today"
                : "Sign in to continue your fitness journey"}
            </p>

            {/* Enhanced Toggle Buttons */}
            <div className="relative bg-black/60 rounded-2xl p-1.5 border border-yellow-500/20 backdrop-blur-sm">
              <div className="absolute inset-1.5 bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 rounded-xl opacity-50" />

              {/* Sliding Background */}
              <div
                className={`absolute top-1.5 w-[calc(50%-6px)] h-[calc(100%-12px)] bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl shadow-lg shadow-yellow-500/25 transition-all duration-500 ease-out ${
                  isSignUp ? "translate-x-[calc(100%+6px)]" : "translate-x-0"
                }`}
              />

              <div className="relative flex">
                <button
                  type="button"
                  onClick={() => toggleMode("login")}
                  disabled={isLoading}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-500 relative z-10 ${
                    !isSignUp
                      ? "text-black shadow-lg"
                      : "text-gray-400 hover:text-white"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="relative z-10">Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleMode("signup")}
                  disabled={isLoading}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-500 relative z-10 ${
                    isSignUp
                      ? "text-black shadow-lg"
                      : "text-gray-400 hover:text-white"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <span className="relative z-10">Sign Up</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form with Staggered Animations */}
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            noValidate
            className={`px-8 pb-8 space-y-4 transition-all duration-700 delay-200 transform-gpu ${
              animationPhase >= 2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            } ${isSignUp ? "space-y-3" : "space-y-4"}`}
          >
            {/* Error Banner with Animation */}
            {errors.general && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-shake backdrop-blur-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 animate-pulse" />
                {errors.general}
              </div>
            )}

            {/* Name Field (Signup only) with Enhanced Animation */}
            {isSignUp && (
              <div className="space-y-2 animate-slide-in-left">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 ml-1"
                >
                  Full Name
                </label>
                <div
                  className={`relative group ${errors.name ? "animate-shake" : ""}`}
                >
                  <User
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                      focusedField === "name"
                        ? "text-yellow-400 scale-110"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    autoComplete="name"
                    className={`w-full pl-12 pr-4 py-3.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                      errors.name
                        ? "border-red-500 bg-red-500/5 animate-pulse"
                        : focusedField === "name"
                          ? "border-yellow-400 bg-black/80 shadow-lg shadow-yellow-500/10"
                          : "border-yellow-500/20 hover:border-yellow-500/40"
                    }`}
                  />
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-500 ${
                      focusedField === "name" ? "w-full" : "w-0"
                    }`}
                  />
                  {focusedField === "name" && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/5 to-yellow-400/5 animate-pulse" />
                  )}
                </div>
                {errors.name && (
                  <div className="flex items-center gap-2 text-red-400 text-xs ml-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3 animate-pulse" />
                    {errors.name}
                  </div>
                )}
              </div>
            )}

            {/* Email Field with Enhanced Styling */}
            <div
              className="space-y-2 animate-slide-in-left"
              style={{ animationDelay: "100ms" }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 ml-1"
              >
                Email Address
              </label>
              <div
                className={`relative group ${errors.email ? "animate-shake" : ""}`}
              >
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    focusedField === "email"
                      ? "text-yellow-400 scale-110"
                      : "text-gray-400"
                  }`}
                />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  autoComplete="email"
                  className={`w-full pl-12 pr-4 py-3.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                    errors.email
                      ? "border-red-500 bg-red-500/5 animate-pulse"
                      : focusedField === "email"
                        ? "border-yellow-400 bg-black/80 shadow-lg shadow-yellow-500/10"
                        : "border-yellow-500/20 hover:border-yellow-500/40"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-500 ${
                    focusedField === "email" ? "w-full" : "w-0"
                  }`}
                />
                {focusedField === "email" && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/5 to-yellow-400/5 animate-pulse" />
                )}
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 text-red-400 text-xs ml-1 animate-fade-in">
                  <AlertCircle className="w-3 h-3 animate-pulse" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Field with Enhanced Effects */}
            <div
              className="space-y-2 animate-slide-in-left"
              style={{ animationDelay: "200ms" }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 ml-1"
              >
                Password
              </label>
              <div
                className={`relative group ${errors.password ? "animate-shake" : ""}`}
              >
                <Lock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    focusedField === "password"
                      ? "text-yellow-400 scale-110"
                      : "text-gray-400"
                  }`}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className={`w-full pl-12 pr-12 py-3.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                    errors.password
                      ? "border-red-500 bg-red-500/5 animate-pulse"
                      : focusedField === "password"
                        ? "border-yellow-400 bg-black/80 shadow-lg shadow-yellow-500/10"
                        : "border-yellow-500/20 hover:border-yellow-500/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-110"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-500 ${
                    focusedField === "password" ? "w-full" : "w-0"
                  }`}
                />
                {focusedField === "password" && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/5 to-yellow-400/5 animate-pulse" />
                )}
              </div>

              {/* Enhanced Password Strength (Signup only) */}
              {isSignUp && formData.password && (
                <div className="space-y-2 animate-fade-in">
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-yellow-500/20">
                    <div
                      className={`h-full transition-all duration-700 ease-out ${getPasswordStrengthColor()} shadow-lg`}
                      style={{
                        width: `${passwordStrength}%`,
                        boxShadow:
                          passwordStrength > 0
                            ? "0 0 10px rgba(234, 179, 8, 0.3)"
                            : "none",
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 animate-fade-in">
                      {getPasswordStrengthText()}
                    </span>
                    <span className="text-yellow-400 font-semibold animate-bounce">
                      {passwordStrength}%
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <div className="flex items-center gap-2 text-red-400 text-xs ml-1 animate-fade-in">
                  <AlertCircle className="w-3 h-3 animate-pulse" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password (Signup only) */}
            {isSignUp && (
              <div
                className="space-y-2 animate-slide-in-left"
                style={{ animationDelay: "300ms" }}
              >
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300 ml-1"
                >
                  Confirm Password
                </label>
                <div
                  className={`relative group ${errors.confirmPassword ? "animate-shake" : ""}`}
                >
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                      focusedField === "confirmPassword"
                        ? "text-yellow-400 scale-110"
                        : "text-gray-400"
                    }`}
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateFormData("confirmPassword", e.target.value)
                    }
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    autoComplete="new-password"
                    className={`w-full pl-12 pr-12 py-3.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-500/5 animate-pulse"
                        : focusedField === "confirmPassword"
                          ? "border-yellow-400 bg-black/80 shadow-lg shadow-yellow-500/10"
                          : "border-yellow-500/20 hover:border-yellow-500/40"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:scale-110"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all duration-500 ${
                      focusedField === "confirmPassword" ? "w-full" : "w-0"
                    }`}
                  />
                  {focusedField === "confirmPassword" && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/5 to-yellow-400/5 animate-pulse" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-2 text-red-400 text-xs ml-1 animate-fade-in">
                    <AlertCircle className="w-3 h-3 animate-pulse" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}

            {/* Remember Me & Forgot Password (Login only) */}
            {!isSignUp && (
              <div
                className="flex items-center justify-between py-2 animate-fade-in-up"
                style={{ animationDelay: "400ms" }}
              >
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        updateFormData("rememberMe", e.target.checked)
                      }
                      disabled={isLoading}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded-md transition-all duration-300 flex items-center justify-center ${
                        formData.rememberMe
                          ? "bg-yellow-500 border-yellow-500 shadow-lg shadow-yellow-500/25"
                          : "border-gray-400 group-hover:border-yellow-500"
                      }`}
                    >
                      {formData.rememberMe && (
                        <CheckCircle2 className="w-3 h-3 text-black animate-scale-in" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  disabled={isLoading}
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-all duration-300 relative group"
                >
                  Forgot Password?
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                </button>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold py-4 rounded-xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-6 group animate-fade-in-up"
              style={{ animationDelay: "500ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/20 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isLoading ? (
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSignUp ? "Create Account" : "Sign In"}
                  <div className="w-0 group-hover:w-5 transition-all duration-300 overflow-hidden">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-left {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
