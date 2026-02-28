"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // Nên dùng next/image như mình đã tối ưu ở dưới
import MissionDetailsSection from "./MissionDetail";

export default function MissionVisionSection() {
  return (
    <section
      id="mission-section"
      className="w-full  bg-[#1a388a] text-white py-24 px-6 md:px-12 flex items-center overflow-hidden"
    >
      <div className="container mx-auto">
        {/* Sử dụng flex thay vì grid để dễ dàng ép 2 khối sát vào nhau */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          
          {/* Section Nội dung Text - Nằm dưới và sát vào ảnh */}
          <motion.div
              // z-0 và md:-mr-12 (margin right âm) để khối này chui nhẹ xuống dưới bức ảnh
            className="w-full md:w-6/12 bg-[#132d73] p-10 md:p-12 lg:p-14 rounded-[40px] z-0 relative md:-mr-12 shadow-xl mb-10 md:mb-0"
            initial={{ x: 200, opacity: 0 }} // Text trượt phải sang trái
            whileInView={{ x: 0, opacity: 1 }} 
            viewport={{ once: true, amount: 0.3 }} 
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          >
            <h2 className="text-xl md:text-2xl font-extrabold mb-6 leading-tight">
              Tầm nhìn
            </h2>
            <p className="text-sm md:text-lg text-blue-100 mb-6 leading-relaxed">
              HTECH hướng tới trở thành công ty công nghệ khát vọng nâng tầm trí tuệ Việt Nam trên thế giới.
            </p>
            <p className="text-sm md:text-lg text-blue-100 leading-relaxed">
              Đồng hành cùng các Doanh nghiệp, Tập Đoàn kinh doanh thành công trên nền tảng số, đồng thời mang đến cơ hội phát triển sự nghiệp cả về chuyên môn và vật chất cho Cán Bộ Nhân Viên.
            </p>
          </motion.div>

          {/* Section Hình ảnh - Đè lên Text và có height lớn hơn */}
          <motion.div
            // z-10 để đè lên text, fix cứng chiều cao (h-...) để nó luôn cao hơn box text
            className="w-full md:w-6/12 relative z-10 h-[250px] md:h-[350px] lg:h-[450px] rounded-[40px] overflow-hidden shadow-2xl"
            initial={{ x: -200, opacity: 0 }} // Ảnh trượt trái sang phải
            whileInView={{ x: 0, opacity: 1 }} 
            viewport={{ once: true, amount: 0.3 }} 
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Đã sửa đường dẫn thành tuyệt đối (/assets/...) và dùng thẻ Image của Next.js */}
            <Image
              src="/assets/abouts/img.jpeg" 
              alt="HTECH Tầm nhìn và sứ mệnh"
              fill
              className="object-cover filter"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}