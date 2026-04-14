"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Tư vấn Đầu tư",
    description:
      "Chuyển giao công nghệ và tham gia các dự án đầu tư.",
    image: "/assets/services/slider1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Tổ chức Sự kiện",
    description:
      "Triển lãm, hội thảo, kết nối doanh nghiệp (business matching, vv...).",
    image: "/assets/services/slider2.jpg",
  },
  {
    id: 3,
    title: "Tích hợp Giải pháp",
    description:
      "Giải pháp phát triển Thành phố Thông minh (Smart City).",
    image: "/assets/services/slider3.jpg",
  },
  {
    id: 4,
    title: "Cung cấp Dịch vụ",
    description:
      "Dịch vụ visa, tổ chức tour, in ấn, thiết kế và cung cấp quà tặng, v.v.",
    image: "/assets/services/slider4.jpg",
  },
  {
    id: 5,
    title: "Dịch vụ Y tế",
    description:
      "Hoạt động của các bệnh viện, trạm y tế, các cơ sở nuôi dưỡng, điều dưỡng. Phát triển các giải pháp/ thiết bị y , y dược",
    image: "/assets/services/slider5.jpg",
  },
];

// ─── Card component ───────────────────────────────────────────────────────────
function ServiceCard({
  item,
  featured = false,
  index,
}: {
  item: ServiceItem;
  featured?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className={`
        group relative bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100
        flex flex-col cursor-pointer select-none
        ${featured ? "col-span-2" : "col-span-1"}
      `}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${featured ? "h-[220px] sm:h-[280px]" : "h-[150px] sm:h-[180px]"}`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Text */}
      <div className="p-4 sm:p-5 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg leading-snug">
          {item.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Slider (mobile horizontal drag) ─────────────────────────────────────────
function MobileSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const CARD_W = 280;
  const GAP = 16;
  const STEP = CARD_W + GAP;

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, services.length - 1));
    setActiveIdx(clamped);
    animate(x, -clamped * STEP, { type: "spring", stiffness: 260, damping: 30 });
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) goTo(activeIdx + 1);
    else if (info.offset.x > 50) goTo(activeIdx - 1);
    else goTo(activeIdx);
  };

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        ref={trackRef}
        drag="x"
        style={{ x }}
        dragConstraints={{ left: -STEP * (services.length - 1), right: 0 }}
        onDragEnd={handleDragEnd}
        className="flex gap-4 cursor-grab active:cursor-grabbing will-change-transform"
      >
        {services.map((item, i) => (
          <motion.div
            key={item.id}
            className="flex-shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 flex flex-col"
          >
            <div className="h-[170px] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            <div className="p-4 flex flex-col gap-1">
              <h3 className="font-semibold text-gray-800 text-base">{item.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === activeIdx ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop bento grid ───────────────────────────────────────────────────────
function DesktopBentoGrid() {
  // Layout: row 1 → full-width featured card; row 2 → 2 cards; row 3 → 2 cards
  const featured = services[0];
  const rest = services.slice(1);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Featured card – spans full width */}
      <ServiceCard item={featured} featured={true} index={0} />
      {/* Remaining 4 cards */}
      {rest.map((item, i) => (
        <ServiceCard key={item.id} item={item} index={i + 1} />
      ))}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ServiceSliderSection() {
  return (
    <section
      id="service-slider-section"
      className="w-full bg-[#fdf6f6] py-16 px-4 sm:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-gray-800 mb-3">
            Trải nghiệm Dịch vụ
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-l mx-auto leading-relaxed">
            HTECH được xây dựng và phát triển dựa trên nền tảng của đội ngũ trí thức trẻ, năng động, nhiệt huyết và giàu khát vọng, với hơn 10 năm kinh nghiệm trong các lĩnh vực: cung cấp và lắp đặt thiết bị an ninh – an toàn; thiết bị viễn thông và điện tử; tổ chức các triển lãm quốc tế, hội thảo chuyên ngành; và cung cấp dịch vụ tư vấn chuyên sâu.
          </p>
        </motion.div>

        {/* Desktop: bento grid | Mobile: drag slider */}
        <div className="hidden sm:block">
          <DesktopBentoGrid />
        </div>
        <div className="block sm:hidden">
          <MobileSlider />
        </div>
      </div>
    </section>
  );
}
