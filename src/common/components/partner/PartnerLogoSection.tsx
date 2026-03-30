"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PartnerLogoSectionProps {
  title: string;
  highlight: string;
  subtitle?: string;
}

// Each page: 3 rows x 4 columns = 12 logos
// Simulating 3 pages of partners
const pages = [
  [
    { id: 1, label: "LOGO", type: "bold" },
    { id: 2, label: "LOGOIPSUM", type: "headline" },
    { id: 3, label: "Logoipsum", type: "logotype" },
    { id: 4, label: "Logo\nIpsum\nPlus", type: "ipsum" },
    { id: 5, label: "LOGO", type: "bold" },
    { id: 6, label: "LOGOIPSUM", type: "headline" },
    { id: 7, label: "Logoipsum", type: "logotype" },
    { id: 8, label: "Logo\nIpsum\nPlus", type: "ipsum" },
    { id: 9, label: "LOGO", type: "bold" },
    { id: 10, label: "LOGOIPSUM", type: "headline" },
    { id: 11, label: "Logoipsum", type: "logotype" },
    { id: 12, label: "Logo\nIpsum\nPlus", type: "ipsum" },
  ],
  [
    { id: 13, label: "LOGO", type: "bold" },
    { id: 14, label: "LOGOIPSUM", type: "headline" },
    { id: 15, label: "Logoipsum", type: "logotype" },
    { id: 16, label: "Logo\nIpsum\nPlus", type: "ipsum" },
    { id: 17, label: "LOGO", type: "bold" },
    { id: 18, label: "LOGOIPSUM", type: "headline" },
    { id: 19, label: "Logoipsum", type: "logotype" },
    { id: 20, label: "Logo\nIpsum\nPlus", type: "ipsum" },
    { id: 21, label: "LOGO", type: "bold" },
    { id: 22, label: "LOGOIPSUM", type: "headline" },
    { id: 23, label: "Logoipsum", type: "logotype" },
    { id: 24, label: "Logo\nIpsum\nPlus", type: "ipsum" },
  ],
  [
    { id: 25, label: "LOGO", type: "bold" },
    { id: 26, label: "LOGOIPSUM", type: "headline" },
    { id: 27, label: "Logoipsum", type: "logotype" },
    { id: 28, label: "Logo\nIpsum\nPlus", type: "ipsum" },
    { id: 29, label: "LOGO", type: "bold" },
    { id: 30, label: "LOGOIPSUM", type: "headline" },
    { id: 31, label: "Logoipsum", type: "logotype" },
    { id: 32, label: "Logo\nIpsum\nPlus", type: "ipsum" },
    { id: 33, label: "LOGO", type: "bold" },
    { id: 34, label: "LOGOIPSUM", type: "headline" },
    { id: 35, label: "Logoipsum", type: "logotype" },
    { id: 36, label: "Logo\nIpsum\nPlus", type: "ipsum" },
  ],
];

function LogoPlaceholder({ label, type }: { label: string; type: string }) {
  const getStyle = () => {
    switch (type) {
      case "bold":
        return "text-xl md:text-2xl font-black tracking-wider text-gray-800";
      case "headline":
        return "text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-gray-700";
      case "logotype":
        return "text-base md:text-lg font-medium italic text-gray-600";
      case "ipsum":
        return "text-xs md:text-sm font-semibold text-gray-500 leading-tight text-center";
      default:
        return "text-base font-medium text-gray-600";
    }
  };

  // For "logotype" type, add a small circle icon before the text
  const renderContent = () => {
    if (type === "logotype") {
      return (
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-gray-500" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 6C9.5 6 7 8 7 12s2.5 6 5 6 5-2 5-6-2.5-6-5-6z" fill="currentColor" opacity="0.3" />
            <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
          </svg>
          <span>{label}</span>
        </span>
      );
    }
    if (type === "ipsum") {
      return (
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 20 20" className="w-4 h-4 md:w-5 md:h-5 text-gray-600 shrink-0" fill="currentColor">
            <path d="M10 2L13 8H17L14 12L15 18L10 15L5 18L6 12L3 8H7L10 2Z" />
          </svg>
          <span>
            {label.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < label.split("\n").length - 1 && <br />}
              </span>
            ))}
          </span>
        </span>
      );
    }
    if (type === "bold") {
      return (
        <span className="flex items-center gap-1">
          <span className="inline-block w-5 h-5 md:w-6 md:h-6 bg-gray-800 rounded-sm mr-1 flex-shrink-0" />
          <span>{label}</span>
        </span>
      );
    }
    return <span>{label}</span>;
  };

  return (
    <div className="flex items-center justify-center bg-white rounded-xl border border-[#EF5941]/40 hover:border-[#EF5941] hover:shadow-[0_4px_16px_rgba(239,89,65,0.12)] transition-all duration-300 hover:-translate-y-0.5 h-20 md:h-24 px-4">
      <span className={getStyle()}>{renderContent()}</span>
    </div>
  );
}

export default function PartnerLogoSection({
  title,
  highlight,
  subtitle,
}: PartnerLogoSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pages.length;

  const goToPrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#222222]">
            {title}{" "}
            <span className="text-[#EF5941] italic">{highlight}</span>
          </h2>
        </motion.div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center text-[#999999] text-sm md:text-base mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Logo Grid with Pagination Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={goToPrev}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-500 hover:text-[#EF5941] hover:border-[#EF5941] transition-all duration-200"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-500 hover:text-[#EF5941] hover:border-[#EF5941] transition-all duration-200"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Grid content with animation */}
          <div className="overflow-hidden px-6 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5"
              >
                {pages[currentPage].map((logo) => (
                  <LogoPlaceholder
                    key={logo.id}
                    label={logo.label}
                    type={logo.type}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "bg-[#EF5941] scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
