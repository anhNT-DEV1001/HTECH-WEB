"use client";

import { motion } from "framer-motion";

interface PartnerLogoSectionProps {
  title: string;
  highlight: string;
  subtitle?: string;
  logos: string[];
}

export default function PartnerLogoSection({
  title,
  highlight,
  subtitle,
  logos,
}: PartnerLogoSectionProps) {
  return (
    <section className="w-full py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#222222]">
            {title}{" "}
            <span className="text-[#EF5941]">{highlight}</span>
          </h2>
        </motion.div>

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-[#999999] text-sm md:text-base mb-8"
          >
            {subtitle}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
        >
          {logos.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex items-center justify-center bg-white rounded-xl border border-[#EF5941]/15 shadow-sm hover:shadow-[0_10px_30px_rgba(239,89,65,0.10)] transition-all duration-300 h-24 md:h-28 lg:h-32 px-4"
            >
              <img
                src={logo}
                alt={`Partner logo ${index + 1}`}
                className="max-h-12 md:max-h-14 lg:max-h-16 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
