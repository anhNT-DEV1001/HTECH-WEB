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

  return (
    <motion.section
      id="hero-service-section"
      className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/services/heroServiceImg.png"
          alt="Dịch vụ HTECH"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      {/* Nội dung chính */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14">

        {/* Góc dưới trái: tiêu đề */}
        <motion.div variants={titleVariants} className="mt-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-wide">
            Dịch vụ
          </h1>
        </motion.div>
      </div>
    </motion.section>
  );
}