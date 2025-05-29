"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import "./Trainers.css"
import { trainersData } from "../../constants/trainersApi"

const Trainers = () => {
  return (
    <div className="min-h-screen pt-20  text-yellow-300 overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
                        linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)
                    `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Layered Title - UNCHANGED */}
      <div className="relative text-center mb-20">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-[3rem] md:text-[7rem] lg:text-[8rem] font-black text-gray-800/20 leading-none select-none whitespace-nowrap">
            MEET THE TEAM
          </h1>
        </div>
        {/* Foreground Text */}
        <div className="relative top-10 z-10 pt-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight josefin-sans-title">
            MEET <span className="text-[#FFD700]">THE</span> TEAM
          </h2>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainersData.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true }}
              className="trainer-card group"
            >
              <div className="card-content">
                {/* Front Side - Image and Name Only */}
                <div className="card-front">
                  {/* 3D Background Effects */}
                  <div className="front-bg-effects">
                    {/* Floating Particles */}
                    <div className="floating-particles">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className={`particle particle-${i + 1}`}></div>
                      ))}
                    </div>

                    {/* Gradient Waves */}
                    {/* <div className="gradient-waves">
                      <div className="wave wave-1"></div>
                      <div className="wave wave-2"></div>
                      <div className="wave wave-3"></div>
                    </div> */}
                  </div>

                  {/* Content Container */}
                  <div className="front-content">
                    {/* Image and Name Side by Side */}
                    {/* Remove the `trainer-info-layout` div structure */}
                    {/* Create a full-height image container */}
                    <motion.div
                      className="trainer-image-container"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      <img
                        src={trainer.image || "/placeholder.svg"}
                        alt={trainer.name}
                        className="trainer-image opacity-80 full-height-image "
                      />
                      {/* <div className="image-glow"></div> */}
                    </motion.div>

                    {/* Position name and experience absolutely at the top */}
                    <motion.div
                      className="trainer-name-experience"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    >
                      <h3 className="trainer-name text-[#FFD700] josefin-sans-title">{trainer.name}</h3>
                      <span className="trainer-experience bolkit absolute right-[-30px] top-0 rotate-45">{trainer.experience}</span>
                    </motion.div>

                    {/* Hover Indicator */}
                    <motion.div
                      className="hover-indicator"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <span>Hover for details</span>
                      <div className="pulse-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* 3D Corner Elements */}
                  <div className="corner-3d top-left"></div>
                  <div className="corner-3d bottom-right"></div>
                </div>

                {/* Back Side - Details View */}
                <div className="card-back">
                  {/* Animated Background Elements */}
                 

                  <div className="back-content">
                    {/* Header */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl  text-[#FFD700] mb-1 tracking-wide">{trainer.name}</h3>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-2"></div>
                      <p className="text-yellow-400 text-sm font-bold">{trainer.title}</p>
                    </div>

                    {/* Session Info */}
                    <div className="mb-3 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Price:</span>
                        <span className="text-yellow-400 font-black text-lg">{trainer.price}</span>
                      </div>
                    </div>

                    {/* Booking Button */}
                    <button
                     
                      className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-black py-2 px-4 rounded-xl transition-all duration-500 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-300 hover:shadow-xl hover:shadow-yellow-400/30 transform hover:scale-105 relative overflow-hidden text-sm"
                    >
                      <span className="relative z-10">BOOK SESSION</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: typeof window !== "undefined" ? window.innerHeight + 10 : 800,
            }}
            animate={{
              y: -10,
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            }}
            transition={{
              duration: Math.random() * 25 + 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 25,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Trainers
