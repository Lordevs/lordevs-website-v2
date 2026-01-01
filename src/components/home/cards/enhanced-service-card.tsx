"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  mockupType: "enterprise" | "vibe" | "saas" | "ai" | "integrations";
  animationDelay?: number;
}

export function EnhancedServiceCard({
  title,
  description,
  mockupType,
  animationDelay = 0,
}: ServiceCardProps) {
  const getServiceData = () => {
    switch (mockupType) {
      case "enterprise":
        return {
          src: "/images/services/service-1.png",
          imgClass: "w-full translate-x-[5%] translate-y-4 md:translate-y-6",
        };
      case "vibe":
        return {
          src: "/images/services/service-2.png",
          imgClass: "w-[90%] md:w-[85%] translate-y-4 md:translate-y-12",
        };
      case "saas":
        return {
          src: "/images/services/service-3.png",
          imgClass: "w-[85%] translate-y-2 md:translate-y-4",
        };
      case "ai":
        return {
          src: "/images/services/service-4.png",
          imgClass: "w-[95%] translate-y-2 md:translate-y-8",
        };
      case "integrations":
        return {
          src: "/images/services/service-5.png",
          imgClass: "w-[85%] translate-y-2 md:translate-y-4",
        };
      default:
        return {
          src: "/images/services/service-1.png",
          imgClass: "w-full",
        };
    }
  };

  const { src, imgClass } = getServiceData();

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.3 }}
      className="group h-full cursor-pointer">
      <Card
        className="relative z-10 flex w-full flex-col gap-0 overflow-hidden rounded-2xl border border-[#1E72FC] bg-clip-padding backdrop-blur-[15px] transition-all duration-300 md:h-full"
        style={{
          background: "linear-gradient(111deg, rgba(77, 77, 77, 0.24) 1.21%, rgba(30, 114, 252, 0.12) 100%)",
          boxShadow: "-20px 66px 120px -80px rgba(0, 122, 255, 0.15) inset",
        }}>
        <ShineBorder
          shineColor={["#1E72FC", "#6136FF", "#8F00FF", "#ffffff"]}
          duration={8}
          borderWidth={1}
          className="z-10 opacity-60"
        />

        {/* Content Top */}
        <div className="flex flex-col px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + animationDelay }}
            viewport={{ once: true }}
            className="space-y-4">
            <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#41A2F8] md:text-3xl lg:text-4xl tracking-tight leading-tight">
              {title}
            </h3>
            <p className="text-sm text-[#B2B2B2] transition-colors duration-300 group-hover:text-gray-300 md:text-base lg:text-xl md:leading-relaxed font-medium">
              {description}
            </p>
          </motion.div>
        </div>

        {/* Mockup Bottom */}
        <div className="flex w-full items-end justify-center">
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + animationDelay }}
            viewport={{ once: true }}
            src={src}
            alt={title}
            className={cn("transition-transform duration-500 group-hover:scale-110", imgClass)}
          />
        </div>
      </Card>
    </motion.div>
  );
}
