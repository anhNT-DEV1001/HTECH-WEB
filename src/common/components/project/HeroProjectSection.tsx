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

  return (
    <motion.section
      id="hero-project-section"
      className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/services/heroServiceImg.png"
          alt="Dự án HTECH"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay đậm hơn ở dưới */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/55 to-slate-800/30" />
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end p-6 sm:p-10 md:p-14 gap-3">

        {/* Tiêu đề chính */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
        >
          <span className="text-white">Dự án </span>
          <span className="text-[#EF5941]">của chúng tôi</span>
        </motion.h1>

        {/* Đường kẻ trang trí */}
        <motion.div
          variants={lineVariants}
          style={{ transformOrigin: "left" }}
          className="h-[3px] w-20 rounded-full bg-[#EF5941]"
        />

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-sm sm:text-base text-white/70 leading-relaxed"
        >
          Khám phá các dự án tiêu biểu mà HTECH đã triển khai — từ giải pháp phần mềm đến hệ thống công nghệ thực tiễn.
        </motion.p>
      </div>
    </motion.section>
  );
}