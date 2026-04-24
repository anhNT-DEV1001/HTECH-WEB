"use client";

import type { ImgHTMLAttributes } from "react";

type ImageWithFallbackProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export default function ImageWithFallback({
  fallbackSrc = "/placeholder-image.jpg",
  src,
  alt,
  ...props
}: ImageWithFallbackProps) {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      onError={(e) => {
        const img = e.currentTarget;
        if (img.dataset.fallbackApplied === "true") return;
        img.dataset.fallbackApplied = "true";
        img.src = fallbackSrc;
      }}
    />
  );
}
