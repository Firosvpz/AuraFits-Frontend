"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Edit,
  User,
  MapPin,
  Dumbbell,
  Trophy,
  Target,
  Zap,
  Activity,
} from "lucide-react";
import { getUserProfile } from "../../../api/UserApi";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Added missing state
  const user = useSelector((state) => state.auth.user);
  //  console.log('userData', user);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await getUserProfile(user.id);
        // console.log("User profile fetched:", result.data)
        setUserProfile(result.data); // Store the API response
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Fallback to Redux user data if API fails
        setUserProfile(user);
      } finally {
        setLoading(false);
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    fetchUserProfile();
  }, [user]); // Added dependency

  //   console.log('userProfile', userProfile);

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Dynamic field renderer with gym-themed icons
  const renderUserField = (key, value) => {
    const skipFields = ["password", "isVerified", "__v", "_id", "token"];
    if (skipFields.includes(key)) return null;

    const getFieldIcon = (fieldKey) => {
      const iconMap = {
        name: User,
        email: Mail,
        phoneNumber: Phone,
        phone: Phone,
        joinedAt: Calendar,
        createdAt: Calendar,
        address: MapPin,
        location: MapPin,
      };
      return iconMap[fieldKey] || User;
    };

    const formatFieldName = (fieldKey) => {
      const nameMap = {
        phoneNumber: "Phone Number",
        joinedAt: "Member Since",
        createdAt: "Account Created",
      };
      return (
        nameMap[fieldKey] ||
        fieldKey
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
      );
    };

    const formatValue = (fieldKey, fieldValue) => {
      if (!fieldValue) return "Not specified";

      if (
        fieldKey.includes("At") ||
        fieldKey.includes("Date") ||
        fieldKey === "joinedAt"
      ) {
        return formatDate(fieldValue);
      }

      if (typeof fieldValue === "boolean") {
        return fieldValue ? "Yes" : "No";
      }

      return fieldValue.toString();
    };

    const IconComponent = getFieldIcon(key);

    return (
      <div
        key={key}
        className="group relative overflow-hidden bg-black backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 hover:border-yellow-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-400 mb-1">
              {formatFieldName(key)}
            </p>
            <p className="text-white font-semibold">
              {formatValue(key, value)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-yellow-400/50 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (!user && !userProfile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Profile Not Found
          </h2>
          <p className="text-gray-400">Unable to load your AuraFits profile.</p>
        </div>
      </div>
    );
  }

  // Use userProfile if available, otherwise fallback to user from Redux
  const displayUser = userProfile.user || user;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/2 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mt-[70px] mx-auto p-6">
        {/* Main Profile Card */}
        <div
          className={`relative transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-black backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden shadow-2xl">
            {/* Profile Header */}
            <div className="relative p-8">
              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-yellow-500/20 opacity-50"></div>
              <div className="absolute inset-[1px] rounded-2xl"></div>

              <div className="relative text-center">
                {/* Avatar */}
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black text-3xl font-bold shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    {displayUser.name
                      ? displayUser.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/50 to-yellow-600/50 rounded-full blur-lg opacity-50 animate-pulse"></div>
                </div>

                {/* User Info */}
                <h2 className="text-2xl font-bold text-white mb-2">
                  {displayUser.name || "AuraFits Member"}
                </h2>
                <p className="text-yellow-400 font-medium mb-6">
                  {displayUser.email || "member@aurafits.com"}
                </p>

                {/* Action Button */}
                {/* <button className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-3 rounded-xl font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25">
                  <div className="flex items-center gap-2">
                    <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Edit Profile
                  </div>
                </button> */}
              </div>
            </div>

            {/* Stats Section */}
            <div
              className={`p-6 border-b border-gray-800/50 transform transition-all duration-1000 delay-400 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Activity className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {displayUser.isVerified ? "Verified" : "Active"}
                  </div>
                  <div className="text-sm text-gray-400">Status</div>
                </div>

                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">Pro</div>
                  <div className="text-sm text-gray-400">Level</div>
                </div>

                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {displayUser.joinedAt || displayUser.createdAt
                      ? Math.floor(
                          (new Date() -
                            new Date(
                              displayUser.joinedAt || displayUser.createdAt,
                            )) /
                            (1000 * 60 * 60 * 24),
                        )
                      : 0}
                  </div>
                  <div className="text-sm text-gray-400">Days Strong</div>
                </div>

                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">Energy</div>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div
              className={`p-6 transform transition-all duration-1000 delay-600 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                Personal Information
              </h3>

              <div className="grid gap-4">
                {Object.entries(displayUser).map(([key, value], index) => (
                  <div
                    key={key}
                    className={`transform transition-all duration-500 ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    {renderUserField(key, value)}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-black p-6 text-center border-t border-gray-800/50">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Dumbbell className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">
                  Powered by AuraFits - Transform Your Body, Transform Your Life
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
