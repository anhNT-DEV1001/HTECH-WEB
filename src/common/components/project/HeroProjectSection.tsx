"use client";

import { motion, Variants } from "framer-motion";

export default function HeroProjectSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 0.15, scale: 1, transition: { duration: 1 } }
  };

  return (
    <motion.section
      id="hero-project-section"
      className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[650px] flex items-center overflow-hidden -mt-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/services/heroServiceImg.png"
          alt="Dự án HTECH"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Gradient overlay đậm hơn ở dưới */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/50 to-slate-800/20" />
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
      <div className="relative z-20 w-full max-w-7xl px-8 sm:px-16 md:px-24 flex flex-col justify-end h-full pt-40 pb-20 gap-4">

        {/* Tiêu đề chính */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-xl md:text-2xl font-extrabold leading-tight tracking-tighter drop-shadow-2xl uppercase"
        >
          <span className="text-white">Dự án </span>
          <span className="text-[#EF5941]">của chúng tôi</span>
        </motion.h1>

        {/* Đường kẻ trang trí */}
        <motion.div
          variants={lineVariants}
          style={{ transformOrigin: "left" }}
          className="h-[4px] w-32 rounded-full bg-[#EF5941]"
        />

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed font-medium"
        >
          Khám phá các dự án tiêu biểu mà HTECH đã triển khai — từ giải pháp phần mềm đến hệ thống công nghệ thực tiễn.
        </motion.p>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/40 to-transparent z-10" />
    </motion.section>
  );
}