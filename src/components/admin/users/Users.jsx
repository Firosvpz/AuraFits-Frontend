"use client"

import { useEffect, useState } from "react"
import {
  Plus,
  Search,
  Mail,
  Phone,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  UsersIcon,
  Clock,
} from "lucide-react"
import { getUsers } from "../../../api/AdminApi"

// Updated mock data to match API structure
const mockUsers = [
  {
    id: "683ed0c9b21b3509fa1f549d",
    name: "John Doe",
    email: "john.doe@example.com",
    isVerified: true,
    phoneNumber: "1234567890",
    joinedAt: "2025-06-23T04:33:02.155Z",
  },
  {
    id: "683ed19db21b3509fa1f54a2",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    isVerified: false,
    joinedAt: "2025-06-23T04:33:02.157Z",
  },
]

const Users = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("all")
  const [sortBy, setSortBy] = useState("joinedAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)

  // Advanced analytics
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    usersWithPhone: 0,
    recentUsers: 0,
    growthRate: 0,
  })

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await getUsers()
        console.log("Users fetched:", response.data.users)
        const usersData = response.data.users || mockUsers
        setUsers(usersData)
        calculateAnalytics(usersData)
      } catch (error) {
        console.error("Failed to fetch users:", error)
        setUsers(mockUsers)
        calculateAnalytics(mockUsers)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Calculate advanced analytics
  const calculateAnalytics = (usersData) => {
    const totalUsers = usersData.length
    const usersWithPhone = usersData.filter((u) => u.phoneNumber).length

    // Calculate recent users (last 7 days)
    const now = new Date()
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const recentUsers = usersData.filter((u) => new Date(u.joinedAt) >= last7Days).length

    // Calculate growth rate (last 7 days vs previous 7 days)
    const previous7Days = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    const previousUsers = usersData.filter(
      (u) => new Date(u.joinedAt) >= previous7Days && new Date(u.joinedAt) < last7Days,
    ).length

    const growthRate = previousUsers > 0 ? ((recentUsers - previousUsers) / previousUsers) * 100 : 0

    setAnalytics({
      totalUsers,
      usersWithPhone,
      recentUsers,
      growthRate,
    })
  }

  // Advanced filtering and sorting
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phoneNumber && user.phoneNumber.includes(searchTerm)) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())

      let matchesDate = true
      if (filterDate !== "all") {
        const userDate = new Date(user.joinedAt)
        const today = new Date()
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

        switch (filterDate) {
          case "today":
            matchesDate = userDate.toDateString() === today.toDateString()
            break
          case "yesterday":
            matchesDate = userDate.toDateString() === yesterday.toDateString()
            break
          case "week":
            matchesDate = userDate >= lastWeek
            break
          case "month":
            matchesDate = userDate >= lastMonth
            break
          default:
            matchesDate = true
        }
      }

      return matchesSearch && matchesDate
    })

    // Sort users
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "joinedAt") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [users, searchTerm, filterDate, sortBy, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map((u) => u.id))
    }
  }

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for users:`, selectedUsers)
    // Implement bulk actions
    setSelectedUsers([])
  }

  const exportUsers = () => {
    const csvContent = [
      ["ID", "Name", "Email", "Phone", "Verified", "Joined Date"],
      ...filteredUsers.map((u) => [
        u.id,
        u.name,
        u.email,
        u.phoneNumber || "N/A",
        u.isVerified ? "Yes" : "No",
        new Date(u.joinedAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "users.csv"
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

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`

    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}mo ago`
  }

  if (loading) {
    return (
      <div className={`flex-1 transition-all duration-500 ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}>
        <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span className="text-lg">Loading users...</span>
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
                Advanced User Management
              </h1>
              <p className="text-gray-400 mt-1">
                Manage {analytics.totalUsers} users with advanced analytics and filtering
              </p>
            </div>
          
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Total Users</div>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                {analytics.totalUsers}
              </div>
              <div className="text-xs text-gray-500 mt-1">All registered</div>
            </div>
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">With Phone</div>
              <div className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                {analytics.usersWithPhone}
              </div>
              <div className="text-xs text-gray-500 mt-1">Phone provided</div>
            </div>
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Recent Users</div>
              <div className="text-2xl font-bold text-purple-400 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {analytics.recentUsers}
              </div>
              <div className="text-xs text-gray-500 mt-1">Last 7 days</div>
            </div>
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">Growth Rate</div>
              <div
                className={`text-2xl font-bold flex items-center gap-2 ${
                  analytics.growthRate >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                {Math.abs(analytics.growthRate).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">vs previous week</div>
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
                    placeholder="Search by name, email, phone, or user ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2  border border-gray-700 rounded-md text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-800/30 rounded-lg">
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
                    <option value="joinedAt-desc">Newest First</option>
                    <option value="joinedAt-asc">Oldest First</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="email-asc">Email (A-Z)</option>
                    <option value="email-desc">Email (Z-A)</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">Show:</span>
                    <span className="text-sm text-white font-medium">{filteredUsers.length} users</span>
                  </div>
                </div>
              )}

              {/* Bulk Actions */}
              {selectedUsers.length > 0 && (
                <div className="mb-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg flex items-center justify-between">
                  <span className="text-blue-400">
                    {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBulkAction("delete")}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
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
                      {/* <th className="text-left p-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-600 bg-gray-800 text-white focus:ring-white/20"
                        />
                      </th> */}
                      <th
                        className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort("name")}
                      >
                        User
                      </th>
                      <th className="text-left p-4 text-gray-300 font-medium">Email</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Phone Number</th>
                      <th
                        className="text-left p-4 text-gray-300 font-medium cursor-pointer hover:text-white transition-colors"
                        onClick={() => handleSort("joinedAt")}
                      >
                        Joined Date
                      </th>
                      <th className="text-right p-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                        {/* <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded border-gray-600 bg-gray-800 text-white focus:ring-white/20"
                          />
                        </td> */}
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="font-medium text-white flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-urple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              {user.name}
                            </div>
                            {/* <div className="text-xs text-gray-500 font-mono">{user.id.slice(-8)}</div> */}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </td>
                        <td className="p-4">
                          {user.phoneNumber ? (
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Phone className="w-3 h-3" />
                              {user.phoneNumber}
                            </div>
                          ) : (
                            <div className="text-xs text-gray-500 italic">No phone number</div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-white">
                              <Calendar className="w-3 h-3" />
                              {formatDate(user.joinedAt)}
                            </div>
                            <div className="text-xs text-gray-400">{getTimeAgo(user.joinedAt)}</div>
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
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No users found</p>
                    <p className="text-sm">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-400">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
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

export default Users
