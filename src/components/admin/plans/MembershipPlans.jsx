"use client";

import { useEffect, useState } from "react";
import { Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { AddPlanModal } from "./AddPlanModal";
import { editPlan, getPlans } from "../../../api/AdminApi";
import { EditPlanModal } from "./EditPlanModal";


export default function MembershipPlans() {
  const [plans, setPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editPlan, setEditPlan] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getPlans();
        setPlans(response.data.plans || []);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  // console.log('plans:', plans);

  const handleEditClick = (plan) => {
    setEditPlan(plan);
    setEditModalOpen(true);
  };

  const handleUpdatePlan = async (planId, updatedData) => {
    try {
      const response = await editPlan(planId, updatedData);
      if (response.status === 200) {
        setPlans((prevPlans) =>
          prevPlans.map((p) => (p.id === planId ? { ...p, ...updatedData } : p))
        );
        setEditModalOpen(false);
        setEditPlan(null);
      }
    } catch (error) {
      console.error(error);

    }
  }


  // Filter plans based on search and filters
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || plan.planType === filterType;
    const matchesStatus =
      filterStatus === "all" || plan.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddPlan = (newPlan) => {
    const plan = {
      id: plans.length + 1,
      ...newPlan,
      status: "active",
      subscribers: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPlans([...plans, plan]);
  };

  const handleDeletePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const getPlanTypeColor = (type) => {
    return type === "monthly"
      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
      : "bg-purple-500/20 text-purple-400 border-purple-500/30";
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <div
      className={`flex-1 transition-all duration-500 ${sidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}
    >
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Plans Management
              </h1>
              <p className="text-gray-400 mt-1">
                Manage your subscription plans and pricing
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className=" text-white border border-gray-200 hover:bg-gray-200 hover:text-black font-medium px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Plan
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">
                Total Plans
              </div>
              <div className="text-2xl font-bold text-white">
                {plans.length}
              </div>
            </div>
            {/* <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">
                Active Plans
              </div>
              <div className="text-2xl font-bold text-green-400">
                {plans.filter((p) => p.status === "active").length}
              </div>
            </div> */}
            {/* <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">
                Total Subscribers
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {plans.reduce((sum, plan) => sum + plan.subscribers, 1)}
              </div>
            </div> */}
            {/* <div className=" border border-gray-800 rounded-lg p-4">
              <div className="text-sm font-medium text-gray-400 mb-2">
                Monthly Revenue
              </div>
              <div className="text-2xl font-bold text-purple-400">
                $
                {plans
                  .filter((p) => p.planType === "monthly")
                  .reduce((sum, plan) => sum + plan.price * plan.subscribers, 0)
                  .toFixed(2)}
              </div>
            </div> */}
          </div>

          {/* Filters and Search */}
          <div className="0 border border-gray-800 rounded-lg">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search plans..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="all">All Types</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                {/* <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select> */}
              </div>

              {/* Table */}
              <div className="rounded-md border border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800 bg-gray-800/30">
                      <th className="text-left p-4 text-gray-300 font-medium">
                        Plan Name
                      </th>
                      <th className="text-left p-4 text-gray-300 font-medium">
                        Type
                      </th>
                      <th className="text-left p-4 text-gray-300 font-medium">
                        Price
                      </th>
                      {/* <th className="text-left p-4 text-gray-300 font-medium">
                        Status
                      </th> */}
                      {/* <th className="text-left p-4 text-gray-300 font-medium">
                        Subscribers
                      </th> */}
                      <th className="text-left p-4 text-gray-300 font-medium">
                        Created
                      </th>
                      <th className="text-center p-4 text-gray-300 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlans.map((plan) => (
                      <tr
                        key={plan.id}
                        className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-white">
                              {plan.planName}
                            </div>
                            <div className="text-sm text-gray-400 truncate max-w-[200px]">
                              {plan.description}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPlanTypeColor(plan.planType)}`}
                          >
                            {plan.planType}
                          </span>
                        </td>
                        <td className="p-4 text-white font-medium">
                          ${plan.price}
                        </td>
                        {/* <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}
                          >
                            {plan.status || "pending"}
                          </span>
                        </td> */}
                        {/* <td className="p-4 text-gray-300">
                          {plan.subscribers}
                        </td> */}
                        <td className="p-4 text-gray-400">
                          {new Date(plan.createdAt).toISOString().split("T")[0]}
                        </td>

                        <td className="p-4 text-center">
                          <div className="relative inline-block">
                            <button
                              onClick={() => handleEditClick(plan)}
                              className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                            >
                              <Edit className="w-4 h-4 text-yellow-500 mr-2" />
                            </button>
                            <button
                              // onClick={() => handleDeletePlan(plan.id)}
                              className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-700 mr-2" />
                            </button>


                            {/* Dropdown Menu */}
                            {/* <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 hidden group-hover:block">
                              <div className="py-1">
                              
                              </div>
                            </div> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPlans.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No plans found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <AddPlanModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddPlan={handleAddPlan}
        />
      </div>
    </div>
  );
}
