"use client";

import { motion } from "framer-motion";
import { Network, Globe2, Rocket, ShieldCheck } from "lucide-react";

// Tách data ra một mảng để code clean hơn và dễ dàng map()
const missionDetails = [
  {
    icon: Network,
    text: "Kết nối công nghệ với thị trường, tạo cầu nối hiệu quả giữa đổi mới sáng tạo và ứng dụng thực tiễn.",
  },
  {
    icon: Globe2,
    text: "Thúc đẩy hợp tác đa ngành và đa quốc gia, mở rộng cơ hội kết nối và phát triển bền vững.",
  },
  {
    icon: Rocket,
    text: "Dẫn dắt các xu hướng tiên phong tại Việt Nam, góp phần nâng cao vị thế công nghệ trong khu vực.",
  },
  {
    icon: ShieldCheck,
    text: "Đóng góp vào phát triển bền vững và nâng cao năng lực quốc gia, thông qua các nền tảng kết nối tri thức và công nghệ.",
  },
];

export default function MissionDetailsSection() {
  return (
    <section className="w-full bg-white py-12 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        
        {/* Tiêu đề của Section (Tuỳ chọn) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-xl md:text-3xl font-bold text-[#1a388a] mb-4">
            Sứ mệnh
          </h2>
        </motion.div>

        {/* Layout 2 cột cho danh sách chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {missionDetails.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                // Hiệu ứng trượt từ dưới (y: 50) lên vị trí ban đầu (y: 0)
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                // Delay tăng dần theo index để tạo hiệu ứng xuất hiện lần lượt (stagger)
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className="flex items-start p-6 bg-[#f8fafc] rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                {/* Phần Icon */}
                <div className="flex-shrink-0 w-14 h-14 bg-[#1a388a] rounded-xl flex items-center justify-center mr-6 shadow-md">
                  <IconComponent className="text-white w-7 h-7" strokeWidth={1.5} />
                </div>
                
                {/* Phần Text */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed pt-1">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}