'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getLocalizedField } from '@/common/utils/localizedField';
import Link from 'next/link';

export default function NewsCarousel({ lng, newsList }: { lng: string; newsList: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || 300;
      const gap = 24;
      scrollContainerRef.current.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.children[0]?.clientWidth || 300;
      const gap = 24;
      scrollContainerRef.current.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
    }
  };

  const showArrows = newsList.length > 3;

  return (
    <div className="relative w-full flex items-center justify-center group/carousel">

      {/* Nút Previous (Mũi tên trái) */}
      {showArrows && (
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute -left-4 lg:-left-12 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 text-[#1E0D01] hover:bg-gray-50 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Cards Grid / Carousel */}
      <div
        ref={scrollContainerRef}
        className={`w-full px-4 md:px-8 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${showArrows
          ? 'flex overflow-x-auto snap-x snap-mandatory gap-6 lg:gap-8 pb-4'
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8'
          }`}
      >
        {newsList.map((item, index) => {
          const title = getLocalizedField(item, "title", lng);
          const summary = getLocalizedField(item, "summary", lng) || getLocalizedField(item, "description", lng);

          return (
            <Link
              key={item.id || index}
              href={`/${lng}/news/${item.id}`}
              className={`flex flex-col gap-4 group/card cursor-pointer ${showArrows
                ? 'shrink-0 snap-start w-[85vw] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.33rem)]'
                : ''
                }`}
            >
              <div className="w-full h-[200px] md:h-[240px] overflow-hidden rounded-[2rem]">
                <img
                  src={item.thumbnail_url || '/placeholder-image.jpg'}
                  alt={title}
                  className="w-full h-full object-cover bg-gray-200 group-hover/card:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col gap-2 px-1">
                <h3 className="text-[#1E0D01] font-bold text-lg leading-tight group-hover/card:text-[#FF4A3F] transition-colors line-clamp-2" title={title}>
                  {title}
                </h3>
                <p className="text-[#1E0D01]/60 text-sm leading-relaxed line-clamp-3">
                  {summary}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Nút Next (Mũi tên phải) */}
      {showArrows && (
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute -right-4 lg:-right-12 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 text-[#1E0D01] hover:bg-gray-50 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      )}

    </div>
  );
}
