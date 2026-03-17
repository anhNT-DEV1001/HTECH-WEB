"use client";

import { motion, type Variants } from "framer-motion";

export default function HeroServiceSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 0.15, scale: 1, transition: { duration: 1 } }
  };

  return (
    <motion.section
      id="hero-service-section"
      className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[650px] flex items-center overflow-hidden -mt-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Background image - Fixed cover strategy */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/services/heroServiceImg.png"
          alt="Dịch vụ HTECH"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-900/50" />
      </div>

      {/* Decorative Branding Icons (Left Side) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden lg:grid grid-cols-2 gap-10">
        <motion.div variants={iconVariants} className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center p-4">
           <img src="/assets/logo.png" className="w-full h-auto grayscale brightness-200" alt="" />
        </motion.div>
        <motion.div variants={iconVariants} className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center p-4">
           <img src="/assets/logo.png" className="w-full h-auto grayscale brightness-200 rotate-90" alt="" />
        </motion.div>
        <motion.div variants={iconVariants} className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center p-4">
           <img src="/assets/logo.png" className="w-full h-auto grayscale brightness-200 rotate-180" alt="" />
        </motion.div>
        <motion.div variants={iconVariants} className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center p-4">
           <img src="/assets/logo.png" className="w-full h-auto grayscale brightness-200 -rotate-90" alt="" />
        </motion.div>
      </div>

      {/* Nội dung chính */}
      <div className="relative z-20 w-full max-w-7xl px-8 sm:px-16 md:px-24 flex flex-col justify-end h-full pt-40 pb-20">
        {/* Tiêu đề */}
        <motion.div variants={titleVariants}>
          <h1 className="text-6xl sm:text-xl md:text-2xl font-extrabold text-white drop-shadow-2xl tracking-tight uppercase">
            Dịch vụ
          </h1>
        </motion.div>
      </div>
      
      {/* Bottom wave decoration if needed, or simple gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/40 to-transparent z-10" />
    </motion.section>
  );
}