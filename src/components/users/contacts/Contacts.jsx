import {
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
  Dumbbell,
  Users,
  Award,
  MapPin,
  Send,
  Star,
} from "lucide-react"

export default function Contacts() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
      

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-8 border-b border-gray-800">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 p-2 rounded-lg mr-4">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Get Started</h2>
              </div>
              <p className="text-gray-300">Ready to transform? Drop us a message and we'll respond within hours.</p>
            </div>

            <div className="p-8 bg-black">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-300 uppercase tracking-wide"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-300 uppercase tracking-wide"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter last name"
                      className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="goal" className="block text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    Fitness Goal
                  </label>
                  <select className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-xl text-white focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700">
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
                    className="block text-sm font-semibold text-gray-300 uppercase tracking-wide"
                  >
                    Tell Us More
                  </label>
                  <textarea
                    id="message"
                    placeholder="Share your fitness journey, goals, and any questions you have..."
                    rows={4}
                    className="w-full px-4 py-4 bg-black border-2 border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-all duration-300 hover:border-gray-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>SEND MESSAGE</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            

            {/* Social Media */}
            <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-8 border-b border-gray-800">
                <h2 className="text-3xl font-bold text-white mb-2">Connect With Us</h2>
                <p className="text-gray-300">Join our fitness community online</p>
              </div>

              <div className="p-8 bg-black">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex flex-col items-center space-y-2"
                  >
                    <Facebook className="h-8 w-8" />
                    <span className="text-sm font-semibold">Facebook</span>
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex flex-col items-center space-y-2"
                  >
                    <Instagram className="h-8 w-8" />
                    <span className="text-sm font-semibold">Instagram</span>
                  </a>

                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex flex-col items-center space-y-2"
                  >
                    <MessageCircle className="h-8 w-8" />
                    <span className="text-sm font-semibold">WhatsApp</span>
                  </a>
                </div>

                  <div className="p-8 bg-black space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="bg-gray-900 p-3 rounded-xl group-hover:bg-red-500 transition-colors duration-300">
                    <MapPin className="h-6 w-6 text-red-500 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2 text-lg">Location</h3>
                    <p className="text-gray-300 leading-relaxed">
                      123 Elite Fitness Boulevard
                      <br />
                      Power District, Suite 500
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-gray-900 p-3 rounded-xl group-hover:bg-red-500 transition-colors duration-300">
                    <Phone className="h-6 w-6 text-red-500 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2 text-lg">Phone</h3>
                    <p className="text-gray-300">Main: +1 (555) 123-4567</p>
                    <p className="text-gray-300">Emergency: +1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 group">
                  <div className="bg-gray-900 p-3 rounded-xl group-hover:bg-red-500 transition-colors duration-300">
                    <Mail className="h-6 w-6 text-red-500 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2 text-lg">Email</h3>
                    <p className="text-gray-300">aurafits@gym.com</p>
                    <p className="text-gray-300">support@aurafitsgym.com</p>
                  </div>
                </div>

             
              </div>
              </div>
            </div>

            {/* Stats */}
            {/* <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-8 bg-black">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div className="group">
                    <div className="bg-gray-900 p-4 rounded-xl mb-4 group-hover:bg-red-500 transition-colors duration-300">
                      <Users className="h-10 w-10 text-red-500 group-hover:text-white mx-auto" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1">1,200+</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Active Members</div>
                  </div>
                  <div className="group">
                    <div className="bg-gray-900 p-4 rounded-xl mb-4 group-hover:bg-red-500 transition-colors duration-300">
                      <Award className="h-10 w-10 text-red-500 group-hover:text-white mx-auto" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1">25+</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Expert Trainers</div>
                  </div>
                  <div className="group">
                    <div className="bg-gray-900 p-4 rounded-xl mb-4 group-hover:bg-red-500 transition-colors duration-300">
                      <Star className="h-10 w-10 text-red-500 group-hover:text-white mx-auto" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1">4.9</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wide">Rating</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

     
    </div>
  )
}
