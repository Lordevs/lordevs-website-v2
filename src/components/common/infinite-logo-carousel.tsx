import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LogoItem {
  name: string;
  logo: string;
}

interface InfiniteLogoCarouselProps {
  items: LogoItem[];
  duration?: number;
  className?: string;
  logoClassName?: string;
}

/**
 * InfiniteLogoCarousel
 * Renders an endless horizontal scrolling list of logos with hover animations.
 * Usage:
 * <InfiniteLogoCarousel items={aiLogos} duration={25} />
 * Make sure you have the `.animate-scroll-seamless` keyframes defined in your Tailwind config/CSS:
 *
 * .animate-scroll-seamless {
 *   animation: scroll-seamless linear infinite;
 * }
 * @keyframes scroll-seamless {
 *   0% { transform: translateX(0); }
 *   100% { transform: translateX(-25%); }
 * }
 */
export function InfiniteLogoCarousel({
  items,
  duration = 20,
  className = "",
  logoClassName = "",
}: InfiniteLogoCarouselProps) {
  const displayList = React.useMemo(
    () => [...items, ...items, ...items, ...items],
    [items]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className={`relative overflow-hidden ${className}`}>
      <div
        className="animate-scroll-seamless flex space-x-12"
        style={{ animationDuration: `${duration}s` }}>
        {displayList.map((item, idx) => (
          <motion.div
            key={`logo-${idx}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + (idx % items.length) * 0.1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap text-gray-400 transition-colors hover:text-white">
            <img
              src={item.logo || "/placeholder.svg"}
              alt={`${item.name} logo`}
              width={80}
              height={80}
              className={cn("h-28 w-28 object-contain", logoClassName)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
