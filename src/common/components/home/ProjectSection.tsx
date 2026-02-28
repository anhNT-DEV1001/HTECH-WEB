"use client";

import { motion } from "framer-motion";

export default function ProjectSection() {
  // Dữ liệu mảng cho các Project
  const projects = [
    {
      id: 1,
      tag: "VRT&CON 2025",
      title: "TRIỂN LÃM & HỘI NGHỊ QUỐC TẾ VRT&CON’2025.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      image: "/assets/services/s2.jpg",
      bgClass: "bg-[#F4F5FA]"
    },
    {
      id: 2,
      tag: "VRT&CON 2026",
      title: "TRIỂN LÃM & HỘI NGHỊ QUỐC TẾ VRT&CON’2025.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      image: "/assets/services/s2.jpg",
      bgClass: "bg-[#F6F4FA]"
    },
    {
      id: 3,
      tag: "V-SECON 2026",
      title: "Kiến tạo hệ sinh thái đổi mới để doanh nghiệp bứt phá, kết nối và phát triển bền vững.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      image: "/assets/services/s2.jpg",
      bgClass: "bg-[#F6F4FA]"
    },
    {
      id: 4,
      tag: "TOKKEN 2026",
      title: "Kiến tạo hệ sinh thái đổi mới để doanh nghiệp bứt phá, kết nối và phát triển bền vững.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      image: "/assets/services/s2.jpg",
      bgClass: "bg-[#F6F4FA]"
    }
  ];

  // Dữ liệu mảng cho Logo (chia 2 hàng)
  const topRowLogos = [
    "/logo-1.svg", "/logo-2.svg", "/logo-3.svg", "/logo-4.svg", "/logo-5.svg"
  ];
  const bottomRowLogos = [
    "/logo-6.svg", "/logo-7.svg", "/logo-8.svg", "/logo-9.svg", "/logo-1.svg" 
  ];

  // Các Variants Animation
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideLeftVariant = {
    hidden: { opacity: 0, x: -80 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const slideRightVariant = {
    hidden: { opacity: 0, x: 80 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section id="section-project" className="flex flex-col items-center py-16 px-4 w-full bg-white overflow-hidden">
      <div className="w-full max-w-6xl">
        
        {/* Header */}
        <motion.div 
          className="mb-10 text-left"
          variants={fadeUpVariant as any}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-[#1E0D01] font-bold text-3xl mb-2">Dự án của chúng tôi</h2>
          <p className="text-[#1E0D01]/70 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8 mb-24">
          {projects.map((project, index) => {
            const isReverse = index % 2 !== 0; // Thẻ số lẻ (thứ 2, 4, 6...) sẽ đảo ngược

            return (
              <motion.div 
                key={project.id}
                className={`${project.bgClass} rounded-[2rem] p-6 md:p-10 flex flex-col items-center gap-8 md:gap-12 ${
                  isReverse ? "md:flex-row-reverse" : "md:flex-row"
                }`}
                // Chẵn trượt từ trái qua, lẻ trượt từ phải qua
                variants={isReverse ? slideRightVariant as any : slideLeftVariant as any} 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="w-full md:w-5/12 shrink-0">
                  <img 
                    src={project.image} 
                    alt={`Project ${project.id}`} 
                    className="w-full h-[250px] md:h-[320px] object-cover rounded-2xl shadow-sm bg-gray-200"
                  />
                </div>
                <div className="w-full md:w-7/12 flex flex-col gap-4">
                  <h4 className="text-[#4A1D15] font-semibold text-lg">{project.tag}</h4>
                  <h3 className="text-[#1E0D01] font-bold text-xl md:text-2xl md:leading-snug pr-0 md:pr-10">
                    {project.title}
                  </h3>
                  <p className="text-[#1E0D01]/70 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Partners Section */}
        <motion.div 
          className="flex flex-col items-center w-full"
          variants={fadeUpVariant as any}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-[#1E0D01] font-medium text-lg text-center mb-10 px-4">
            Tự hào đồng hành toàn diện và đem lại tăng trưởng thành công cùng hơn 100 đối tác uy tín
          </h3>
          
          {/* Vùng chứa các Logo có hiệu ứng Loop (Marquee) */}
          <div className="w-full max-w-5xl overflow-hidden flex flex-col gap-8 relative mask-image-gradient">
            
            {/* Hàng 1 (Chạy từ phải sang trái) */}
            <div className="flex w-full">
              <motion.div 
                className="flex gap-12 md:gap-20 items-center pr-12 md:pr-20 w-max"
                animate={{ x: ["0%", "-50%"] }} // Trượt đến 50% độ rộng (vì đã nhân đôi mảng)
                transition={{ ease: "linear", duration: 15, repeat: Infinity }}
              >
                {[...topRowLogos, ...topRowLogos].map((logo, idx) => (
                  <img 
                    key={`top-${idx}`} 
                    src={logo} 
                    alt="Partner Logo" 
                    className="h-8 md:h-12 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all shrink-0" 
                  />
                ))}
              </motion.div>
            </div>

            {/* Hàng 2 (Chạy từ trái sang phải để tạo sự sinh động, hoặc bạn có thể chỉnh lại chiều x nếu muốn) */}
            <div className="flex w-full">
              <motion.div 
                className="flex gap-12 md:gap-20 items-center pr-12 md:pr-20 w-max"
                animate={{ x: ["-50%", "0%"] }} // Hàng 2 chạy ngược chiều
                transition={{ ease: "linear", duration: 18, repeat: Infinity }}
              >
                {[...bottomRowLogos, ...bottomRowLogos].map((logo, idx) => (
                  <img 
                    key={`bottom-${idx}`} 
                    src={logo} 
                    alt="Partner Logo" 
                    className="h-8 md:h-12 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all shrink-0" 
                  />
                ))}
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}