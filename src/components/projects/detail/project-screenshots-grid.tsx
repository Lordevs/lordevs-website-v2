import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Overlay {
  text: string;
  x: number; // percent (0-100)
  y: number; // percent (0-100)
}

interface Screenshot {
  src: string;
  alt: string;
  overlays?: Overlay[];
}

interface ProjectScreenshotsProps {
  screenshots: Screenshot[];
  containerClassName?: string;
}

export function ProjectScreenshotsGrid({
  screenshots,
  containerClassName,
}: ProjectScreenshotsProps) {
  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[]>(
    new Array(screenshots.length).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setImageLoadingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <div
      className={`mx-auto grid max-w-6xl grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 ${containerClassName}`}>
      {screenshots.map((shot, idx) => (
        <div
          key={idx}
          className="relative mx-auto aspect-16/10 w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl md:max-w-none md:rounded-[32px]">
          {imageLoadingStates[idx] && (
            <Skeleton className="h-full w-full rounded-2xl md:rounded-[32px]" />
          )}
          <img
            src={shot.src}
            alt={shot.alt}
            className={cn(
              "object-cover transition-opacity duration-300",
              imageLoadingStates[idx] ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => handleImageLoad(idx)}
          />
          {shot.overlays?.map((ov, i) => (
            <div
              key={i}
              className="absolute rounded-xl border border-blue-500/20 bg-linear-to-r from-[#23243A] to-[#181A20] px-4 py-2 text-xs text-white shadow-lg"
              style={{
                left: `${ov.x}%`,
                top: `${ov.y}%`,
                transform: "translate(-50%, -50%)",
              }}>
              {ov.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
