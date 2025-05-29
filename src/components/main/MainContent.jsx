"use client"

import { useEffect, useState } from "react"
import MainButton from "../buttons/MainButton"

const MainContent = () => {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <main className="min-h-screen pt-5">
            {/* Hero Section */}
            <section className="relative min-h-screen max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex items-center overflow-hidden">
                {/* Subtle Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96  rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96  rounded-full blur-3xl"></div>
                </div>

                {/* Main Content Container */}
                <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h1 className="text-[8rem] md:text-[12rem] lg:text-[12rem] z-50 font-black text-gray-800/10 uppercase leading-none select-none whitespace-nowrap">
                            AuraFits
                        </h1>
                    </div>
                    {/* Left Side - Text Content */}
                    <div className="flex flex-col justify-center">
                        <div className="relative">
                            {/* Clean Professional Card */}
                            <div className="relative   shadow-xl rounded-2xl p-8 sm:p-10 lg:p-12 transition-all duration-500 ">
                                {/* Content */}
                                <div className="relative ">
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight uppercase josefin-sans-title">
                                        {[
                                            { text: "The journey", delay: "0ms" },
                                            { text: "of a", delay: "200ms", highlight: true },
                                            { text: "thousand lifts", delay: "400ms" },
                                            { text: "begins with a", delay: "600ms" },
                                            { text: "single rep", delay: "800ms", highlight: true },
                                        ].map((line, index) => (
                                            <span
                                                key={index}
                                                className={`block transition-all duration-800 ease-out ${line.highlight ? "text-[#FFD700]" : ""
                                                    }`}
                                                style={{
                                                    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                                                    opacity: isLoaded ? 1 : 0,
                                                    transitionDelay: line.delay,
                                                }}
                                            >
                                                {line.text}
                                            </span>
                                        ))}
                                    </h1>

                                    {/* Professional Subtitle */}
                                    <p
                                        className="mt-6 text-lg text-gray-300 leading-relaxed transition-all duration-800 josefin-sans-title ease-out"
                                        style={{
                                            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                                            opacity: isLoaded ? 1 : 0,
                                            transitionDelay: "1000ms",
                                        }}
                                    >
                                        Transform your body and mind with our scientifically-proven fitness programs designed for lasting
                                        results.
                                    </p>

                                    {/* Clean Button */}
                                    <div
                                        className="mt-8 transition-all duration-800 ease-out"
                                        style={{
                                            transform: isLoaded ? "translateY(0)" : "translateY(20px)",
                                            opacity: isLoaded ? 1 : 0,
                                            transitionDelay: "1200ms",
                                        }}
                                    >
                                        <MainButton text={"Start Your Journey with us"} />
                                    </div>
                                </div>

                                {/* Subtle Accent Lines */}
                                <div className="absolute top-0 left-8 w-16 h-px bg-gradient-to-r from-[#FFD700] to-transparent"></div>
                                <div className="absolute bottom-0 right-8 w-16 h-px bg-gradient-to-l from-[#FFD700] to-transparent"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Video Container */}
                    <div className="flex justify-center ">
                        <div className="relative w-full max-w-sm lg:max-w-md ">
                            {/* Cyber Frame */}
                            <div className="relative p-4 border-2 border-[#FFD700] rounded-2xl shadow-[0_0_50px_rgba(255,215,0,0.6)] overflow-hidden">
                                {/* Scanning Lines */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute w-full h-px bg-[#FFD700] animate-scan-horizontal top-1/4"></div>
                                    <div
                                        className="absolute w-full h-px bg-[#FFF500] animate-scan-horizontal top-3/4"
                                        style={{ animationDelay: "1s" }}
                                    ></div>
                                    <div className="absolute w-px h-full bg-[#FFD700] animate-scan-vertical left-1/4"></div>
                                    <div
                                        className="absolute w-px h-full bg-[#FFF500] animate-scan-vertical left-3/4"
                                        style={{ animationDelay: "1.5s" }}
                                    ></div>
                                </div>

                                {/* Video Container */}
                                <div className="relative overflow-hidden rounded-xl group">
                                    <video
                                        src="/assets/main-vid.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-auto aspect-[3/4] object-cover rounded-xl transform transition-all duration-700 hover:scale-110 hover:brightness-125"
                                        style={{
                                            filter: "contrast(1.3) brightness(1.2) saturate(1.4) hue-rotate(10deg)",
                                        }}
                                    />

                                    {/* Cyber Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 via-transparent to-[#FFF500]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Glitch Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent animate-glitch-overlay rounded-xl"></div>
                                </div>

                                {/* Floating Cyber Stats */}
                                <div className="absolute top-6 right-6 bg-black/90 backdrop-blur-sm rounded-lg p-3 border border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-float-cyber">
                                    <div className="text-lg font-bold text-[#FFD700] animate-counter-up">98%</div>
                                    <div className="text-xs text-gray-300">POWER LEVEL</div>
                                </div>

                                <div
                                    className="absolute bottom-6 left-6 bg-black/90 backdrop-blur-sm rounded-lg p-3 border border-[#FFF500] shadow-[0_0_20px_rgba(255,245,0,0.5)] animate-float-cyber"
                                    style={{ animationDelay: "1s" }}
                                >
                                    <div className="text-lg font-bold text-[#FFF500] animate-counter-up">10K+</div>
                                    <div className="text-xs text-gray-300">WARRIORS</div>
                                </div>

                                {/* Energy Particles */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(15)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1 h-1 bg-[#FFD700] rounded-full animate-energy-particle"
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                                animationDelay: `${Math.random() * 3}s`,
                                                animationDuration: `${2 + Math.random() * 2}s`,
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimal Floating Elements */}
                {/* <div className="absolute top-20 left-20 w-2 h-2 bg-[#FFD700] rounded-full opacity-40 animate-pulse"></div> */}
                <div
                    className="absolute bottom-20 right-20 w-2 h-2 bg-[#FFF500] rounded-full opacity-40 animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-10 w-1 h-1 bg-[#FFD700] rounded-full opacity-30 animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>

                {/* Professional CSS */}
                <style jsx>{`
          .josefin-sans-title {
            font-family: 'Josefin Sans', sans-serif;
            font-weight: 700;
            letter-spacing: -0.02em;
          }

          /* Smooth transitions */
          * {
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Enhanced responsive typography */
          @media (max-width: 640px) {
            .josefin-sans-title {
              line-height: 1.1;
            }
          }

          @media (max-width: 768px) {
            .josefin-sans-title {
              font-size: 2.5rem;
            }
          }
        `}</style>
            </section>
        </main>
    )
}

export default MainContent
