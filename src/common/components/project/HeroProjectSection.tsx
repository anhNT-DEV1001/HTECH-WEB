"use client";

import { motion } from "framer-motion";
import { useClientTranslation } from "@/i18n";

interface Props {
  lng: string;
}

export default function HeroProjectSection({ lng }: Props) {
  const { t } = useClientTranslation(lng);

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] -mt-20 flex items-end overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[1.12] saturate-105"
        style={{ backgroundImage: "url('/assets/services/heroServiceImg.png')" }}
      />
      
      {/* Dark Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/16 to-black/5" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
          {/* Left: Title */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-title-logo-gradient hero-title-vn-safe text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase"
          >
            {t("project_hero_title")}
          </motion.h1>

          {/* Right: Description */}
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-left text-white/90 text-sm md:text-xl lg:text-xl leading-relaxed max-w-md md:max-w-lg"
          >
            {t("project_hero_desc")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
