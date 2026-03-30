"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useClientTranslation } from "@/i18n";

interface Props {
  lng: string;
}

export default function MissionPartnerSection({ lng }: Props) {
  const { t } = useClientTranslation(lng);

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#222222] mb-6">
              {t("partner_mission_title")}
            </h2>
            <p className="text-[#666666] text-sm md:text-base leading-relaxed">
              {t("partner_mission_desc")}
            </p>
          </motion.div>

          {/* Right: Image overlapping on orange gradient background */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Orange gradient background (bg-web) */}
              <div
                className="absolute inset-0 rounded-[24px] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #ffb199 0%, #ff7e5f 30%, #EF5941 60%, #ff6b3d 100%)",
                }}
              >
                {/* Decorative shapes */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#EF5941]/80 to-transparent rounded-full -translate-x-8 translate-y-8" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#ff8a65]/60 to-transparent rounded-full translate-x-8 translate-y-8" />
                <div className="absolute top-4 right-8 w-6 h-6">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white/30">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Photo overlapping the gradient bg — with border visible */}
              <div className="relative m-3 md:m-4 rounded-[20px] overflow-hidden shadow-xl aspect-[4/3]">
                <Image
                  src="/assets/partners/event.jpg"
                  alt="HTECH Event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto mt-16 md:mt-24 border-t border-gray-200" />
    </section>
  );
}
