import React from 'react'
import { Users,Award,Star } from "lucide-react";

const Achievements = () => {
  return (
    <>
  <div className="relative container mx-auto px-8  py-20">

        {/* Premium membership stats */}
        <div className="relative mb-16">
          <div className="absolute inset-0 rounded-3xl blur-2xl" />
          <div className="relative rounded-xl border bg-transparent border-white/10 backdrop-blur-xl p-[90px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              <div className="text-center">
                <div className="text-6xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-2">
                  1000+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Elite Members
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Premium Classes
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  VIP Access
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold bg-[#FFD700] bg-clip-text text-transparent mb-2">
                  5★
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  Member Rating
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </>
  )
}

export default Achievements