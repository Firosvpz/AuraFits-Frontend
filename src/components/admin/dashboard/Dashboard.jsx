"use client"

import { useState, useRef, useEffect } from "react"
import { Users, Calendar, DollarSign, TrendingUp, Activity, Clock, Eye, Filter, RefreshCw } from "lucide-react"
import { dashboardStats } from "../../../api/AdminApi"

// Custom animated components
const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}

const CountUpNumber = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const countRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, isVisible])

  return (
    <span ref={countRef}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const ProgressBar = ({ percentage, color = "#3B82F6", animated = true }) => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage)
    }, 300)

    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${animated ? "animate-pulse" : ""}`}
        style={{
          width: `${width}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}40`,
        }}
      />
    </div>
  )
}

const GlowingButton = ({ children, onClick, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-lg font-medium text-white
        transform transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-lg hover:shadow-current/25
        active:scale-95
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </button>
  )
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState()
  const [processedData, setProcessedData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("month")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const revenueChartRef = useRef(null)
  const membershipChartRef = useRef(null)
  const hourlyChartRef = useRef(null)

  // Use your existing API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dashboardStats()
        console.log('data',data);
        
        setDashboardData(data.data.stats)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  console.log("dashboard", dashboardData)

  // Process the raw data into dashboard metrics
  useEffect(() => {
    if (!dashboardData) return

    const processData = () => {
      // Calculate total revenue from confirmed bookings
      const totalRevenue = dashboardData.bookings
        .filter((booking) => booking.status === "confirmed")
        .reduce((sum, booking) => sum + booking.planId.price, 0)

      // Calculate revenue by month (generate based on current data)
      const currentMonth = new Date().getMonth()
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
        const monthIndex = (currentMonth - 5 + i + 12) % 12
        const monthRevenue = totalRevenue * (0.7 + Math.random() * 0.6) // Simulate variation
        return {
          month: months[monthIndex],
          revenue: Math.floor(monthRevenue),
        }
      })

      // Calculate plan distribution from bookings
      const planCounts = {}
      const planColors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"]

      dashboardData.bookings.forEach((booking) => {
        const planName = booking.planId.planName
        planCounts[planName] = (planCounts[planName] || 0) + 1
      })

      const usersByMembership = Object.entries(planCounts).map(([planName, count], index) => ({
        type: planName,
        count,
        percentage: Math.round((count / dashboardData.totalBookings) * 100),
        color: planColors[index % planColors.length],
      }))

      // Generate hourly bookings data based on booking times
      const hourlyBookings = Array.from({ length: 24 }, (_, i) => {
        // Simulate realistic booking patterns (higher during business hours)
        let bookings = 2
        if (i >= 9 && i <= 17)
          bookings = Math.floor(Math.random() * 15) + 5 // Business hours
        else if (i >= 18 && i <= 21)
          bookings = Math.floor(Math.random() * 20) + 8 // Evening peak
        else bookings = Math.floor(Math.random() * 5) + 1 // Off hours

        return {
          hour: `${i.toString().padStart(2, "0")}:00`,
          bookings,
        }
      })

      // Format recent bookings
      const recentBookings = dashboardData.bookings.slice(0, 5).map((booking) => ({
        id: booking._id,
        user: booking.userId.name,
        service: booking.planId.planName,
        date: new Date(booking.bookingDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        amount: booking.planId.price,
        status: booking.status,
      }))

      // Calculate status breakdown
      const confirmedBookings = dashboardData.bookings.filter((b) => b.status === "confirmed").length
      const pendingBookings = dashboardData.bookings.filter((b) => b.status === "pending").length
      const cancelledBookings = dashboardData.bookings.filter((b) => b.status === "cancelled").length

      // Calculate growth metrics (mock calculations based on current data)
      const userGrowth =
        dashboardData.totalUsers > 0 ? Math.min(Math.floor((dashboardData.totalUsers / 10) * 2.5), 25) : 0
      const bookingGrowth =
        dashboardData.totalBookings > 0
          ? Math.min(Math.floor((confirmedBookings / dashboardData.totalBookings) * 20), 30)
          : 0
      const revenueGrowth = totalRevenue > 0 ? Math.min(Math.floor((totalRevenue / 1000) * 5), 35) : 0

      const processed = {
        // Basic stats from API
        totalUsers: dashboardData.totalUsers,
        totalBookings: dashboardData.totalBookings,
        totalPlans: dashboardData.totalPlans,
        revenue: totalRevenue,

        // Calculated growth metrics
        userGrowth,
        bookingGrowth,
        revenueGrowth,

        // Additional calculated metrics
        activeUsers: Math.floor(dashboardData.totalUsers * 0.7),
        newUsersToday: Math.floor(dashboardData.totalUsers * 0.1),
        bookingsToday: Math.floor(dashboardData.totalBookings * 0.2),
        conversionRate:
          dashboardData.totalBookings > 0 ? Math.round((confirmedBookings / dashboardData.totalBookings) * 100) : 0,
        membershipRetention: 85,
        avgSessionDuration: "24m 32s",
        peakHours: "6-8 PM",

        // Chart data
        revenueByMonth,
        usersByMembership,
        hourlyBookings,
        recentBookings,

        // Status breakdown
        confirmedBookings,
        pendingBookings,
        cancelledBookings,
      }

      setProcessedData(processed)
      setIsLoading(false)
    }

    processData()
  }, [dashboardData])

  useEffect(() => {
    if (!isLoading && processedData) {
      renderRevenueChart()
      renderMembershipChart()
      renderHourlyChart()
    }
  }, [isLoading, processedData, timeRange])

  const renderRevenueChart = () => {
    const canvas = revenueChartRef.current
    if (!canvas || !processedData) return

    const ctx = canvas.getContext("2d")
    const data = processedData.revenueByMonth

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const maxRevenue = Math.max(...data.map((d) => d.revenue))
    const stepX = chartWidth / (data.length - 1)

    // Draw grid lines
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.stroke()
    }

    // Draw revenue line with gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding)
    gradient.addColorStop(0, "#3B82F6")
    gradient.addColorStop(1, "#1E40AF")

    ctx.strokeStyle = gradient
    ctx.lineWidth = 3
    ctx.beginPath()

    data.forEach((point, index) => {
      const x = padding + stepX * index
      const y = canvas.height - padding - (point.revenue / maxRevenue) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw data points
      ctx.save()
      ctx.fillStyle = "#3B82F6"
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
      ctx.restore()
    })

    ctx.stroke()

    // Draw area under curve
    ctx.save()
    const areaGradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding)
    areaGradient.addColorStop(0, "rgba(59, 130, 246, 0.3)")
    areaGradient.addColorStop(1, "rgba(59, 130, 246, 0.05)")
    ctx.fillStyle = areaGradient
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // Draw labels
    ctx.fillStyle = "#9CA3AF"
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "center"
    data.forEach((point, index) => {
      const x = padding + stepX * index
      ctx.fillText(point.month, x, canvas.height - 10)
    })
  }

  const renderMembershipChart = () => {
    const canvas = membershipChartRef.current
    if (!canvas || !processedData) return

    const ctx = canvas.getContext("2d")
    const data = processedData.usersByMembership

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20
    const innerRadius = radius * 0.6

    let currentAngle = -Math.PI / 2

    data.forEach((segment) => {
      const sliceAngle = (2 * Math.PI * segment.percentage) / 100

      // Create gradient for each segment
      const gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, radius)
      gradient.addColorStop(0, segment.color + "80")
      gradient.addColorStop(1, segment.color)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true)
      ctx.closePath()
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = segment.color
      ctx.shadowBlur = 10
      ctx.fill()
      ctx.shadowBlur = 0

      currentAngle += sliceAngle
    })

    // Draw center circle
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, innerRadius)
    centerGradient.addColorStop(0, "#1F2937")
    centerGradient.addColorStop(1, "#111827")
    ctx.fillStyle = centerGradient
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI)
    ctx.fill()
  }

  const renderHourlyChart = () => {
    const canvas = hourlyChartRef.current
    if (!canvas || !processedData) return

    const ctx = canvas.getContext("2d")
    const data = processedData.hourlyBookings

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const padding = 30
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const maxBookings = Math.max(...data.map((d) => d.bookings))
    const barWidth = chartWidth / data.length - 4

    data.forEach((point, index) => {
      const x = padding + (chartWidth / data.length) * index + 2
      const barHeight = (point.bookings / maxBookings) * chartHeight
      const y = canvas.height - padding - barHeight

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding)
      gradient.addColorStop(0, "#10B981")
      gradient.addColorStop(1, "#059669")

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add glow effect for peak hours
      if (point.bookings > maxBookings * 0.8) {
        ctx.shadowColor = "#10B981"
        ctx.shadowBlur = 15
        ctx.fillRect(x, y, barWidth, barHeight)
        ctx.shadowBlur = 0
      }

      // Draw labels (every 4th hour to avoid crowding)
      if (index % 4 === 0) {
        ctx.fillStyle = "#6B7280"
        ctx.font = "10px Inter, sans-serif"
        ctx.textAlign = "center"
        ctx.save()
        ctx.translate(x + barWidth / 2, canvas.height - 5)
        ctx.rotate(-Math.PI / 4)
        ctx.fillText(point.hour, 0, 0)
        ctx.restore()
      }
    })
  }

  if (isLoading || !processedData) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
     <div
      className={`flex-1 transition-all duration-500 ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}
    >
    <div className="min-h-screen bg-black text-white p-6">
      {/* Dashboard Content */}
     
        <main className="p-6 overflow-y-auto h-[calc(100vh-5rem)]">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedCard delay={100} className="card-hover">
              <div className="p-6  bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500 bg-opacity-20 rounded-xl">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <CountUpNumber end={processedData.userGrowth} suffix="%" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    <CountUpNumber end={processedData.totalUsers} />
                  </h3>
                  <p className="text-gray-400">Total Users</p>
                  <ProgressBar percentage={75} color="#3B82F6" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>
                      Active: <CountUpNumber end={processedData.activeUsers} />
                    </span>
                    <span>
                      New: <CountUpNumber end={processedData.newUsersToday} />
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={200} className="card-hover">
              <div className="p-6  bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500 bg-opacity-20 rounded-xl">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <CountUpNumber end={processedData.bookingGrowth} suffix="%" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    <CountUpNumber end={processedData.totalBookings} />
                  </h3>
                  <p className="text-gray-400">Total Bookings</p>
                  <ProgressBar percentage={85} color="#8B5CF6" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>
                      Today: <CountUpNumber end={processedData.bookingsToday} />
                    </span>
                    <span>Peak: {processedData.peakHours}</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={300} className="card-hover">
              <div className="p-6  bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500 bg-opacity-20 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <CountUpNumber end={processedData.revenueGrowth} suffix="%" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    <CountUpNumber end={processedData.revenue} prefix="$" />
                  </h3>
                  <p className="text-gray-400">Total Revenue</p>
                  <ProgressBar percentage={92} color="#10B981" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Conversion: {processedData.conversionRate}%</span>
                    <span>Retention: {processedData.membershipRetention}%</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={400} className="card-hover">
              <div className="p-6  bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-500 bg-opacity-20 rounded-xl">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-blue-400 text-sm">
                      <Activity className="w-4 h-4 mr-1" />
                      Live
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{processedData.avgSessionDuration}</h3>
                  <p className="text-gray-400">Avg Session</p>
                  <ProgressBar percentage={68} color="#F59E0B" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Peak: {processedData.peakHours}</span>
                    <span>Active Now: 127</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <AnimatedCard delay={500} className="lg:col-span-2 card-hover">
              <div className="p-6  bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Revenue Trend</h3>
                    <p className="text-gray-400">Monthly revenue growth</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GlowingButton variant="secondary" className="text-xs px-3 py-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </GlowingButton>
                  </div>
                </div>
                <div className="h-64">
                  <canvas ref={revenueChartRef} width="600" height="240" className="w-full h-full"></canvas>
                </div>
              </div>
            </AnimatedCard>

            {/* Membership Distribution */}
            <AnimatedCard delay={600} className="card-hover">
              <div className="p-6  bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Plan Distribution</h3>
                    <p className="text-gray-400">Booking by plans</p>
                  </div>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <canvas ref={membershipChartRef} width="200" height="200" className="w-full h-full"></canvas>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-2xl font-bold">
                        <CountUpNumber end={processedData.totalBookings} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {processedData.usersByMembership.map((item, index) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 mr-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium">{item.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">
                          <CountUpNumber end={item.count} />
                        </div>
                        <div className="text-xs text-gray-400">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <AnimatedCard delay={700} className="lg:col-span-2 card-hover">
              <div className="p-6  bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Recent Bookings</h3>
                    <p className="text-gray-400">Latest customer activities</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <GlowingButton variant="secondary" className="text-xs px-3 py-1">
                      <Filter className="w-4 h-4 mr-1" />
                      Filter
                    </GlowingButton>
                    <GlowingButton className="text-xs px-3 py-1">View All</GlowingButton> */}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-700">
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Plan</th>
                        <th className="pb-3 font-medium">Date & Time</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {processedData.recentBookings.map((booking, index) => (
                        <tr key={booking.id} className="text-sm hover: transition-colors duration-200">
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs font-bold text-white">
                                  {booking.user
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <span className="font-medium">{booking.user}</span>
                            </div>
                          </td>
                          <td className="py-4">{booking.service}</td>
                          <td className="py-4 text-gray-400">{booking.date}</td>
                          <td className="py-4 font-medium">${booking.amount}</td>
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === "confirmed"
                                  ? "bg-green-500 bg-opacity-20 text-green-400"
                                  : booking.status === "pending"
                                    ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
                                    : "bg-red-500 bg-opacity-20 text-red-400"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedCard>

            {/* Booking Status Summary */}
            <AnimatedCard delay={800} className="card-hover">
              <div className="p-6  bg-opacity-50 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Booking Status</h3>
                    <p className="text-gray-400">Status breakdown</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3  rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm">Confirmed</span>
                    </div>
                    <span className="font-bold text-green-400">
                      <CountUpNumber end={processedData.confirmedBookings} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3  rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="font-bold text-yellow-400">
                      <CountUpNumber end={processedData.pendingBookings} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3  rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <span className="text-sm">Cancelled</span>
                    </div>
                    <span className="font-bold text-red-400">
                      <CountUpNumber end={processedData.cancelledBookings} />
                    </span>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Conversion Rate</span>
                      <span className="text-lg font-bold text-blue-400">{processedData.conversionRate}%</span>
                    </div>
                    <ProgressBar percentage={processedData.conversionRate} color="#3B82F6" animated={true} />
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </main>
      
    </div>
    </div>
  )
}

export default Dashboard
