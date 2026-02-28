"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Khoảng thời gian xuất hiện giữa mỗi phần tử (0.2s)
      },
    },
  };

  // 2. Cấu hình hiệu ứng trượt từ dưới lên cho từng phần tử con
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Bắt đầu ở vị trí thấp hơn 50px và tàng hình
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };
  return (
    <motion.section
        id="hero-section"
        className="flex flex-col items-center bg-white bg-gradient-to-b from-transparent via-[#fde2e2] to-transparent pb-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={itemVariants as any} className="text-[#1E0D01] font-bold text-3xl">
          HTECH - GLOBAL NEXUS
        </motion.h1>
        
        <motion.small variants={itemVariants as any} className="text-[#1E0D01]/80 mt-2">
          Connecting Technologies – Shaping Sustainable Growth
        </motion.small>
        
        <motion.img
          variants={itemVariants as any}
          src="/assets/home-banner.jpg"
          alt="banner"
          className="my-10 w-[90%] max-w-4xl rounded-2xl object-cover"
        />
        
        <motion.div variants={itemVariants as any} className="text-[#1E0D01] font-bold text-2xl mb-4">
          Description
        </motion.div>
        
        <motion.small variants={itemVariants as any} className="text-wrap text-center text-[#1E0D01]/70 max-w-2xl px-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos numquam dicta, sed vero sunt
          reiciendis nisi iusto quae molestias ut voluptates fugiat recusandae magni eius hic laborum
          similique et provident.
        </motion.small>
      </motion.section>
  )
}