"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useClientTranslation } from "@/i18n";

export default function ShapeSection({ lng }: { lng: string }) {
  const { t } = useClientTranslation(lng);
  return (
    <section 
      id="shape-section" 
      // Background gradient tương tự như trong thiết kế
      className="w-full min-h-screen py-20 px-4 flex flex-col items-center bg-gradient-to-b from-[#fde2e2] to-white -mt-20"
    >
      <div className="w-full max-w-5xl flex flex-col items-center">
        
        {/* 1. Phần Hình Ảnh */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-lg z-0 mt-10"
        >
          {/* Thay đổi src bằng đường dẫn ảnh thực tế của bạn */}
          <img
            src="/assets/home-banner.jpg"
            alt="Hành trình của HTECH"
            // fill
            className="object-cover"
            // priority
          />
        </motion.div>

        {/* 2. Phần Thẻ Nội Dung (Overlap) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          // Sử dụng -mt-24 (margin-top âm) để kéo thẻ này đè lên ảnh
          className="relative z-10 w-11/12 md:w-full max-w-4xl bg-[#f5f5f5] rounded-[32px] p-8 md:p-14 -mt-20 md:-mt-28 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        >
          <h2 className="text-lg md:text-3xl font-bold uppercase text-[#333333] text-center mb-6">
            {t("about_shape_title")}
          </h2>
          <p className="text-[#666666] text-lg md:text-lg leading-relaxed  font-normal">
            {t("about_shape_description")}
          </p>
        </motion.div>

      </div>
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 text-center"
        >
          {/* Cột 1 */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-bold text-[#1E40AF] mb-2 flex items-center">
              <AnimatedNumber value={1000} />+
            </h3>
            <p className="text-[#666666] text-sm md:text-base font-medium">{t("about_shape_stat_1")}</p>
          </div>

          {/* Cột 2 */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-bold text-[#1E40AF] mb-2 flex items-center">
              <AnimatedNumber value={100} />+
            </h3>
            <p className="text-[#666666] text-sm md:text-base font-medium">{t("about_shape_stat_2")}</p>
          </div>

          {/* Cột 3 */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-4xl md:text-5xl font-bold text-[#1E40AF] mb-2 flex items-center">
              <AnimatedNumber value={150} />+
            </h3>
            <p className="text-[#666666] text-sm md:text-base font-medium">{t("about_shape_stat_3")}</p>
          </div>
        </motion.div>
    </section>
  );
}


function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(val) {
          // Chỉ cần check ref.current là đủ, không cần check textContent
          if (ref.current) {
            // 2. Thêm .toString() vì textContent yêu cầu kiểu string
            ref.current.textContent = Math.round(val).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
}
