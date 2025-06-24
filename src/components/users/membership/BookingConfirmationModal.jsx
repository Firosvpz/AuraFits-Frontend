"use client";
import { X, Check, Clock, User, CreditCard } from "lucide-react";

export function BookingConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  plan,
  user,
  isLoading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: `rgba(${plan?.color || "142, 252, 204"}, 0.2)`,
                border: `1px solid rgba(${plan?.color || "142, 252, 204"}, 0.3)`,
              }}
            >
              <Check
                className="w-4 h-4"
                style={{ color: `rgba(${plan?.color || "142, 252, 204"}, 1)` }}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Confirm Booking
              </h2>
              <p className="text-sm text-gray-400">
                Review your plan selection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Plan Details */}
          <div
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: `rgba(${plan?.color || "142, 252, 204"}, 0.05)`,
              borderColor: `rgba(${plan?.color || "142, 252, 204"}, 0.2)`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-lg font-bold uppercase"
                style={{ color: `rgba(${plan?.color || "142, 252, 204"}, 1)` }}
              >
                {plan?.planName}
              </h3>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  ${plan?.price}
                </div>
                <div className="text-sm text-gray-400">/{plan?.planType}</div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="space-y-2">
              <p className="text-sm text-gray-400 mb-2">Plan includes:</p>
              {plan?.description?.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-300"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mr-2"
                    style={{
                      backgroundColor: `rgba(${plan?.color || "142, 252, 204"}, 0.8)`,
                    }}
                  />
                  {feature}
                </div>
              ))}
              {plan?.description?.length > 3 && (
                <div className="text-sm text-gray-400">
                  +{plan.description.length - 3} more features
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">
                  Booking for:
                </span>
              </div>
              <div className="text-white font-medium">
                {user.name || user.email}
              </div>
              <div className="text-sm text-gray-400">{user.email}</div>
            </div>
          )}

          {/* Status Info */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">
                Booking Status
              </span>
            </div>
            <p className="text-sm text-gray-300">
              Your booking will be marked as{" "}
              <span className="text-yellow-400 font-medium">pending</span> and
              requires admin approval before activation.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
            style={{
              backgroundColor: `rgba(${plan?.color || "142, 252, 204"}, 0.2)`,
              border: `1px solid rgba(${plan?.color || "142, 252, 204"}, 0.4)`,
              color: `rgba(${plan?.color || "142, 252, 204"}, 1)`,
            }}
          >
            {isLoading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
