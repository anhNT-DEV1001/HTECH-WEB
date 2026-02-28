"use client";

import { motion } from "framer-motion";

export default function ServiceSection() {
  // Variant trượt từ dưới lên (cho Header & Tabs)
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Variant trượt từ trái sang phải (cho Phần Text)
  const slideRightVariant = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Variant trượt từ phải sang trái (cho Phần Image)
  const slideLeftVariant = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="section-service" className="flex flex-col items-center py-12 px-4 w-full overflow-hidden">
      {/* Header */}
      <motion.h1 
        className="text-[#1E0D01] font-bold text-3xl text-center mb-8"
        variants={fadeUpVariant as any}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        Dịch vụ HTECH cung cấp
      </motion.h1>

      {/* Tabs */}
      {/* <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-10"
        variants={fadeUpVariant as any}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <button className="px-8 py-2.5 rounded-full border border-red-400 bg-red-50 text-[#1E0D01] font-medium transition-colors hover:bg-red-100">
          Service 1
        </button>
        <button className="px-8 py-2.5 rounded-full border border-gray-400 bg-white text-[#1E0D01] font-medium transition-colors hover:bg-gray-50">
          Service 2
        </button>
        <button className="px-8 py-2.5 rounded-full border border-gray-400 bg-white text-[#1E0D01] font-medium transition-colors hover:bg-gray-50">
          Service 3
        </button>
        <button className="px-8 py-2.5 rounded-full border border-gray-400 bg-white text-[#1E0D01] font-medium transition-colors hover:bg-gray-50">
          Service 4
        </button>
      </motion.div> */}

      {/* Main Content Card */}
      <div className="w-full max-w-6xl bg-[#FFF8F6] rounded-[2rem] p-8 md:p-14 flex flex-col lg:flex-row items-center gap-10">
        
        {/* Left Column: Text (Trượt từ trái qua) */}
        <motion.div 
          className="flex-1 space-y-5"
          variants={slideRightVariant as any}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-[#1E0D01] font-bold text-2xl md:text-3xl leading-snug">
            Dịch vụ Fulfillment chuyên nghiệp dành cho TMĐT
          </h2>
          <p className="text-[#1E0D01]/80 leading-relaxed text-lg pr-0 lg:pr-10">
            HTECH được xây dựng và phát triển dựa trên nền tảng của đội ngũ trí thức trẻ, năng động, nhiệt huyết và giàu khát vọng, với hơn 10 năm kinh nghiệm trong các lĩnh vực: cung cấp và lắp đặt thiết bị an ninh – an toàn; thiết bị viễn thông và điện tử; tổ chức các triển lãm quốc tế, hội thảo chuyên ngành; và cung cấp dịch vụ tư vấn chuyên sâu.
          </p>
          <a 
            href="#" 
            className="text-[#FF5A4D] font-semibold underline underline-offset-4 decoration-2 hover:text-red-600 inline-block pt-2"
          >
            Tìm hiểu ngay
          </a>
        </motion.div>

        {/* Right Column: Images Collage (Trượt từ phải qua) */}
        <motion.div 
          className="flex-1 relative w-full h-[350px] md:h-[450px]"
          variants={slideLeftVariant as any}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Decorative Background Block */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#FFDED9]/60 rounded-xl z-0"></div>

          {/* Image 1: Top Left */}
          <img 
            src="/assets/services/s1.jpg" 
            alt="service-img-1" 
            className="absolute top-[5%] left-[5%] w-[50%] h-[45%] rounded-xl object-cover shadow-lg z-10 bg-gray-200" 
          />

          {/* Image 2: Bottom Left */}
          <img 
            src="/assets/services/s3.webp" 
            alt="service-img-2" 
            className="absolute bottom-[5%] left-[15%] w-[45%] h-[50%] rounded-xl object-cover shadow-lg z-20 bg-gray-300" 
          />

          {/* Image 3: Middle Right */}
          <img 
            src="/assets/services/s2.jpg" 
            alt="service-img-3" 
            className="absolute top-[35%] right-[5%] w-[45%] h-[35%] rounded-xl object-cover shadow-lg z-30 bg-gray-400" 
          />
        </motion.div>
        
      </div>
    </section>
  )
}