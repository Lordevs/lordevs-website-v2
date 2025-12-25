import { useState } from "react";
import { motion } from "framer-motion";
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
  containerClassName?: string;
}

interface ProjectScreenshotsProps {
  screenshots: Screenshot[];
  containerClassName?: string;
}

export function ProjectScreenshots({
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
      className={`flex w-full flex-col items-center gap-16 ${containerClassName}`}>
      {screenshots.map((shot, idx) => (
        <motion.div
          key={idx}
          className="relative mx-auto aspect-16/10 w-full max-w-xs overflow-hidden rounded-2xl shadow-2xl md:max-w-6xl md:rounded-[65px]"
          initial={{ opacity: 0, scale: 0.96, y: 32 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.1 + idx * 0.15,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.4 }}>
          {imageLoadingStates[idx] && (
            <Skeleton className="h-full w-full rounded-2xl md:rounded-[65px]" />
          )}
          <img
            src={shot.src}
            alt={shot.alt}
            className={cn(
              "object-cover h-full w-full transition-opacity duration-300",
              imageLoadingStates[idx] ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => handleImageLoad(idx)}
          />
          {shot.overlays?.map((ov, i) => (
            <motion.div
              key={i}
              className="absolute rounded-xl border border-blue-500/20 bg-linear-to-r from-[#23243A] to-[#181A20] px-4 py-2 text-xs text-white shadow-lg"
              style={{
                left: `${ov.x}%`,
                top: `${ov.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.7 }}>
              {ov.text}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
