"use client";

import { motion } from "framer-motion";
import { useClientTranslation } from "@/i18n";

interface Props {
  lng: string;
}

export default function HeroServiceSection({ lng }: Props) {
  const { t } = useClientTranslation(lng);

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] -mt-20 flex items-end overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/services/heroServiceImg.png')" }}
      />
      
      {/* Dark Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
          {/* Left: Title */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#EF5941] leading-none uppercase"
          >
            {t("service_hero_title")}
          </motion.h1>

          {/* Right: Description */}
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed max-w-md md:max-w-lg md:text-right"
          >
            {t("service_hero_desc")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}