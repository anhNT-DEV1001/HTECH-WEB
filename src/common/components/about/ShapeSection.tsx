"use client";

import { motion } from "framer-motion";

export default function ShapeSection() {
  return (
    <section 
      id="shape-section" 
      // Background gradient tương tự như trong thiết kế
      className="w-full min-h-screen py-20 px-4 flex flex-col items-center bg-gradient-to-b from-[#fde2e2] to-white"
    >
      <div className="w-full max-w-5xl flex flex-col items-center">
        
        {/* 1. Phần Hình Ảnh */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-lg z-0"
        >
          {/* Thay đổi src bằng đường dẫn ảnh thực tế của bạn */}
          <img
            src="/assets/home-banner.jpg"
            alt="Hành trình của HTECH"
            // fill
            className="object-cover"
            // priority
          />
        </motion.div>

        {/* 2. Phần Thẻ Nội Dung (Overlap) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          // Sử dụng -mt-24 (margin-top âm) để kéo thẻ này đè lên ảnh
          className="relative z-10 w-11/12 md:w-full max-w-4xl bg-[#f5f5f5] rounded-[32px] p-8 md:p-14 -mt-20 md:-mt-28 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        >
          <h2 className="text-lg md:text-3xl font-bold text-[#333333] text-center mb-6">
            Định hình sứ mệnh
          </h2>
          <p className="text-[#666666] text-base md:text-lg leading-relaxed text-center md:text-justify font-normal">
            HTECH được thành lập với sứ mệnh kế thừa những giá trị cốt lõi của SETECH, đồng thời tiếp tục kết nối công nghệ và giải pháp từ nhiều lĩnh vực khác nhau nhằm ứng dụng hiệu quả vào việc giải quyết các nhu cầu và thách thức tại Việt Nam. Với hơn 20 năm kinh nghiệm trong việc cung cấp và lắp đặt thiết bị an ninh – an toàn, thiết bị điện tử viễn thông; tổ chức các triển lãm quốc tế, hội thảo chuyên ngành và hoạt động tư vấn, HTECH cam kết mang đến những sự kiện và giải pháp có giá trị thực tiễn, tạo tác động tích cực và bền vững.
          </p>
        </motion.div>

      </div>
    </section>
  );
}