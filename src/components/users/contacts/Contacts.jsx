"use client"

import { Phone, Mail, Facebook, Instagram, MessageCircle, MapPin, Send } from "lucide-react"

export default function Contacts() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-16 md:py-20">
        {/* Layered Title - RESPONSIVE */}
          <div className="relative text-center mb-20 ">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[2.5rem] md:text-[7rem] lg:text-[8rem] font-black text-gray-800/20 leading-none select-none whitespace-nowrap">
             CONTACTS
          </h1>
        </div>
        {/* Foreground Text */}
        <div className="relative md:top-10 top-8 z-10 md:pt-16">
          <h2 className="text-3xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight josefin-sans-title">
            CON<span className="text-[#FFD700]">TA</span>CTS
          </h2>
        </div>
      </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mt-6 sm:mt-8 md:mt-[30px]">
          {/* Contact Form */}
          <div className="bg-black border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 sm:p-6 md:p-8 border-b border-gray-800">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-red-500 p-2 rounded-lg mr-3 sm:mr-4">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Get Started</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-300">
                Ready to transform? Drop us a message and we'll respond within hours.
              </p>
            </div>

            <div className="p-4 sm:p-6 md:p-8 bg-black">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-black border-2 border-gray-800 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter last name"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-black border-2 border-gray-800 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-black border-2 border-gray-800 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-black border-2 border-gray-800 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="goal"
                    className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide"
                  >
                    Fitness Goal
                  </label>
                  <select className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-black border-2 border-gray-800 rounded-lg sm:rounded-xl text-sm sm:text-base text-white focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700">
                    <option value="">Select your primary goal</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="strength">Strength Training</option>
                    <option value="endurance">Endurance</option>
                    <option value="general">General Fitness</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wide"
                  >
                    Tell Us More
                  </label>
                  <textarea
                    id="message"
                    placeholder="Share your fitness journey, goals, and any questions you have..."
                    rows={4}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-black border-2 border-gray-800 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>SEND MESSAGE</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Social Media */}
            <div className="bg-black border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 sm:p-6 md:p-8 border-b border-gray-800">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Connect With Us</h2>
                <p className="text-sm sm:text-base text-gray-300">Join our fitness community online</p>
              </div>
              <div className="p-4 sm:p-6 md:p-8 bg-black">
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex flex-col items-center space-y-2"
                  >
                    <Facebook className="h-6 w-6 sm:h-8 sm:w-8" />
                    <span className="text-xs sm:text-sm font-semibold">Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex flex-col items-center space-y-2"
                  >
                    <Instagram className="h-6 w-6 sm:h-8 sm:w-8" />
                    <span className="text-xs sm:text-sm font-semibold">Instagram</span>
                  </a>
                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex flex-col items-center space-y-2"
                  >
                    <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />
                    <span className="text-xs sm:text-sm font-semibold">WhatsApp</span>
                  </a>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start space-x-4 sm:space-x-6 group">
                    <div className="bg-gray-900 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:bg-red-500 transition-colors duration-300 flex-shrink-0">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-2 text-base sm:text-lg">Location</h3>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        123 Elite Fitness Boulevard
                        <br />
                        Power District, Suite 500
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 sm:space-x-6 group">
                    <div className="bg-gray-900 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:bg-red-500 transition-colors duration-300 flex-shrink-0">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-2 text-base sm:text-lg">Phone</h3>
                      <p className="text-sm sm:text-base text-gray-300">Main: +1 (555) 123-4567</p>
                      <p className="text-sm sm:text-base text-gray-300">Emergency: +1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 sm:space-x-6 group">
                    <div className="bg-gray-900 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:bg-red-500 transition-colors duration-300 flex-shrink-0">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-2 text-base sm:text-lg">Email</h3>
                      <p className="text-sm sm:text-base text-gray-300">aurafits@gym.com</p>
                      <p className="text-sm sm:text-base text-gray-300">support@aurafitsgym.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .josefin-sans-title {
          font-family: "Josefin Sans", sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        /* Custom breakpoint for extra small screens */
        @media (max-width: 475px) {
          .xs\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        /* Enhanced responsive typography */
        @media (max-width: 360px) {
          .josefin-sans-title {
            letter-spacing: -0.01em;
          }
        }

        /* Smooth transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
}
