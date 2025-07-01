"use client";

import { useNavigate } from "react-router-dom";
import {
  bookingPlan,
  getMembershipPlans,
  getBookings,
} from "../../../api/UserApi";
import { useEffect, useState } from "react";
import { BookingConfirmationModal } from "./BookingConfirmationModal";
import { setUserData } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Membership = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [bookingStatuses, setBookingStatuses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  // const [user, setUser] = useState(null)
  const user = useSelector((state) => state.auth.user);
  // console.log('user', user);

  const token = localStorage.getItem("authToken");
  // console.log(bookingStatuses, "bookingStatuses");
  
  
  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        const response = await getMembershipPlans();
        const fetchedPlans = response.data.plans;

        const coloredPlans = fetchedPlans.map((plan, index) => {
          let color;
          switch (plan.planName.toLowerCase()) {
            case "standard":
              color = "142, 252, 204"; // Light green
              break;
            case "premium plan":
              color = "252, 208, 142"; // Orange
              break;
            case "pro":
              color = "252, 142, 239"; // Pink
              break;
            case "enterprise":
              color = "204, 142, 252"; // Purple
              break;
            default:
              color = "200, 200, 200";
          }

          return {
            ...plan,
            color,
            popular: plan.planName.toLowerCase() === "standard",
            description: Array.isArray(plan.description)
              ? plan.description.flatMap((desc) =>
                desc.split("\n").map((item) => item.trim()),
              )
              : plan.description.split("\n").map((item) => item.trim()),
          };
        });
        setPlans(coloredPlans);
      } catch (error) {
        console.error("Error fetching membership plans:", error);
      }
    };

    fetchMembershipPlans();
  }, []);

  useEffect(() => {
    if (!token) {
      
      navigate("/");
      return;
    }

    try {
      setUserData(user);
      // setUser(parsedUser);
    } catch (err) {
      console.error("Invalid user data:", err);
    }
  }, []);

  const handleBookingClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedPlan || !token) return;

    setIsBookingLoading(true);

    try {
      const response = await bookingPlan(selectedPlan._id, user.id);
      console.log("response", response);

      // const data = await response.json()

      if (response.status === 200) {
        const userId = user.id;
        const getBookingsResponse = await getBookings(userId);

        const bookingMap = getBookingsResponse.data.bookings;
        console.log("Booking map:", bookingMap);
        // Update the status for that specific plan
        setBookingStatuses((prev) => ({
          ...prev,
          ...bookingMap, // Merge all bookings
        }));

        // Show success message
        toast.success(
          "Booking request submitted successfully! Waiting for admin approval.",
        );

        // Close modal
        setIsModalOpen(false);
        setSelectedPlan(null);
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to book plan. Please try again.");
    } finally {
      setIsBookingLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        if (user?.id) {
          const res = await getBookings(user.id);
          setBookingStatuses(res.data.bookings); // ✅ whole map
        }
      } catch (err) {
        console.error("Failed to fetch user bookings:", err);
      }
    };

    fetchUserBookings();
  }, [user?.id]);

  const getButtonText = (plan) => {
    const planId = plan._id;
    const status = bookingStatuses[planId];

    switch (status) {
      case "pending":
        return "Pending Approval";
      case "confirmed":
        return "Booked";
      case "rejected":
      case "cancelled":
        return "Try Again";
      default:
        return plan.popular ? "Choose Plan" : "Get Started";
    }
  };

  const getButtonStyle = (plan) => {
    const planId = plan._id;
    const status = bookingStatuses[planId];

    const baseStyle = {
      background: `linear-gradient(135deg, rgba(${plan.color}, 0.15) 0%, rgba(${plan.color}, 0.25) 100%)`,
      border: `1px solid rgba(${plan.color}, 0.4)`,
      color: `rgba(${plan.color}, 1)`,
      boxShadow: `0 4px 12px rgba(${plan.color}, 0.15)`,
    };

    switch (status) {
      case "pending":
        return {
          ...baseStyle,
          background:
            "linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 193, 7, 0.25) 100%)",
          border: "1px solid rgba(255, 193, 7, 0.4)",
          color: "rgba(255, 193, 7, 1)",
          cursor: "not-allowed",
          opacity: 0.8,
        };
      case "booked":
        return {
          ...baseStyle,
          background:
            "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.25) 100%)",
          border: "1px solid rgba(34, 197, 94, 0.4)",
          color: "rgba(34, 197, 94, 1)",
          cursor: "not-allowed",
          opacity: 0.8,
        };
      case "rejected":
        return {
          ...baseStyle,
          background:
            "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.25) 100%)",
          border: "1px solid rgba(239, 68, 68, 0.4)",
          color: "rgba(239, 68, 68, 1)",
        };
      default:
        return baseStyle;
    }
  };

  const isButtonDisabled = (plan) => {
    const planId = plan._id || plan.id;
    const status = bookingStatuses[planId];
    return status === "pending" || status === "confirmed" || !user || !token;
  };

  // console.log("plans", plans)

  return (
    <>
      <div className="min-h-screen pt-20 text-yellow-300 overflow-hidden relative">
        {/* Layered Title - UNCHANGED */}
        <div className="relative text-center mb-20">
          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[2.5rem] md:text-[7rem] lg:text-[8rem] font-black text-gray-800/20 uppercase leading-none select-none whitespace-nowrap">
              Memberships
            </h1>
          </div>
          {/* Foreground Text */}
          <div className="relative  md:top-10 top-8 z-10 md:pt-16">
            <h2 className="text-3xl md:text-7xl lg:text-8xl font-black text-white mb-8 uppercase tracking-tight josefin-sans-title">
              MEM<span className="text-[#FFD700]">BER</span>SHIPS
            </h2>
          </div>
        </div>

        {/* Membership Cards */}
        <div className="container pt-12 mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-8xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer ${plan.popular ? "lg:scale-105" : ""}`}
                style={{
                  animation: `gentle-rise ${3 + index * 0.2}s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg"
                      style={{
                        animation: `badge-glow 2s ease-in-out infinite`,
                      }}
                    >
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className="relative h-[480px] shadow-2xl w-full max-w-[340px] mx-auto rounded-2xl border overflow-hidden backdrop-blur-sm transition-all duration-700 group-hover:backdrop-blur-md group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-2xl"
                  style={{
                    borderColor: `rgba(${plan.color}, 0.4)`,
                    background: `linear-gradient(135deg, rgba(${plan.color}, 0.08) 0%, rgba(${plan.color}, 0.03) 50%, rgba(0, 0, 0, 0.05) 100%)`,
                    boxShadow: `0 8px 32px rgba(${plan.color}, 0.1)`,
                    animation: `card-glow ${4 + index * 0.5}s ease-in-out infinite`,
                  }}
                >
                  {/* Subtle Background Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(135deg, rgba(${plan.color}, 0.1) 0%, transparent 50%, rgba(${plan.color}, 0.05) 100%)`,
                    }}
                  />

                  {/* Elegant Border Animation */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(${plan.color}, 0.3), transparent)`,
                      backgroundSize: "200% 100%",
                      animation: "border-sweep 2s ease-in-out infinite",
                    }}
                  />

                  {/* Card Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Plan Name */}
                    <div className="text-center mb-6">
                      <h3
                        className="text-2xl font-bold uppercase tracking-wider mb-2 transition-all duration-500 group-hover:scale-105"
                        style={{
                          color: `rgba(${plan.color}, 1)`,
                          textShadow: `0 2px 8px rgba(${plan.color}, 0.3)`,
                        }}
                      >
                        {plan.planName}
                      </h3>
                      <div className="text-white">
                        <span
                          className="text-4xl font-bold transition-all duration-500 group-hover:scale-110"
                          style={{
                            filter: `drop-shadow(0 2px 4px rgba(${plan.color}, 0.3))`,
                          }}
                        >
                          ${plan.price}
                        </span>
                        <span className="text-lg opacity-70 ml-1">
                          /{plan.planType}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex-1">
                      <ul className="space-y-3">
                        {plan.description.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start text-sm text-gray-300 group-hover:text-white transition-all duration-500"
                            style={{
                              animation: `feature-fade-in 0.6s ease-out`,
                              animationDelay: `${index * 0.1 + featureIndex * 0.05}s`,
                              animationFillMode: "both",
                              transform: "translateX(0)",
                            }}
                          >
                            <div
                              className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 transition-all duration-500 group-hover:scale-125"
                              style={{
                                backgroundColor: `rgba(${plan.color}, 0.8)`,
                                boxShadow: `0 0 4px rgba(${plan.color}, 0.4)`,
                              }}
                            />
                            <span className="transition-all duration-500 group-hover:translate-x-1">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Call to Action */}
                    <div
                      onClick={() => {
                        if (isButtonDisabled(plan)) {
                          // Show toast with custom message based on the reason for being disabled
                          const toastMessage = !user || !token
                            ? "Kindly login for book this plan"
                            : `This plan is currently booked or pending for approval, Please try again later.`;

                          toast.warning(toastMessage, {
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progressStyle: {
                              background: 'linear-gradient(90deg, #ff6b6b, #ff8e53)', // Gradient progress bar
                            },
                            style: {
                              background: 'transparent', // Black background
                              backdropFilter: 'blur(10px)', // Frosted glass effect
                              color: '#ffffff', // White text
                              borderRadius: '12px', // Rounded corners
                              padding: '16px', // Comfortable padding
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)', // Subtle shadow for depth
                              fontFamily: "'Inter', sans-serif", // Modern font
                              fontSize: '16px',
                              fontWeight: 500,
                              border: '1px solid #333333', // Subtle border
                            },
                            icon: '⚠️', // Custom emoji icon for warning
                          });
                        } else {
                          handleBookingClick(plan);
                        }
                      }}
                      className={`inline-block px-6 py-3 rounded-xl font-semibold uppercase tracking-wide transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg cursor-pointer`} // Always cursor-pointer since toast handles disabled state
                      style={getButtonStyle(plan)}
                      onMouseEnter={(e) => {
                        if (!isButtonDisabled(plan)) {
                          e.currentTarget.style.background = `linear-gradient(135deg, rgba(${plan.color}, 0.25) 0%, rgba(${plan.color}, 0.35) 100%)`;
                          e.currentTarget.style.boxShadow = `0 6px 20px rgba(${plan.color}, 0.25)`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isButtonDisabled(plan)) {
                          e.currentTarget.style.background = `linear-gradient(135deg, rgba(${plan.color}, 0.15) 0%, rgba(${plan.color}, 0.25) 100%)`;
                          e.currentTarget.style.boxShadow = `0 4px 12px rgba(${plan.color}, 0.15)`;
                        }
                      }}
                    >
                      {getButtonText(plan)}
                    </div>
                  </div>

                  {/* Subtle Corner Accent */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(135deg, rgba(${plan.color}, 0.3) 0%, transparent 70%)`,
                      clipPath: "polygon(100% 0%, 0% 0%, 100% 100%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Confirmation Modal */}
        <BookingConfirmationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPlan(null);
          }}
          onConfirm={handleConfirmBooking}
          plan={selectedPlan}
          user={user}
          isLoading={isBookingLoading}
        />

        {/* Professional CSS Animations */}
        <style jsx>{`
          @keyframes gentle-rise {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes card-glow {
            0%,
            100% {
              box-shadow: 0 8px 32px rgba(var(--color), 0.1);
            }
            50% {
              box-shadow: 0 12px 40px rgba(var(--color), 0.15);
            }
          }

          @keyframes badge-glow {
            0%,
            100% {
              box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
              transform: scale(1.02);
            }
          }

          @keyframes border-sweep {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          @keyframes feature-fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Membership;
