"use client"; // Đừng quên thêm dòng này vì ta dùng useState, useEffect và Framer Motion

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, CalendarDays, Lightbulb, Headset, BriefcaseMedical, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function FieldSection() {
  const fields = [
    {
      icon: TrendingUp,
      title: "Tư vấn đầu tư",
      description: "Chuyển giao công nghệ và tham gia các dự án đầu tư"
    },
    {
      icon: CalendarDays,
      title: "Tổ chức sự kiện",
      description: "Triển lãm, hội thảo, kết nối doanh nghiệp\n(business matching)"
    },
    {
      icon: Lightbulb,
      title: "Tích hợp giải pháp",
      description: "Giải pháp phát triển Thành phố\nThông minh (Smart City)"
    },
    {
      icon: Headset,
      title: "Cung cấp dịch vụ",
      description: "Dịch vụ visa, tổ chức tour, in ấn, thiết kế\nvà cung cấp quà tặng"
    },
    {
      icon: BriefcaseMedical,
      title: "Y tế",
      description: "Hoạt động của các bệnh viện, trạm y tế,\ncác cơ sở nuôi dưỡng, điều dưỡng."
    }
  ];

  // Logic cho hiệu ứng Typing (Gõ chữ)
  const fullText = "HTECH được xây dựng và phát triển dựa trên nền tảng của đội ngũ trí thức trẻ, năng động, nhiệt huyết và giàu khát vọng, với hơn 10 năm kinh nghiệm trong đa dạng các lĩnh vực.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    let intervalId: any;
    let timeoutId: any;

    const startTyping = () => {
      setDisplayedText("");
      i = 0;

      intervalId = setInterval(() => {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;

        if (i === fullText.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(startTyping, 4000);
        }
      }, 40);
    };

    startTyping();

    return () => {
      clearInterval(intervalId as any);
      clearTimeout(timeoutId as any);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="section-field" className="flex flex-col items-center py-16 px-4 w-full bg-gradient-to-b from-transparent via-[#fde2e2] to-transparent relative overflow-hidden">
      {/* Header */}
      <motion.h2
        className="text-[#1E0D01] font-bold text-3xl mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        LĨNH VỰC HOẠT ĐỘNG
      </motion.h2>

      {/* Typing Text */}
      <div className="min-h-[90px] md:min-h-[60px] flex justify-center mb-16 w-full px-4">
        <p className="text-center text-[#1E0D01]/80 max-w-4xl text-base md:text-lg leading-relaxed inline-block">
          {/* {displayedText} */}
          HTECH được xây dựng và phát triển dựa trên nền tảng của đội ngũ trí thức trẻ, năng động, nhiệt huyết và giàu khát vọng, với hơn 10 năm kinh nghiệm trong đa dạng các lĩnh vực.
          <span className="animate-pulse font-bold ml-1 text-gray-400"></span>
        </p>
      </div>

      {/* Main Content Grid */}
      <motion.div
        className="relative flex flex-wrap justify-center gap-x-4 gap-y-12 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >

        {/* Decorative Wave Line */}
        <div className="absolute top-12 left-0 w-full hidden md:block -z-10 pointer-events-none text-[#EF5941]">
          {/* <svg width="100%" height="60" viewBox="0 0 1000 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M150 30 Q 325 -20 500 30 T 850 30" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="6 6" fill="transparent"/>
          </svg> */}
        </div>

        {/* CÁC ITEM ĐÃ ĐƯỢC NÂNG CẤP HIỆU ỨNG HOVER */}
        {fields.map((field, index) => {
          const IconComponent = field.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants as any}
              whileHover={{ y: -10 }} // Framer Motion: Nhấc khối lên 10px khi hover
              className="group flex flex-col items-center w-full sm:w-[280px] md:w-[320px] text-center z-10 px-4 py-6 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-[0_20px_40px_rgba(239,89,65,0.12)]"
            >

              {/* Vùng chứa Icon */}
              <div className="relative flex items-center justify-center w-24 h-24 mb-6">

                {/* Vòng đứt nét bên ngoài: Thêm hiệu ứng xoay 180 độ khi hover */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#EF5941]/50 bg-[#EF5941]/5 group-hover:rotate-180 transition-transform duration-700 ease-in-out"></div>

                {/* Khối chứa Icon bên trong: Đổi thành nền đỏ, icon trắng khi hover */}
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-sm bg-transparent group-hover:bg-[#EF5941] transition-colors duration-300">
                  <IconComponent
                    size={28}
                    className="text-[#EF5941] group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-semibold text-[#EF5941] mb-3 group-hover:text-[#d44830] transition-colors duration-300">
                {field.title}
              </h3>
              <p className="text-[#1E0D01]/70 text-sm whitespace-pre-line leading-relaxed group-hover:text-[#1E0D01] transition-colors duration-300">
                {field.description}
              </p>

            </motion.div>
          );
        })}
      </motion.div>
    </section>
  )
}