"use client";

import { motion } from "framer-motion";
import { useClientTranslation } from "@/i18n";

interface Props {
  lng: string;
}

export default function HeroJobsSection({ lng }: Props) {
  const { t } = useClientTranslation(lng);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="flex flex-col items-center justify-center pt-16 pb-20 bg-gradient-to-b from-[#FFF0ED] via-[#FFF8F6] to-white"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={itemVariants as any}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E0D01] text-center px-4"
      >
        {t("jobs_hero_title_1")}{" "}
        <span className="italic text-[#1E0D01]">{t("jobs_hero_title_2")}</span>{" "}
        {t("jobs_hero_title_3")}
      </motion.h1>

      <motion.p
        variants={itemVariants as any}
        className="mt-4 text-[#1E0D01]/60 text-base sm:text-lg text-center max-w-xl px-4"
      >
        {t("jobs_hero_subtitle")}
      </motion.p>
    </motion.section>
  );
}
