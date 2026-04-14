"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // Nên dùng next/image như mình đã tối ưu ở dưới
import { useClientTranslation } from "@/i18n";

export default function MissionVisionSection({ lng }: { lng: string }) {
  const { t } = useClientTranslation(lng);
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
            <h2 className="text-xl md:text-2xl font-extrabold uppercase mb-6 leading-tight">
              {t("about_vision_title")}
            </h2>
            <p className="text-sm md:text-lg text-blue-100 mb-6 leading-relaxed">
              {t("about_vision_1")}
            </p>
            <p className="text-sm md:text-lg text-blue-100 leading-relaxed">
              {t("about_vision_2")}
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
              alt={t("about_vision_alt")}
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
