"use client";

import { Dumbbell, Heart, Users, Waves, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import SubButton from "../buttons/SubButton";
import { useNavigate } from "react-router-dom";

const facilities = [
  {
    id: 1,
    title: "Strength Zone",
    description:
      "Premium weightlifting with Olympic equipment and professional coaching",
    icon: Dumbbell,
    image: "/assets/facilities/strength.jpg",
    color: "from-blue-500 to-cyan-500",
    time: "24/7 Access",
    location: "Ground Floor",
    features: ["Olympic Bars", "Free Weights", "Power Racks"],
  },
  {
    id: 2,
    title: "Cardio Theater",
    description: "High-tech cardio with entertainment systems and city views",
    icon: Heart,
    image: "/assets/facilities/cardio.jpg",
    color: "from-red-500 to-pink-500",
    time: "5 AM - 11 PM",
    location: "2nd Floor",
    features: ["Treadmills", "Ellipticals", "Entertainment"],
  },
  {
    id: 3,
    title: "Group Studios",
    description: "Dynamic classes with professional sound and lighting systems",
    icon: Users,
    image: "/assets/facilities/group.jpg",
    color: "from-purple-500 to-indigo-500",
    time: "6 AM - 10 PM",
    location: "3rd Floor",
    features: ["Yoga", "HIIT", "Dance Fitness"],
  },
  {
    id: 4,
    title: "Aquatic Center",
    description: "Olympic pool with aqua fitness programs and swimming lessons",
    icon: Waves,
    image: "/assets/facilities/aquatic.jpg",
    color: "from-teal-500 to-blue-500",
    time: "6 AM - 9 PM",
    location: "Basement",
    features: ["Olympic Pool", "Aqua Classes", "Swimming Lessons"],
  },
];

const Facilities = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section className="min-h-screen bg-transparent relative overflow-hidden py-10 sm:py-16 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Layered Title - RESPONSIVE */}
        <div className="relative text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[7rem] xl:text-[8rem] font-black text-gray-800/20 leading-none select-none whitespace-nowrap">
              OUR FACILITIES
            </h1>
          </div>
          {/* Foreground Text */}
          <div className="relative top-6 sm:top-8 lg:top-10 z-10 pt-8 sm:pt-12 lg:pt-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 lg:mb-8 tracking-tight josefin-sans-title">
              OUR FAC<span className="text-[#FFD700]">ILI</span>TIES
            </h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500"></div>

          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500"></div>

          {facilities.map((facility, index) => {
            const IconComponent = facility.icon;
            const isActive = activeItem === index;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={facility.id}
                className={`relative flex items-center mb-12 sm:mb-16 lg:mb-20 ${
                  // Mobile: always flex-col, Desktop: alternating
                  "flex-col lg:flex-row" +
                  (isLeft ? " lg:flex-row" : " lg:flex-row-reverse")
                }`}
                onMouseEnter={() => setActiveItem(index)}
              >
                {/* Content */}
                <div
                  className={`w-full lg:w-5/12 ${
                    isLeft ? "lg:pr-8 lg:text-right" : "lg:pl-8 lg:text-left"
                  } mb-6 lg:mb-0`}
                >
                  <div
                    className={`backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 transition-all duration-500 hover:scale-105 ${
                      isActive
                        ? "border-yellow-400/50 shadow-2xl shadow-yellow-400/20"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        // Mobile: always flex-row, Desktop: alternating
                        "flex-row lg:" +
                        (isLeft ? "flex-row-reverse" : "flex-row")
                      }`}
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${facility.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white uppercase josefin-sans-title">
                        {facility.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 mb-4 text-sm sm:text-base josefin-sans-title">
                      {facility.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs sm:text-sm josefin-sans-title text-gray-400">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{facility.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs sm:text-sm josefin-sans-title text-gray-400">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{facility.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {facility.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 sm:py-2 bg-white/10 rounded-md josefin-sans-title text-xs text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        navigate("/facilities");
                      }}
                      className="w-full py-2 px-4 rounded-lg josefin-sans-title text-white font-semibold hover:scale-105 transition-transform duration-200"
                    >
                      <SubButton text={"Explore More"} />
                    </button>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="absolute z-10 lg:left-1/2 lg:transform lg:-translate-x-1/2 left-6 transform -translate-x-1/2 lg:translate-x-0">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r ${facility.color} rounded-full border-2 sm:border-4 border-black transition-all duration-300 ${
                      isActive
                        ? "scale-125 lg:scale-150 shadow-lg shadow-current/50"
                        : "scale-100"
                    }`}
                  ></div>
                </div>

                {/* Image */}
                <div className="w-full lg:w-5/12">
                  <div
                    className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                      isActive ? "scale-105" : "scale-100"
                    }`}
                  >
                    <img
                      src={
                        facility.image ||
                        "/placeholder.svg?height=256&width=400"
                      }
                      alt={facility.title}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                        isActive ? "opacity-40" : "opacity-60"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
