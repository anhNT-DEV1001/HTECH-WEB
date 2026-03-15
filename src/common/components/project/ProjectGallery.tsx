"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER = "/assets/projects/duck-project-placeholder.jpg";

interface ProjectImageItem {
  id: number;
  image_url: string;
  alt_text?: string;
  sort_order?: number;
}

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.target as HTMLImageElement;
  if (img.dataset.errored) return;
  img.dataset.errored = "1";
  img.src = PLACEHOLDER;
}

export default function ProjectGallery({
  images,
  title,
}: {
  images: ProjectImageItem[];
  title: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const sorted = [...images].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  );

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + sorted.length) % sorted.length : 0)), [sorted.length]);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % sorted.length : 0)), [sorted.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* ── Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {sorted.map((img, i) => (
          <button
            key={img.id}
            onClick={() => open(i)}
            className="group aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF5941]"
          >
            <img
              src={img.image_url}
              alt={img.alt_text || title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={handleImgError}
            />
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={close}
        >
          {/* Image container — stop propagation so clicking image doesn't close */}
          <div
            className="relative max-w-5xl w-full mx-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={sorted[lightboxIndex].image_url}
              alt={sorted[lightboxIndex].alt_text || title}
              className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
              onError={handleImgError}
            />

            {/* Close */}
            <button
              onClick={close}
              className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg hover:bg-[#EF5941] hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Prev */}
            {sorted.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-[-52px] flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg hover:bg-[#EF5941] hover:text-white transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Next */}
            {sorted.length > 1 && (
              <button
                onClick={next}
                className="absolute right-[-52px] flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg hover:bg-[#EF5941] hover:text-white transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Counter */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60 font-medium">
              {lightboxIndex + 1} / {sorted.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
