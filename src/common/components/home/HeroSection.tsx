"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { htechService } from "@/common/services/htech.service";

export default function HeroSection() {
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res: any = await htechService.getCompanyInfo();
        if (res?.data) {
          setCompanyInfo(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch company info", error);
      }
    };
    fetchCompanyInfo();
  }, []);

  useEffect(() => {
    setVideoError(false);
  }, [companyInfo?.banner]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Khoảng thời gian xuất hiện giữa mỗi phần tử (0.2s)
      },
    },
  };

  // 2. Cấu hình hiệu ứng trượt từ dưới lên cho từng phần tử con
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Bắt đầu ở vị trí thấp hơn 50px và tàng hình
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  // Helper to resolve URL correctly
  const resolveUrl = (url: string) => {
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

  return (
    <motion.section
      id="hero-section"
      className="flex flex-col items-center bg-white bg-gradient-to-b from-transparent via-[#fde2e2] to-transparent pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1 variants={itemVariants as any} className="text-[#1E0D01] font-bold text-3xl">
        CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ SỰ KIỆN HTECH
      </motion.h1>

      <motion.small variants={itemVariants as any} className="text-[#1E0D01]/80 mt-2">
        Kết nối công nghệ - Kiến tạo tăng trưởng bền vững
      </motion.small>

      <motion.div
        variants={itemVariants as any}
        className="my-10 w-[90%] max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100"
      >
        {isVideo && !videoError ? (
          <video
            key={bannerUrl} // Chuyển key vào đây để trình duyệt biết cần load lại source khi url đổi
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
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

      <motion.div variants={itemVariants as any} className="text-[#1E0D01] font-bold text-2xl mb-4">
        Description
      </motion.div>

      <motion.small variants={itemVariants as any} className="text-wrap text-center text-[#1E0D01]/70 max-w-2xl px-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos numquam dicta, sed vero sunt
        reiciendis nisi iusto quae molestias ut voluptates fugiat recusandae magni eius hic laborum
        similique et provident.
      </motion.small>
    </motion.section>
  )
}