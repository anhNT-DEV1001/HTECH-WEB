"use client";

import { motion } from "framer-motion";
import { useClientTranslation } from "@/i18n";
import { getLocalizedField } from "@/common/utils/localizedField";

export default function ProjectSectionClient({ lng, projects }: { lng: string; projects: any[] }) {
  const { t } = useClientTranslation(lng);

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
          <h2 className="text-[#1E0D01] font-bold text-3xl mb-2">{t('project_title')}</h2>
          <p className="text-[#1E0D01]/70 text-base">
            {t('project_subtitle')}
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8 mb-24">
          {projects && projects.length > 0 ? projects.map((project: any, index: number) => {
            const isReverse = index % 2 !== 0;
            const bgClass = index % 2 === 0 ? "bg-[#F4F5FA]" : "bg-[#F6F4FA]";

            const tag = getLocalizedField(project, "tag", lng);
            const categoryName = getLocalizedField(project, "category_name", lng);
            const title = getLocalizedField(project, "title", lng);
            const summary = getLocalizedField(project, "summary", lng) || getLocalizedField(project, "description", lng);

            return (
              <motion.div 
                key={project.id || index}
                className={`${bgClass} rounded-[2rem] p-6 md:p-10 flex flex-col items-center gap-8 md:gap-12 w-full ${
                  isReverse ? "md:flex-row-reverse" : "md:flex-row"
                }`}
                variants={isReverse ? slideRightVariant as any : slideLeftVariant as any} 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="w-full md:w-5/12 shrink-0">
                  <img 
                    src={project.thumbnail_url || '/placeholder-image.jpg'} 
                    alt={title || `Project ${index + 1}`} 
                    className="w-full h-[250px] md:h-[320px] object-cover rounded-2xl shadow-sm bg-gray-200"
                  />
                </div>
                <div className="w-full md:w-7/12 flex flex-col gap-4">
                  {tag ? (
                    <h4 className="text-[#4A1D15] font-semibold text-lg">{tag}</h4>
                  ) : categoryName ? (
                    <h4 className="text-[#4A1D15] font-semibold text-lg">{categoryName}</h4>
                  ) : null}
                  <h3 className="text-[#1E0D01] font-bold text-xl md:text-2xl md:leading-snug pr-0 md:pr-10">
                    {title || t('project_default_name')}
                  </h3>
                  <p className="text-[#1E0D01]/70 text-sm leading-relaxed line-clamp-3">
                    {summary || t('project_default_desc')}
                  </p>
                </div>
              </motion.div>
            );
          }) : (
            <p className="text-center text-gray-500">{t('project_empty')}</p>
          )}
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
            {t('project_partners')}
          </h3>
          
          {/* Vùng chứa các Logo có hiệu ứng Loop (Marquee) */}
          <div className="w-full max-w-5xl overflow-hidden flex flex-col gap-8 relative mask-image-gradient">
            
            {/* Hàng 1 (Chạy từ phải sang trái) */}
            <div className="flex w-full">
              <motion.div 
                className="flex gap-12 md:gap-20 items-center pr-12 md:pr-20 w-max"
                animate={{ x: ["0%", "-50%"] }}
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

            {/* Hàng 2 (Chạy từ trái sang phải) */}
            <div className="flex w-full">
              <motion.div 
                className="flex gap-12 md:gap-20 items-center pr-12 md:pr-20 w-max"
                animate={{ x: ["-50%", "0%"] }}
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
