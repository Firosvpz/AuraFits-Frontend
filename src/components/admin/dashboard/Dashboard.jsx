import React, { useState, useRef, useEffect } from "react";

import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Clock,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  Zap,
  Target,
  Award,
  Eye,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { mockData } from "../../../constants/admin/dashboardApi/dashBoardApi";

// Custom animated components
const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CountUpNumber = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, isVisible]);

  return (
    <span ref={countRef}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const ProgressBar = ({ percentage, color = "#3B82F6", animated = true }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 300);

    return () => clearTimeout(timer);
  }, [percentage]);

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
  );
};
const GlowingButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    secondary:
      "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
  };

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
  );
};
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const revenueChartRef = useRef(null);
  const membershipChartRef = useRef(null);
  const hourlyChartRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      renderRevenueChart();
      renderMembershipChart();
      renderHourlyChart();
    }
  }, [isLoading, timeRange]);

  const renderRevenueChart = () => {
    const canvas = revenueChartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const data = dashboardData.revenueByMonth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    const maxRevenue = Math.max(...data.map((d) => d.revenue));
    const stepX = chartWidth / (data.length - 1);

    // Draw grid lines
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw revenue line with gradient
    const gradient = ctx.createLinearGradient(
      0,
      padding,
      0,
      canvas.height - padding,
    );
    gradient.addColorStop(0, "#3B82F6");
    gradient.addColorStop(1, "#1E40AF");

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((point, index) => {
      const x = padding + stepX * index;
      const y =
        canvas.height - padding - (point.revenue / maxRevenue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw data points
      ctx.save();
      ctx.fillStyle = "#3B82F6";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    });

    ctx.stroke();

    // Draw area under curve
    ctx.save();
    const areaGradient = ctx.createLinearGradient(
      0,
      padding,
      0,
      canvas.height - padding,
    );
    areaGradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
    areaGradient.addColorStop(1, "rgba(59, 130, 246, 0.05)");

    ctx.fillStyle = areaGradient;
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Draw labels
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "12px Inter, sans-serif";
    ctx.textAlign = "center";

    data.forEach((point, index) => {
      const x = padding + stepX * index;
      ctx.fillText(point.month, x, canvas.height - 10);
    });
  };

  const renderMembershipChart = () => {
    const canvas = membershipChartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const data = dashboardData.usersByMembership;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = radius * 0.6;

    let currentAngle = -Math.PI / 2;

    data.forEach((segment, index) => {
      const sliceAngle = (2 * Math.PI * segment.percentage) / 100;

      // Create gradient for each segment
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        innerRadius,
        centerX,
        centerY,
        radius,
      );
      gradient.addColorStop(0, segment.color + "80");
      gradient.addColorStop(1, segment.color);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + sliceAngle,
      );
      ctx.arc(
        centerX,
        centerY,
        innerRadius,
        currentAngle + sliceAngle,
        currentAngle,
        true,
      );
      ctx.closePath();
      ctx.fill();

      // Add glow effect
      ctx.shadowColor = segment.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      currentAngle += sliceAngle;
    });

    // Draw center circle
    const centerGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      innerRadius,
    );
    centerGradient.addColorStop(0, "#1F2937");
    centerGradient.addColorStop(1, "#111827");

    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fill();
  };

  const renderHourlyChart = () => {
    const canvas = hourlyChartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const data = dashboardData.hourlyBookings;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 30;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    const maxBookings = Math.max(...data.map((d) => d.bookings));
    const barWidth = chartWidth / data.length - 4;

    data.forEach((point, index) => {
      const x = padding + (chartWidth / data.length) * index + 2;
      const barHeight = (point.bookings / maxBookings) * chartHeight;
      const y = canvas.height - padding - barHeight;

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(
        x,
        y,
        x,
        canvas.height - padding,
      );
      gradient.addColorStop(0, "#10B981");
      gradient.addColorStop(1, "#059669");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Add glow effect for peak hours
      if (point.bookings > maxBookings * 0.8) {
        ctx.shadowColor = "#10B981";
        ctx.shadowBlur = 15;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.shadowBlur = 0;
      }

      // Draw labels
      ctx.fillStyle = "#6B7280";
      ctx.font = "10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.save();
      ctx.translate(x + barWidth / 2, canvas.height - 5);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(point.hour, 0, 0);
      ctx.restore();
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      {/* Dashboard Content */}
      <div
        className={`flex-1 transition-all duration-500 ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}
      >
        <main className="p-6 overflow-y-auto h-[calc(100vh-5rem)]">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnimatedCard delay={100} className="card-hover">
              <div className="p-6 glassmorphism rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500 bg-opacity-20 rounded-xl">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <CountUpNumber
                        end={dashboardData.userGrowth}
                        suffix="%"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    <CountUpNumber end={dashboardData.totalUsers} />
                  </h3>
                  <p className="text-gray-400">Total Users</p>
                  <ProgressBar percentage={75} color="#3B82F6" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>
                      Active: <CountUpNumber end={dashboardData.activeUsers} />
                    </span>
                    <span>
                      New: <CountUpNumber end={dashboardData.newUsersToday} />
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={200} className="card-hover">
              <div className="p-6 glassmorphism rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500 bg-opacity-20 rounded-xl">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <CountUpNumber
                        end={dashboardData.bookingGrowth}
                        suffix="%"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    <CountUpNumber end={dashboardData.totalBookings} />
                  </h3>
                  <p className="text-gray-400">Total Bookings</p>
                  <ProgressBar percentage={85} color="#8B5CF6" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>
                      Today: <CountUpNumber end={dashboardData.bookingsToday} />
                    </span>
                    <span>Peak: {dashboardData.peakHours}</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={300} className="card-hover">
              <div className="p-6 glassmorphism rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500 bg-opacity-20 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <CountUpNumber
                        end={dashboardData.revenueGrowth}
                        suffix="%"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">
                    <CountUpNumber end={dashboardData.revenue} prefix="$" />
                  </h3>
                  <p className="text-gray-400">Total Revenue</p>
                  <ProgressBar percentage={92} color="#10B981" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Conversion: {dashboardData.conversionRate}%</span>
                    <span>Retention: {dashboardData.membershipRetention}%</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={400} className="card-hover">
              <div className="p-6 glassmorphism rounded-2xl border border-gray-700">
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
                  <h3 className="text-2xl font-bold">
                    {dashboardData.avgSessionDuration}
                  </h3>
                  <p className="text-gray-400">Avg Session</p>
                  <ProgressBar percentage={68} color="#F59E0B" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Peak: {dashboardData.peakHours}</span>
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
              <div className="p-6 glassmorphism rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Revenue Trend</h3>
                    <p className="text-gray-400">Monthly revenue growth</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GlowingButton
                      variant="secondary"
                      className="text-xs px-3 py-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </GlowingButton>
                  </div>
                </div>
                <div className="h-64">
                  <canvas
                    ref={revenueChartRef}
                    width="600"
                    height="240"
                    className="w-full h-full"
                  ></canvas>
                </div>
              </div>
            </AnimatedCard>

            {/* Membership Distribution */}
            <AnimatedCard delay={600} className="card-hover">
              <div className="p-6 glassmorphism rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Membership Types</h3>
                    <p className="text-gray-400">User distribution</p>
                  </div>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <canvas
                      ref={membershipChartRef}
                      width="200"
                      height="200"
                      className="w-full h-full"
                    ></canvas>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-2xl font-bold">
                        <CountUpNumber end={dashboardData.totalUsers} />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {dashboardData.usersByMembership.map((item, index) => (
                    <div
                      key={item.type}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 mr-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium">{item.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">
                          <CountUpNumber end={item.count} />
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.percentage}%
                        </div>
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
              <div className="p-6 glassmorphism rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Recent Bookings</h3>
                    <p className="text-gray-400">Latest customer activities</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GlowingButton
                      variant="secondary"
                      className="text-xs px-3 py-1"
                    >
                      <Filter className="w-4 h-4 mr-1" />
                      Filter
                    </GlowingButton>
                    <GlowingButton className="text-xs px-3 py-1">
                      View All
                    </GlowingButton>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-700">
                        <th className="pb-3 font-medium">Customer</th>
                        <th className="pb-3 font-medium">Service</th>
                        <th className="pb-3 font-medium">Date & Time</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {dashboardData.recentBookings.map((booking, index) => (
                        <tr
                          key={booking.id}
                          className="text-sm hover:bg-gray-800 transition-colors duration-200"
                        >
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
                              <span className="font-medium">
                                {booking.user}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">{booking.service}</td>
                          <td className="py-4 text-gray-400">{booking.date}</td>
                          <td className="py-4 font-medium">
                            ${booking.amount}
                          </td>
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
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedCard>

            {/* Hourly Bookings */}
            <AnimatedCard delay={800} className="card-hover">
              <div className="p-6 glassmorphism rounded-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Peak Hours</h3>
                    <p className="text-gray-400">Booking distribution</p>
                  </div>
                </div>
                <div className="h-64 mb-4">
                  <canvas
                    ref={hourlyChartRef}
                    width="300"
                    height="240"
                    className="w-full h-full"
                  ></canvas>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-sm">Peak Time</span>
                    </div>
                    <span className="font-bold text-yellow-400">6-8 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-sm">Avg/Hour</span>
                    </div>
                    <span className="font-bold text-green-400">78</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-sm">Best Day</span>
                    </div>
                    <span className="font-bold text-blue-400">Saturday</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
