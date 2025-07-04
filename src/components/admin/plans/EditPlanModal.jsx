"use client";

import { useState } from "react";
import { DollarSign, FileText, Tag, Calendar, X } from "lucide-react";
import { editPlan } from "../../../api/AdminApi";

export function EditPlanModal({ isOpen, onClose, onAddPlan }) {
  const [formData, setFormData] = useState({
    planName: "",
    planType: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.planName.trim()) {
      newErrors.planName = "Plan name is required";
    }
    if (!formData.planType) {
      newErrors.planType = "Plan type is required";
    }
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await editPlan({
        planName: formData.planName,
        planType: formData.planType,
        price: Number.parseFloat(formData.price),
        description: formData.description,
      });

      console.log("Plan added successfully:", response);

      onAddPlan(response.plan || formData);

      setFormData({
        planName: "",
        planType: "",
        price: "",
        description: "",
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error(
        "Error adding plan:",
        error.response?.data || error.message,
      );
      alert("Failed to add plan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        planName: "",
        planType: "",
        price: "",
        description: "",
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Add New Plan</h2>
              <p className="text-sm text-gray-400">
                Create a new subscription plan for your customers
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="planName"
              className="block text-sm font-medium text-gray-300"
            >
              Plan Name *
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                id="planName"
                type="text"
                placeholder="e.g., Premium Plan"
                value={formData.planName}
                onChange={(e) => handleInputChange("planName", e.target.value)}
                className={`w-full pl-10 pr-4 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                  errors.planName ? "border-red-500" : "border-gray-700"
                }`}
              />
            </div>
            {errors.planName && (
              <p className="text-red-400 text-sm">{errors.planName}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="planType"
                className="block text-sm font-medium text-gray-300"
              >
                Plan Type *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <select
                  id="planType"
                  value={formData.planType}
                  onChange={(e) =>
                    handleInputChange("planType", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-2 bg-gray-800 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white/20 ${
                    errors.planType ? "border-red-500" : "border-gray-700"
                  }`}
                >
                  <option value="">Select type</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              {errors.planType && (
                <p className="text-red-400 text-sm">{errors.planType}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-300"
              >
                Price ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="29.99"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 ${
                    errors.price ? "border-red-500" : "border-gray-700"
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-red-400 text-sm">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <textarea
                id="description"
                placeholder="Describe the features and benefits of this plan..."
                value={
                  Array.isArray(formData.description)
                    ? formData.description.join("\n")
                    : formData.description
                }
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className={`w-full pl-10 pr-4 py-2 bg-gray-800 border rounded-md text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-white/20 ${
                  errors.description ? "border-red-500" : "border-gray-700"
                }`}
              />
            </div>
            {errors.description && (
              <p className="text-red-400 text-sm">{errors.description}</p>
            )}
          </div>

          {(formData.planName || formData.price) && (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Preview:</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">
                    {formData.planName || "Plan Name"}
                  </h3>
                  <span className="text-lg font-bold text-white">
                    ${formData.price || "0.00"}
                    <span className="text-sm text-gray-400">
                      /{formData.planType || "month"}
                    </span>
                  </span>
                </div>
                {formData.description && (
                  <p className="text-sm text-gray-400">
                    {formData.description}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 font-medium transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
