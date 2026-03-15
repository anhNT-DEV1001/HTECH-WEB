"use client";

const PLACEHOLDER = "/assets/projects/duck-project-placeholder.jpg";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function ProjectImage({ src, alt, className }: Props) {
  return (
    <img
      src={src || PLACEHOLDER}
      alt={alt}
      className={className}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        if (img.dataset.errored) return;
        img.dataset.errored = "1";
        img.src = PLACEHOLDER;
      }}
    />
  );
}
