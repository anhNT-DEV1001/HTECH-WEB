"use client";

import { motion, type Variants } from "framer-motion";
import { useClientTranslation } from "@/i18n";
import { getLocalizedField } from "@/common/utils/localizedField";

const buildLogoTrack = (logos: string[]) => [...logos, ...logos];

type ProjectSectionProject = {
  id?: number | string;
  thumbnail_url?: string | null;
  [key: string]: unknown;
};

type ProjectSectionClientProps = {
  lng: string;
  projects: ProjectSectionProject[];
  domesticPartnerLogos: string[];
  internationalPartnerLogos: string[];
};

export default function ProjectSectionClient({
  lng,
  projects,
  domesticPartnerLogos,
  internationalPartnerLogos,
}: ProjectSectionClientProps) {
  const { t } = useClientTranslation(lng);
  const partnerLogoFrameClass =
    "w-28 h-12 md:w-36 md:h-16 lg:w-40 lg:h-16 flex items-center justify-center shrink-0";
  const partnerLogoImageClass =
    "w-full h-full object-contain transition-all hover:scale-110 duration-300";

  const topRowTrack = buildLogoTrack(domesticPartnerLogos);
  const bottomRowTrack = buildLogoTrack(internationalPartnerLogos);

  // Các Variants Animation
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideLeftVariant: Variants = {
    hidden: { opacity: 0, x: -80 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const slideRightVariant: Variants = {
    hidden: { opacity: 0, x: 80 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section id="section-project" className="flex flex-col items-center py-16 px-4 w-full bg-white overflow-hidden">
      <div className="w-full max-w-6xl">
        
        {/* Header */}
        <motion.div 
          className="mb-10 text-left"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-[#1E0D01] font-bold uppercase text-3xl mb-2">{t('project_title')}</h2>
          <p className="text-[#1E0D01]/70 text-base">
            {t('project_subtitle')}
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8 mb-24">
          {projects && projects.length > 0 ? projects.map((project, index: number) => {
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
                variants={isReverse ? slideRightVariant : slideLeftVariant} 
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
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-[#1E0D01] font-medium uppercase text-lg text-center mb-10 px-4">
            {t('project_partners')}
          </h3>
          
          {/* Vùng chứa các Logo có hiệu ứng Loop (Marquee) */}
          <div className="w-full overflow-hidden">
            <div className="w-full overflow-hidden flex flex-col gap-10 md:gap-14 relative mask-image-gradient py-2">
                
                {/* Hàng 1 (Chạy từ phải sang trái) */}
                <div className="flex w-full overflow-hidden">
                  <div className="flex w-max gap-12 md:gap-20 items-center animate-marquee-left">
                    {topRowTrack.map((logo, idx) => (
                      <div key={`top-${idx}`} className={partnerLogoFrameClass}>
                        <img
                          src={logo}
                          alt={`Domestic partner logo ${idx + 1}`}
                          className={partnerLogoImageClass}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hàng 2 (Chạy từ trái sang phải) */}
                <div className="flex w-full overflow-hidden">
                  <div className="flex w-max gap-12 md:gap-20 items-center animate-marquee-right">
                    {bottomRowTrack.map((logo, idx) => (
                      <div key={`bottom-${idx}`} className={partnerLogoFrameClass}>
                        <img
                          src={logo}
                          alt={`International partner logo ${idx + 1}`}
                          className={partnerLogoImageClass}
                        />
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
