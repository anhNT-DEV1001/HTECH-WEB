"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { htechService } from "@/common/services/htech.service";
import { useClientTranslation } from "@/i18n";
import {
  homeHeroBodyTitleClass,
  homeHeroTaglineClass,
  homeHeroTitleClass,
  homeSectionLeadClass,
} from "./homeSectionStyles";

type CompanyInfo = {
  banner?: string;
};

type CompanyInfoResponse = {
  data?: CompanyInfo;
};

export default function HeroSection({ lng }: { lng: string }) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [failedVideoUrls, setFailedVideoUrls] = useState<Record<string, true>>({});
  const { t } = useClientTranslation(lng);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = (await htechService.getCompanyInfo()) as CompanyInfoResponse;
        if (res?.data) {
          setCompanyInfo(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch company info", error);
      }
    };
    fetchCompanyInfo();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Khoảng thời gian xuất hiện giữa mỗi phần tử (0.2s)
      },
    },
  };

  // 2. Cấu hình hiệu ứng trượt từ dưới lên cho từng phần tử con
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 }, // Bắt đầu ở vị trí thấp hơn 50px và tàng hình
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    },
  };

  // Helper to resolve URL correctly
  const resolveUrl = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    let host = "";
    try {
      host = new URL(apiUrl).origin;
    } catch {
      host = apiUrl.replace(/\/api\/v1\/?$/, "");
    }
    const normalizedPath = url.replace(/\\/g, '/');
    return `${host}${normalizedPath.startsWith("/") ? normalizedPath : `/${normalizedPath}`}`;
  };

  const bannerUrl = resolveUrl(companyInfo?.banner);
  const isVideo = bannerUrl ? /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(bannerUrl) : false;
  const hasVideoError = !!(bannerUrl && failedVideoUrls[bannerUrl]);

  return (
    <motion.section
      id="hero-section"
      className="flex flex-col items-center bg-white bg-gradient-to-b from-transparent via-[#fde2e2] to-transparent pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1 variants={itemVariants} className={`${homeHeroTitleClass} px-4 pt-16`}>
        {t("home_hero_company_name")}
      </motion.h1>

      <motion.small variants={itemVariants} className={homeHeroTaglineClass}>
        {t("home_hero_tagline")}
      </motion.small>

      <motion.div
        variants={itemVariants}
        className="my-10 w-[90%] max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100"
      >
        {isVideo && !hasVideoError ? (
          <video
            key={bannerUrl} // Chuyển key vào đây để trình duyệt biết cần load lại source khi url đổi
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => {
              if (bannerUrl) {
                setFailedVideoUrls((prev) => ({ ...prev, [bannerUrl]: true }));
              }
            }}
            className="w-full h-full object-cover"
          >
            <source src={bannerUrl} />
          </video>
        ) : (
          <img
            key={bannerUrl} // Chuyển key vào đây
            src={bannerUrl || "/assets/home-banner.jpg"}
            alt="banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              // Kiểm tra tránh lặp vô hạn nếu chính file fallback cũng bị lỗi 404
              if (!img.src.includes("/assets/home-banner.jpg")) {
                img.src = "/assets/home-banner.jpg";
              }
            }}
          />
        )}
      </motion.div>

      <motion.div variants={itemVariants} className={`${homeHeroBodyTitleClass} mb-4 px-4`}>
        {t("home_hero_description_title")}
      </motion.div>

      <motion.small variants={itemVariants} className={`${homeSectionLeadClass} max-w-3xl px-4 text-wrap text-center`}>
        {t("home_hero_description")}
      </motion.small>
    </motion.section>
  )
}
