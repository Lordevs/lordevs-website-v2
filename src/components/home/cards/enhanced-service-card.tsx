"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";

interface ServiceCardProps {
  title: string;
  description: string;
  mockupType: "chat" | "dashboard" | "erp" | "workflow";
  animationDelay?: number;
}

export function EnhancedServiceCard({
  title,
  description,
  mockupType,
  animationDelay = 0,
}: ServiceCardProps) {
  const getServiceImage = () => {
    switch (mockupType) {
      case "chat":
        return (
          <div className="relative h-48 w-full md:h-56">
            <img
              src="/images/services/service-1.png"
              alt=""
              className="h-full w-full md:h-56 md:w-full"
            />
          </div>
        );
      case "dashboard":
        return (
          <div className="relative h-48 md:h-56">
            <img
              src="/images/services/service-2.png"
              alt=""
              className="h-full w-full md:h-56 md:w-full"
            />
          </div>
        );
      case "erp":
        return (
          <div className="relative h-48 md:h-56">
            <img
              src="/images/services/service-3.png"
              alt=""
              className="h-full w-full md:h-56 md:w-full"
            />
          </div>
        );
      case "workflow":
        return (
          <div className="relative h-48 md:h-56">
            <img
              src="/images/services/service-4.png"
              alt=""
              className="h-full w-full md:h-56 md:w-full"
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, delay: animationDelay }}
      viewport={{ once: true }}
      className="group h-full cursor-pointer">
      {/* background: radial-gradient(59% 61% at 15.8% 14.3%, #000000 0%, #0D0D12 100%);
       */}
      <Card
        className="relative z-10 flex w-full flex-col gap-0 overflow-hidden rounded-[35px] border-2 border-transparent bg-[#181A20] py-0 shadow-lg transition-all duration-300 hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.5)] md:h-full"
        style={{
          background:
            "radial-gradient(59% 61% at 15.8% 14.3%, #000000 0%, #000000 100%)",
        }}>
        <ShineBorder
          shineColor={["#00B2FF", "#cfcfcf33", "#8F00FF", "#cfcfcf33"]}
          borderWidth={2}
          className="z-10"
        />
        <div>{getServiceImage()}</div>
        <div className="p-6 md:p-11 md:pt-6">
          {/* <div className="mb-6">{getMockupContent()}</div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-3">
            <h3 className="text-xl font-medium text-white transition-colors duration-300 group-hover:text-[#41A2F8] md:text-3xl">
              {title}
            </h3>
            <p className="text-[#AEAEB2] transition-colors duration-300 group-hover:text-gray-300 md:text-xl md:leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
