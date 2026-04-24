"use client"; // Đừng quên thêm dòng này vì ta dùng useState, useEffect và Framer Motion

import { motion, type Variants } from "framer-motion";
import { TrendingUp, CalendarDays, Lightbulb, Headset, BriefcaseMedical } from 'lucide-react';
import { useClientTranslation } from "@/i18n";
import {
  homeCardBodyClass,
  homeCardTitleClass,
  homeSectionLeadClass,
  homeSectionTitleClass,
} from "./homeSectionStyles";

export default function FieldSection({ lng }: { lng: string }) {
  const { t } = useClientTranslation(lng);
  const fields = [
    {
      icon: TrendingUp,
      title: t("home_field_1_title"),
      description: t("home_field_1_description")
    },
    {
      icon: CalendarDays,
      title: t("home_field_2_title"),
      description: t("home_field_2_description")
    },
    {
      icon: Lightbulb,
      title: t("home_field_3_title"),
      description: t("home_field_3_description")
    },
    {
      icon: Headset,
      title: t("home_field_4_title"),
      description: t("home_field_4_description")
    },
    {
      icon: BriefcaseMedical,
      title: t("home_field_5_title"),
      description: t("home_field_5_description")
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="section-field" className="flex flex-col items-center py-16 px-4 w-full bg-gradient-to-b from-transparent via-[#fde2e2] to-transparent relative overflow-hidden">
      {/* Header */}
      <motion.h2
        className={`${homeSectionTitleClass} mb-6 text-center`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t("home_field_title")}
      </motion.h2>

      {/* Typing Text */}
      <div className="min-h-[90px] md:min-h-[60px] flex justify-center mb-16 w-full px-4">
        <p className={`${homeSectionLeadClass} inline-block max-w-4xl text-center`}>
          {t("home_field_intro")}
        </p>
      </div>

      {/* Main Content Grid */}
      <motion.div
        className="relative flex flex-wrap justify-center gap-x-4 gap-y-12 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >

        {/* Decorative Wave Line */}
        <div className="absolute top-12 left-0 w-full hidden md:block -z-10 pointer-events-none text-[#EF5941]">
          {/* <svg width="100%" height="60" viewBox="0 0 1000 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M150 30 Q 325 -20 500 30 T 850 30" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="6 6" fill="transparent"/>
          </svg> */}
        </div>

        {/* CÁC ITEM ĐÃ ĐƯỢC NÂNG CẤP HIỆU ỨNG HOVER */}
        {fields.map((field, index) => {
          const IconComponent = field.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative z-10 flex w-full cursor-pointer flex-col items-center overflow-hidden rounded-[28px] border border-[#EF5941]/10 bg-transparent px-5 py-7 text-center transition-all duration-500 sm:w-[280px] md:w-[320px] hover:border-[#EF5941]/30 hover:shadow-[0_24px_60px_rgba(239,89,65,0.16)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-10 -top-8 h-28 w-28 rounded-full bg-[#EF5941]/16 blur-3xl" />
                <div className="absolute -left-8 bottom-6 h-24 w-24 rounded-full bg-[#1E0D01]/8 blur-3xl" />
                <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#EF5941] to-transparent" />
              </div>

              {/* Vùng chứa Icon */}
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">

                <div className="absolute inset-0 rounded-full border border-dashed border-[#EF5941]/45 bg-[#EF5941]/6 transition-transform duration-700 ease-in-out group-hover:rotate-180"></div>
                <div className="absolute inset-3 rounded-full border border-[#EF5941]/15 transition-all duration-500 group-hover:scale-110 group-hover:border-[#EF5941]/40"></div>

                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#EF5941]/8 shadow-sm transition-all duration-500 group-hover:bg-[#EF5941] group-hover:shadow-[0_12px_30px_rgba(239,89,65,0.32)]">
                  <IconComponent
                    size={28}
                    className="text-[#EF5941] group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Text Content */}
              <h3 className={`${homeCardTitleClass} mb-3 text-[#EF5941] transition-colors duration-300 group-hover:text-[#d44830]`}>
                {field.title}
              </h3>
              <p className={`${homeCardBodyClass} whitespace-pre-line transition-colors duration-300 group-hover:text-[#1E0D01]`}>
                {field.description}
              </p>

            </motion.div>
          );
        })}
      </motion.div>
    </section>
  )
}
