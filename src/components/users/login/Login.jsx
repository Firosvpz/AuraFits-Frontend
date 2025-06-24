"use client"

import { useState, useEffect, useRef } from "react"
import { User, Mail, Lock, Eye, EyeOff, X, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { userLogin, userRegister } from "../../../api/UserApi"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../../redux/slices/authSlice"

const Login = ({ onClose, onLoginSuccess }) => {
  const dispatch = useDispatch()
  const { isAuthenticated, token } = useSelector((state) => state.auth)

  const [isOpen, setIsOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [animationPhase, setAnimationPhase] = useState(0)
  const modalRef = useRef(null)
  const formRef = useRef(null)

  // Animation entrance effect with staggered phases
  useEffect(() => {
    setIsOpen(true)
    setTimeout(() => setAnimationPhase(1), 150)
    setTimeout(() => setAnimationPhase(2), 300)
  }, [])

  // Focus trap for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose()
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value })

    if (errors[key]) {
      setErrors({ ...errors, [key]: null })
    }

    if (key === "password" && typeof value === "string") {
      updatePasswordStrength(value)
    }
  }

  const updatePasswordStrength = (password) => {
    const length = password.length
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)

    let strength = 0
    if (length >= 8) strength += 25
    if (hasSpecialChar) strength += 25
    if (hasNumber) strength += 25
    if (hasUpper && hasLower) strength += 25

    setPasswordStrength(strength)
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return "Strong"
    if (passwordStrength >= 50) return "Good"
    if (passwordStrength >= 25) return "Weak"
    return ""
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "bg-green-500"
    if (passwordStrength >= 50) return "bg-yellow-500"
    if (passwordStrength >= 25) return "bg-yellow-400"
    return "bg-red-500"
  }

  const validateForm = () => {
    const newErrors = {}

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    // Only validate phone number for signup
    if (isSignUp) {
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required"
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Phone number must be 10 digits"
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const toggleMode = (mode) => {
    setIsSignUp(mode === "signup")
    setErrors({})
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      rememberMe: false,
    })
    setPasswordStrength(0)
  }

  const handleClose = () => {
    setAnimationPhase(1)
    setTimeout(() => {
      setAnimationPhase(0)
      setIsOpen(false)
    }, 200)
    setTimeout(() => {
      onClose()
    }, 400)
  }

  const showSuccessMessage = (message) => {
    const successMsg = document.createElement("div")
    successMsg.className =
      "fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-[1002] animate-slide-in-right"
    successMsg.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
      </div>
    `
    document.body.appendChild(successMsg)

    setTimeout(() => {
      successMsg.style.transform = "translateX(100%)"
      successMsg.style.opacity = "0"
      setTimeout(() => successMsg.remove(), 300)
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({}) // Clear any previous errors

    try {
      let result

      if (isSignUp) {
        // Register new user
        console.log("Attempting registration with:", {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
        })

        result = await userRegister(formData.name, formData.email, formData.password, formData.phoneNumber)
        console.log("Registration result:", result)

        // Check if registration was successful
        if (result && (result.success || result.data)) {
          // If registration successful but no token, try to login automatically
          if (!result.data?.token && !result.data?.accessToken) {
            console.log("Registration successful, attempting auto-login...")
            try {
              const loginResult = await userLogin(formData.email, formData.password)
              console.log("Auto-login result:", loginResult)
              result = loginResult
            } catch (loginError) {
              console.error("Auto-login failed:", loginError)
              // Show success message for registration but ask user to login manually
              showSuccessMessage("Account created successfully! Please sign in.")
              toggleMode("login")
              setIsLoading(false)
              return
            }
          }
        }
      } else {
        // Login existing user
        console.log("Attempting login with:", { email: formData.email })
        result = await userLogin(formData.email, formData.password)
        console.log("Login result:", result)
      }

      // Check if we have a valid result with token
      if (result && result.data && (result.data.token || result.data.accessToken || result.token)) {
        // Extract token from various possible locations
        const token = result.data.token || result.data.accessToken || result.token

        // Handle successful authentication
        const userData = {
          id: result.data.user?.id || result.data.user?._id || result.data.id,
          name: result.data.user?.name || result.data.name || formData.name,
          email: result.data.user?.email || result.data.email || formData.email,
          phoneNumber: result.data.user?.phoneNumber || formData.phoneNumber,
          isVerified: result.data.user?.isVerified || false,
          token: token,
          ...result.data.user,
        }

        console.log("Processing user data:", userData)

        // Dispatch Redux action
        dispatch(
          login({
            user: userData,
            token: token,
          }),
        )

        // Store in localStorage
        localStorage.setItem("authToken", token)
        localStorage.setItem("userData", JSON.stringify(userData))

        // Show success message
        const successMessage = isSignUp
          ? "Account created and logged in successfully!"
          : `Welcome back, ${userData.name}!`

        showSuccessMessage(successMessage)

        // Call success callback and close modal
        setTimeout(() => {
          if (onLoginSuccess) {
            onLoginSuccess(userData)
          }
          handleClose()
        }, 800)
      } else if (result && result.success && isSignUp) {
        // Registration successful but no auto-login
        showSuccessMessage("Account created successfully! Please sign in.")
        toggleMode("login")
      } else {
        // Handle API errors
        console.error("Authentication failed:", result)
        const errorMessage =
          result?.message ||
          result?.error ||
          result?.data?.message ||
          result?.data?.error ||
          (isSignUp ? "Registration failed. Please try again." : "Login failed. Please check your credentials.")

        setErrors({
          general: errorMessage,
        })
      }
    } catch (error) {
      console.error("Authentication error:", error)

      // Handle different types of errors
      let errorMessage = "Network error. Please check your connection and try again."

      if (error.response) {
        // Server responded with error status
        errorMessage =
          error.response.data?.message || error.response.data?.error || `Server error: ${error.response.status}`
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "No response from server. Please try again."
      } else if (error.message) {
        // Something else happened
        errorMessage = error.message
      }

      setErrors({
        general: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to check if user is successfully authenticated
  const isValidAuthResponse = (response) => {
    return (
      response &&
      response.data &&
      (response.data.token || response.data.accessToken || response.token) &&
      (response.data.user || response.data.name || response.data.email)
    )
  }

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center mt-[350px] justify-center p-4 transition-all duration-500 ease-out ${
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
        className={`relative w-full max-w-sm transition-all duration-700 ease-out transform-gpu ${
          animationPhase >= 1
            ? "scale-100 translate-y-0 opacity-100 rotate-0"
            : "scale-75 translate-y-16 opacity-0 rotate-3"
        } ${isSignUp ? "max-h-[95vh]" : "max-h-[85vh]"}`}
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
      >
        {/* Animated Background with Glow Effect */}
        <div className="absolute inset-0 bg-black rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-400/5 rounded-3xl shadow-xl" />
          {/* Animated Particles */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60" />
          <div className="absolute top-8 right-8 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-40" />
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce opacity-50" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-red-500/20 border border-yellow-500/30 hover:border-red-500/50 rounded-full text-gray-400 hover:text-red-400 transition-all duration-300 backdrop-blur-sm group"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 h-full overflow-y-auto">
          {/* Header */}
          <div
            className={`text-center px-6 pt-6 pb-4 transition-all duration-700 delay-100 transform-gpu ${
              animationPhase >= 2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="relative">
              <h2
                id="login-title"
                className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"
              >
                AuraFits
              </h2>
            </div>

            <p className="text-gray-400 text-sm mb-6">
              {isSignUp ? "Join our fitness community" : "Sign in to continue"}
            </p>

            {/* Toggle Buttons */}
            <div className="relative bg-black/60 rounded-2xl p-1.5 border border-yellow-500/20 backdrop-blur-sm">
              <div
                className={`absolute top-1.5 w-[calc(50%-6px)] h-[calc(100%-12px)] bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl shadow-lg transition-all duration-500 ease-out ${
                  isSignUp ? "translate-x-[calc(100%+6px)]" : "translate-x-0"
                }`}
              />

              <div className="relative flex">
                <button
                  type="button"
                  onClick={() => toggleMode("login")}
                  disabled={isLoading}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-500 relative z-10 ${
                    !isSignUp ? "text-black shadow-lg" : "text-gray-400 hover:text-white"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => toggleMode("signup")}
                  disabled={isLoading}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-500 relative z-10 ${
                    isSignUp ? "text-black shadow-lg" : "text-gray-400 hover:text-white"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            noValidate
            className={`px-6 pb-6 space-y-3 transition-all duration-700 delay-200 transform-gpu ${
              animationPhase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Error Banner */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs">{errors.general}</span>
              </div>
            )}

            {/* Name Field (Signup only) */}
            {isSignUp && (
              <div className="space-y-1">
                <label htmlFor="name" className="block text-xs font-medium text-gray-300 ml-1">
                  Full Name
                </label>
                <div className={`relative group ${errors.name ? "animate-shake" : ""}`}>
                  <User
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                      focusedField === "name" ? "text-yellow-400" : "text-gray-400"
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
                    className={`w-full pl-10 pr-3 py-2.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                      errors.name
                        ? "border-red-500 bg-red-500/5"
                        : focusedField === "name"
                          ? "border-yellow-400 bg-black/80"
                          : "border-yellow-500/20 hover:border-yellow-500/40"
                    }`}
                  />
                </div>
                {errors.name && (
                  <div className="flex items-center gap-1 text-red-400 text-xs ml-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </div>
                )}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-medium text-gray-300 ml-1">
                Email Address
              </label>
              <div className={`relative group ${errors.email ? "animate-shake" : ""}`}>
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                    focusedField === "email" ? "text-yellow-400" : "text-gray-400"
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
                  className={`w-full pl-10 pr-3 py-2.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                    errors.email
                      ? "border-red-500 bg-red-500/5"
                      : focusedField === "email"
                        ? "border-yellow-400 bg-black/80"
                        : "border-yellow-500/20 hover:border-yellow-500/40"
                  }`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 text-red-400 text-xs ml-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Phone Number Field (Signup only) */}
            {isSignUp && (
              <div className="space-y-1">
                <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-300 ml-1">
                  Phone Number
                </label>
                <div className={`relative group ${errors.phoneNumber ? "animate-shake" : ""}`}>
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                      focusedField === "phoneNumber" ? "text-yellow-400" : "text-gray-400"
                    }`}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                      updateFormData("phoneNumber", value)
                    }}
                    onFocus={() => setFocusedField("phoneNumber")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter phone number"
                    disabled={isLoading}
                    autoComplete="tel"
                    className={`w-full pl-10 pr-3 py-2.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                      errors.phoneNumber
                        ? "border-red-500 bg-red-500/5"
                        : focusedField === "phoneNumber"
                          ? "border-yellow-400 bg-black/80"
                          : "border-yellow-500/20 hover:border-yellow-500/40"
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <div className="flex items-center gap-1 text-red-400 text-xs ml-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phoneNumber}
                  </div>
                )}
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs font-medium text-gray-300 ml-1">
                Password
              </label>
              <div className={`relative group ${errors.password ? "animate-shake" : ""}`}>
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                    focusedField === "password" ? "text-yellow-400" : "text-gray-400"
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
                  className={`w-full pl-10 pr-10 py-2.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                    errors.password
                      ? "border-red-500 bg-red-500/5"
                      : focusedField === "password"
                        ? "border-yellow-400 bg-black/80"
                        : "border-yellow-500/20 hover:border-yellow-500/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-all duration-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength (Signup only) */}
              {isSignUp && formData.password && (
                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ease-out ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{getPasswordStrengthText()}</span>
                    <span className="text-yellow-400 font-semibold">{passwordStrength}%</span>
                  </div>
                </div>
              )}

              {errors.password && (
                <div className="flex items-center gap-1 text-red-400 text-xs ml-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password (Signup only) */}
            {isSignUp && (
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-300 ml-1">
                  Confirm Password
                </label>
                <div className={`relative group ${errors.confirmPassword ? "animate-shake" : ""}`}>
                  <Lock
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                      focusedField === "confirmPassword" ? "text-yellow-400" : "text-gray-400"
                    }`}
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-10 py-2.5 bg-black/60 border rounded-xl text-white placeholder-gray-500 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400 backdrop-blur-sm ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-500/5"
                        : focusedField === "confirmPassword"
                          ? "border-yellow-400 bg-black/80"
                          : "border-yellow-500/20 hover:border-yellow-500/40"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-all duration-300"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 text-red-400 text-xs ml-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}

            {/* Remember Me (Login only) */}
            {!isSignUp && (
              <div className="flex items-center justify-between py-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => updateFormData("rememberMe", e.target.checked)}
                      disabled={isLoading}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 border-2 rounded transition-all duration-300 flex items-center justify-center ${
                        formData.rememberMe
                          ? "bg-yellow-500 border-yellow-500"
                          : "border-gray-400 group-hover:border-yellow-500"
                      }`}
                    >
                      {formData.rememberMe && <CheckCircle2 className="w-2.5 h-2.5 text-black" />}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-white transition-colors duration-300">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  disabled={isLoading}
                  className="text-xs text-yellow-400 hover:text-yellow-300 transition-all duration-300"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold py-3 rounded-xl transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4 group"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Please wait...</span>
                </div>
              ) : (
                <span className="text-sm font-semibold">{isSignUp ? "Create Account" : "Sign In"}</span>
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
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default Login
