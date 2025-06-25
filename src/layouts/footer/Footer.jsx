// import Logo from "../../components/users/logo/LOgo";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden ">
      {/* Premium membership card-style background */}
      <div className="absolute inset-0">
        {/* Base gradient similar to premium cards */}
        <div className="absolute inset-0 " />

        {/* Metallic overlay effect */}
        <div className="absolute inset-0" />

        {/* Card-like texture with subtle patterns */}
        <div className="absolute inset-0 opacity-30 ">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -skew-y-12" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/2 to-transparent transform skew-y-12" />
        </div>

        {/* Premium holographic effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent via-red-500/10 to-orange-500/10 animate-pulse" /> */}

        {/* Subtle noise texture for premium feel */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Premium border effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
      {/* <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" /> */}

      {/* Side accent lines like premium cards */}
      {/* <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-400/30 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-400/30 to-transparent" />
 */}
      {/* Floating premium elements */}
      {/* <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-red-500/15 to-orange-500/15 rounded-full blur-3xl animate-pulse delay-1000" /> */}

      {/* Main content */}
      <div className="relative container mx-auto px-8  py-20">
        {/* Premium header section */}
        {/* <div className="text-center mb-16"> */}
        {/* <div className="inline-flex items-center justify-center p-6  rounded-2xl border border-white/20 backdrop-blur-xl mb-6">
            <Logo/>
          </div> */}
        {/* <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Premium fitness experience with exclusive member benefits
          </p> */}
        {/* </div> */}

        {/* Premium content grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"> */}

        {/* <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-xl hover:border-orange-400/30 transition-all duration-500">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Elite Training</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Personalized coaching with certified professionals
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• 1-on-1 Personal Training</div>
                <div>• Custom Workout Plans</div>
                <div>• Nutrition Guidance</div>
              </div>
            </div>
          </div> */}

        {/* Premium Facilities Card */}
        {/* <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-xl hover:border-red-400/30 transition-all duration-500">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-400 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium Access</h3>
                <p className="text-gray-300 text-sm leading-relaxed">State-of-the-art equipment and exclusive areas</p>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• 24/7 Gym Access</div>
                <div>• VIP Lounge Area</div>
                <div>• Premium Equipment</div>
              </div>
            </div>
          </div> */}

        {/* Member Benefits Card */}
        {/* <div className="group relative md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-xl hover:border-orange-400/30 transition-all duration-500">
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Member Perks</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Exclusive benefits and priority services</p>
              </div>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Guest Pass Privileges</div>
                <div>• Priority Class Booking</div>
                <div>• Member Events</div>
              </div>
            </div>
          </div> */}
        {/* </div> */}

        {/* Premium membership stats */}
        <div className="relative mb-16">
          <div className="absolute inset-0 rounded-3xl blur-2xl" />
          <div className="relative rounded-xl border bg-transparent border-white/10 backdrop-blur-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-2">
                  1000+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Elite Members
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Premium Classes
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  VIP Access
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-2">
                  5★
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Member Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium footer bottom */}
        <div className="relative">
          <div className="absolute inset-0  rounded-2xl" />
          <div className="relative flex flex-col md:flex-row justify-between items-center p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="text-[#FFD700]">
                © {new Date().getFullYear()} AuraFits
              </div>
              <div className="hidden md:block w-px h-4 bg-white/20" />
              <div className="text-sm text-[#FFD700]">
                Elite Fitness Experience
              </div>
            </div>

            {/* Premium contact badge */}
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-white/20 backdrop-blur-sm">
                <span className="text-sm text-white">Member Support 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium card shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </footer>
  );
}
