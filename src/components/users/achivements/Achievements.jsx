"use client"

const Achievements = () => {
  return (
    <>
      <div className="relative container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 md:py-20 top-[-100px] md:top-0">
        {/* Premium membership stats */}
        <div className="relative  md:mb-16">
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
          <div className="relative rounded-lg sm:rounded-xl border bg-transparent border-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 2xl:p-[90px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-1 sm:mb-2">
                  1000+
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Elite Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-1 sm:mb-2">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Premium Classes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-1 sm:mb-2">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">VIP Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-1 sm:mb-2">
                  5★
                </div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Member Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Custom breakpoint for extra small screens */
        @media (max-width: 475px) {
          .xs\\:text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
        }
      `}</style>
    </>
  )
}

export default Achievements
