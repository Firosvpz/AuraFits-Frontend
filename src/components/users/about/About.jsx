"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Users,
  Target,
  Lightbulb,
  Award,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (location.pathname !== "/about") {
    return null; // Prevent rendering if not on the About page
  }

  const cards = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Our Team",
      description:
        "A diverse group of passionate professionals dedicated to excellence and innovation in everything we do.",
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      glowColor: "cyan",
      number: "01",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description:
        "To deliver cutting-edge solutions that transform businesses and create lasting value for our clients worldwide.",
      gradient: "from-purple-400 via-pink-500 to-rose-600",
      glowColor: "purple",
      number: "02",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description:
        "We push boundaries and embrace new technologies to stay ahead of the curve and drive meaningful change.",
      gradient: "from-rose-400 via-orange-500 to-yellow-600",
      glowColor: "orange",
      number: "03",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "Quality is at the heart of everything we do, ensuring exceptional results that exceed expectations.",
      gradient: "from-yellow-400 via-amber-500 to-orange-600",
      glowColor: "yellow",
      number: "04",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

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
            WHO WE ARE
          </h1>
        </div>
        {/* Foreground Text */}
        <div className="relative top-10 z-10 pt-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight josefin-sans-title">
            WHO <span className="text-[#FFD700]">WE</span> ARE
          </h2>
        </div>
      </div>

      {/* Ultra Modern Cards Section */}
      <motion.div
        style={{ y }}
        className="relative z-10 px-4 md:px-8 lg:px-16 pb-20 pt-12"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.08,
                rotateY: 8,
                rotateX: 5,
                z: 100,
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative perspective-1000 josefin-sans-title"
            >
              {/* Outer Glow */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-700`}
              />

              {/* Card Container */}
              <div
                onClick={() => {
                  navigate("/about");
                }}
                className="relative h-full cursor-pointer"
              >
                {/* Glass Card */}
                <div
                  className={`relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 h-full transition-all duration-700  group-hover:bg-black/60 overflow-hidden  ${`border border-${card.gradient}`}`}
                >
                  {/* Card Number */}
                  <div className="absolute top-6 right-6 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500">
                    {card.number}
                  </div>

                  {/* Animated Mesh Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
                  </div>

                  {/* Floating Sparkles */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" /> */}
                  </div>

                  {/* Icon Container */}
                  <motion.div
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-8"
                  >
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.gradient} p-5 shadow-2xl relative overflow-hidden`}
                    >
                      <div className="text-white relative z-10">
                        {card.icon}
                      </div>
                      {/* Inner Glow */}
                      <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Shine Effect */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-white/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-500">
                        {card.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-yellow-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} origin-left`}
                  />

                  {/* Side Accent */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${card.gradient} origin-top`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-32 text-center max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-400/10 to-yellow-500/5 rounded-[2rem] blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent rounded-[2rem]" />

            <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-12 md:p-16 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <div className="absolute top-12 right-12 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-300" />
              <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-700" />

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 2, duration: 0.8 }}
                className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight josefin-sans-title"
              >
                Driving{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Innovation
                </span>{" "}
                Forward
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 2.3, duration: 0.8 }}
                className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto josefin-sans-title"
              >
                We believe in the power of collaboration, creativity, and
                cutting-edge technology. Our journey is defined by our
                commitment to excellence and our passion for creating solutions
                that make a real difference in the world.
              </motion.p>

              {/* Animated Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 2.8, duration: 1.2 }}
                className="mt-12 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent origin-center"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: typeof window !== "undefined" ? window.innerHeight + 10 : 800,
            }}
            animate={{
              y: -10,
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 15,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
