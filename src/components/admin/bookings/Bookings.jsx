"use client"

import { useEffect, useState } from "react"
import {
  Search,
  Calendar,
  DollarSign,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Check,
  X,
  Clock,
  ChevronDown,
} from "lucide-react"
import { getBookings, updateBookingStatus } from "../../../api/AdminApi"

// Updated mock data to match API structure
const mockBookings = [
  {
    id: "68583898ad4198df5af556d6",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    planName: "Premium Plan",
    price: 59,
    bookingDate: "2025-06-22T17:08:40.275Z",
    status: "confirmed",
  },
  {
    id: "6858c63cad4198df5af5571e",
    userName: "Sarah Wilson",
    userEmail: "sarah.wilson@example.com",
    planName: "STANDARD",
    price: 129,
    bookingDate: "2025-06-23T03:13:00.225Z",
    status: "pending",
  },
  {
    id: "68583898ad4198df5af556d7",
    userName: "Michael Chen",
    userEmail: "michael.chen@example.com",
    planName: "Enterprise Plan",
    price: 299,
    bookingDate: "2025-06-21T14:30:00.000Z",
    status: "confirmed",
  },
  {
    id: "68583898ad4198df5af556d8",
    userName: "Emily Davis",
    userEmail: "emily.davis@example.com",
    planName: "Basic Plan",
    price: 29,
    bookingDate: "2025-06-20T09:15:00.000Z",
    status: "cancelled",
  },
]

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPlan, setFilterPlan] = useState("all")
  const [filterDate, setFilterDate] = useState("all")
  const [sortBy, setSortBy] = useState("bookingDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [selectedBookings, setSelectedBookings] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)

  // New state for status updates
  const [updatingStatus, setUpdatingStatus] = useState({})
  const [statusDropdowns, setStatusDropdowns] = useState({})

  // Advanced analytics
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    averageBookingValue: 0,
    growthRate: 0,
    topPlan: "",
    recentBookings: 0,
  })

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true)
      try {
        const result = await getBookings()
        console.log("Bookings fetched:", result.data.bookings)
        const bookingsData = result.data.bookings || mockBookings
        setBookings(bookingsData)
        calculateAnalytics(bookingsData)
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setBookings(mockBookings)
        calculateAnalytics(mockBookings)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  // New function to handle status updates
  const handleStatusUpdate = async (bookingId, newStatus) => {
    setUpdatingStatus((prev) => ({ ...prev, [bookingId]: true }))

    try {
      const result = await updateBookingStatus(bookingId, newStatus)
      console.log("Status updated:", result)

      // Update local state
      setBookings((prevBookings) =>
        prevBookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
      )

      // Close dropdown
      setStatusDropdowns((prev) => ({ ...prev, [bookingId]: false }))

      // Show success message (you can replace this with a toast notification)
      console.log(`Booking ${bookingId} status updated to ${newStatus}`)
    } catch (error) {
      console.error("Error updating booking status:", error)
      // Show error message (you can replace this with a toast notification)
      alert("Failed to update booking status. Please try again.")
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [bookingId]: false }))
    }
  }

  // New function to handle bulk status updates
  const handleBulkStatusUpdate = async (newStatus) => {
    const updatePromises = selectedBookings.map((bookingId) => handleStatusUpdate(bookingId, newStatus))

    try {
      await Promise.all(updatePromises)
      setSelectedBookings([])
      console.log(`Bulk status update to ${newStatus} completed`)
    } catch (error) {
      console.error("Error in bulk status update:", error)
    }
  }

  // Toggle status dropdown
  const toggleStatusDropdown = (bookingId) => {
    setStatusDropdowns((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }))
  }

  // Calculate advanced analytics
  const calculateAnalytics = (bookingsData) => {
    const totalRevenue = bookingsData
      .filter((b) => b.status === "confirmed")
      .reduce((sum, booking) => sum + booking.price, 0)

    const averageBookingValue =
      bookingsData.length > 0 ? totalRevenue / bookingsData.filter((b) => b.status === "confirmed").length : 0

    // Calculate growth rate (last 7 days vs previous 7 days)
    const now = new Date()
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const previous7Days = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const recentRevenue = bookingsData
      .filter((b) => new Date(b.bookingDate) >= last7Days && b.status === "confirmed")
      .reduce((sum, booking) => sum + booking.price, 0)

    const previousRevenue = bookingsData
      .filter(
        (b) =>
          new Date(b.bookingDate) >= previous7Days && new Date(b.bookingDate) < last7Days && b.status === "confirmed",
      )
      .reduce((sum, booking) => sum + booking.price, 0)

    const growthRate = previousRevenue > 0 ? ((recentRevenue - previousRevenue) / previousRevenue) * 100 : 0

    // Find top plan
    const planCounts = bookingsData.reduce((acc, booking) => {
      acc[booking.planName] = (acc[booking.planName] || 0) + 1
      return acc
    }, {})
    const topPlan = Object.keys(planCounts).reduce((a, b) => (planCounts[a] > planCounts[b] ? a : b), "")

    const recentBookings = bookingsData.filter((b) => new Date(b.bookingDate) >= last7Days).length

    setAnalytics({
      totalRevenue,
      averageBookingValue,
      growthRate,
      topPlan,
      recentBookings,
    })
  }

  // Advanced filtering and sorting
  useEffect(() => {
    const filtered = bookings.filter((booking) => {
      const matchesSearch =
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "all" || booking.status === filterStatus
      const matchesPlan = filterPlan === "all" || booking.planName === filterPlan

      let matchesDate = true
      if (filterDate !== "all") {
        const bookingDate = new Date(booking.bookingDate)
        const today = new Date()
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

        switch (filterDate) {
          case "today":
            matchesDate = bookingDate.toDateString() === today.toDateString()
            break
          case "yesterday":
            matchesDate = bookingDate.toDateString() === yesterday.toDateString()
            break
          case "week":
            matchesDate = bookingDate >= lastWeek
            break
          case "month":
            matchesDate = bookingDate >= lastMonth
            break
          default:
            matchesDate = true
        }
      }

      return matchesSearch && matchesStatus && matchesPlan && matchesDate
    })

    // Sort bookings
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "bookingDate") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else if (sortBy === "price") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredBookings(filtered)
    setCurrentPage(1)
  }, [bookings, searchTerm, filterStatus, filterPlan, filterDate, sortBy, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings((prev) =>
      prev.includes(bookingId) ? prev.filter((id) => id !== bookingId) : [...prev, bookingId],
    )
  }

  const handleSelectAll = () => {
    if (selectedBookings.length === paginatedBookings.length) {
      setSelectedBookings([])
    } else {
      setSelectedBookings(paginatedBookings.map((b) => b.id))
    }
  }

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for bookings:`, selectedBookings)
    // Implement bulk actions
    setSelectedBookings([])
  }

  const exportBookings = () => {
    const csvContent = [
      ["ID", "User Name", "Email", "Plan", "Price", "Date", "Status"],
      ...filteredBookings.map((b) => [
        b.id,
        b.userName,
        b.userEmail,
        b.planName,
        b.price,
        new Date(b.bookingDate).toLocaleDateString(),
        b.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bookings.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <Check className="w-3 h-3" />
      case "pending":
        return <Clock className="w-3 h-3" />
      case "cancelled":
        return <X className="w-3 h-3" />
      case "completed":
        return <Check className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const uniquePlans = [...new Set(bookings.map((booking) => booking.planName))]
  const statusOptions = ["pending", "confirmed", "cancelled"]

  if (loading) {
    return (
      <div className={`flex-1 transition-all duration-500 ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}>
        <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="text-lg">Loading bookings...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex-1 transition-all duration-500 ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}>
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Enhanced Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Advanced Bookings Management
              </h1>
              <p className="text-gray-400 mt-1">
                Manage {bookings.length} bookings with advanced analytics and filtering
              </p>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Total Bookings</div>
              <div className="text-2xl font-bold text-white">{bookings.length}</div>
              <div className="text-xs text-gray-500 mt-1">All time</div>
            </div>
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Total Revenue</div>
              <div className="text-2xl font-bold text-green-400">${analytics.totalRevenue.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-1">Confirmed bookings</div>
            </div>
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Avg. Booking Value</div>
              <div className="text-2xl font-bold text-blue-400">${analytics.averageBookingValue.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-1">Per confirmed booking</div>
            </div>
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Growth Rate</div>
              <div
                className={`text-2xl font-bold flex items-center gap-1 ${analytics.growthRate >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {analytics.growthRate >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                {Math.abs(analytics.growthRate).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">Last 7 days</div>
            </div>
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Top Plan</div>
              <div className="text-lg font-bold text-purple-400">{analytics.topPlan}</div>
              <div className="text-xs text-gray-500 mt-1">Most popular</div>
            </div>
          </div>

          {/* Enhanced Filters and Search */}
          <div className=" border border-gray-800 rounded-lg">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by user name, email, plan, or booking ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-800/30 rounded-lg">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="all">All Plans</option>
                    {uniquePlans.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [field, order] = e.target.value.split("-")
                      setSortBy(field)
                      setSortOrder(order)
                    }}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  >
                    <option value="bookingDate-desc">Date (Newest)</option>
                    <option value="bookingDate-asc">Date (Oldest)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="userName-asc">Name (A-Z)</option>
                    <option value="userName-desc">Name (Z-A)</option>
                  </select>
                </div>
              )}

              {/* Enhanced Bulk Actions with Status Updates */}
              {selectedBookings.length > 0 && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg flex items-center justify-between">
                  <span className="text-blue-400">
                    {selectedBookings.length} booking{selectedBookings.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBulkStatusUpdate("confirmed")}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Confirm
                    </button>
                    <button
                      onClick={() => handleBulkStatusUpdate("pending")}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      Pending
                    </button>
                    <button
                      onClick={() => handleBulkStatusUpdate("cancelled")}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      Cancel
                    </button>
                    <button
                      onClick={() => handleBulkAction("delete")}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Enhanced Table */}
              <div className="rounded-md border border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-800/30">
                      <th className="text-left p-4">
                        <input
                          type="checkbox"
                          checked={selectedBookings.length === paginatedBookings.length && paginatedBookings.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-600 bg-gray-800 text-white focus:ring-white/20"
                        />
                      </th>
                      <th
                        className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort("userName")}
                      >
                        Customer
                      </th>
                      <th
                        className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort("planName")}
                      >
                        Plan
                      </th>
                      <th
                        className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort("price")}
                      >
                        Price
                      </th>
                      <th
                        className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort("bookingDate")}
                      >
                        Booking Date
                      </th>
                      <th
                        className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort("status")}
                      >
                        Status
                      </th>
                      <th className="text-right p-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedBookings.includes(booking.id)}
                            onChange={() => handleSelectBooking(booking.id)}
                            className="rounded border-gray-600 bg-gray-800 text-white focus:ring-white/20"
                          />
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="font-medium text-white flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {booking.userName.charAt(0).toUpperCase()}
                              </div>
                              {booking.userName}
                            </div>
                            <div className="text-sm text-gray-400">{booking.userEmail}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-white">{booking.planName}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-white font-medium">
                            <DollarSign className="w-3 h-3" />
                            {booking.price.toFixed(2)}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-white">
                              <Calendar className="w-3 h-3" />
                              {formatDate(booking.bookingDate)}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="relative">
                            <button
                              onClick={() => toggleStatusDropdown(booking.id)}
                              disabled={updatingStatus[booking.id]}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(booking.status)} hover:opacity-80 transition-opacity disabled:opacity-50`}
                            >
                              {updatingStatus[booking.id] ? (
                                <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                              ) : (
                                <>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1">{booking.status}</span>
                                  <ChevronDown className="w-3 h-3 ml-1" />
                                </>
                              )}
                            </button>

                            {/* Status Dropdown */}
                            {statusDropdowns[booking.id] && (
                              <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 min-w-[120px]">
                                {statusOptions.map((status) => (
                                  <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(booking.id, status)}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                                      booking.status === status ? "bg-gray-700 text-white" : "text-gray-300"
                                    }`}
                                  >
                                    {getStatusIcon(status)}
                                    <span className="capitalize">{status}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <Edit className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                              <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-white" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredBookings.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No bookings found</p>
                    <p className="text-sm">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of{" "}
                    {filteredBookings.length} bookings
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded transition-colors ${
                              currentPage === page
                                ? "bg-white text-black"
                                : "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookings
