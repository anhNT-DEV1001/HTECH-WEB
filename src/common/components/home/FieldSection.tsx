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
    let intervalId : any;
    let timeoutId : any;

    const startTyping = () => {
      setDisplayedText(""); // Reset text
      i = 0;
      
      intervalId = setInterval(() => {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        
        // Khi đã gõ xong toàn bộ đoạn text
        if (i === fullText.length) {
          clearInterval(intervalId);
          // Đợi 4 giây (4000ms) rồi gọi lại hàm startTyping
          timeoutId = setTimeout(startTyping, 4000); 
        }
      }, 40); // Tốc độ gõ chữ (40ms / ký tự)
    };

    startTyping();

    return () => {
      clearInterval(intervalId as any);
      clearTimeout(timeoutId as any);
    };
  }, []);

  // Các Variants cho hiệu ứng pop up tuần tự
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Các khối field sẽ xuất hiện cách nhau 0.15s
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="section-field" className="flex flex-col items-center py-16 px-4 w-full bg-white relative overflow-hidden">
      {/* Header */}
      <motion.h2 
        className="text-[#1E0D01] font-bold text-3xl mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Lĩnh vực hoạt động
      </motion.h2>

      {/* Typing Text */}
      {/* Ghi chú: Thêm min-h-[90px] md:min-h-[60px] để vùng chứa text không bị co giật khi gõ chữ mới */}
      <div className="min-h-[90px] md:min-h-[60px] flex justify-center mb-16 w-full px-4">
        <p className="text-center text-[#1E0D01]/80 max-w-4xl text-base md:text-lg leading-relaxed inline-block">
          {displayedText}
          {/* Con trỏ nhấp nháy */}
          <span className="animate-pulse font-bold ml-1 text-gray-400">|</span>
        </p>
      </div>

      {/* Main Content Grid (Sử dụng staggerChildren) */}
      <motion.div 
        className="relative flex flex-wrap justify-center gap-x-4 gap-y-12 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }} // Chạy hiệu ứng 1 lần khi cuộn tới
      >
        
        {/* Decorative Wave Line */}
        <div className="absolute top-12 left-0 w-full hidden md:block -z-10 pointer-events-none">
          <svg width="100%" height="60" viewBox="0 0 1000 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M150 30 Q 325 -20 500 30 T 850 30" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="6 6" fill="transparent"/>
          </svg>
        </div>

        {/* Mapped Items được bọc trong thẻ motion */}
        {fields.map((field, index) => {
          const IconComponent = field.icon;
          return (
            <motion.div 
              key={index} 
              variants={itemVariants as any}
              className="flex flex-col items-center w-full sm:w-[280px] md:w-[320px] text-center z-10 px-2"
            >
              
              {/* Icon with Concentric Circles */}
              <div className="relative flex items-center justify-center w-24 h-24 mb-6 rounded-full border border-dashed border-red-300 bg-red-50/30 hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <IconComponent size={28} className="text-[#1E0D01] bg-transparent" strokeWidth={1.5} />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-semibold text-[#1E0D01] mb-3">
                {field.title}
              </h3>
              <p className="text-[#1E0D01]/70 text-sm whitespace-pre-line leading-relaxed">
                {field.description}
              </p>
              
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  )
}