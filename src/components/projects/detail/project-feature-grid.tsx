"use client";

import { motion } from "framer-motion";
import Icon from "@/components/ui/icon";
import { TiltCard } from "@/components/common/tilt-card";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface ProjectFeatureGridProps {
  features: Feature[];
}

export function ProjectFeatureGrid({ features }: ProjectFeatureGridProps) {
  return (
    <motion.div
      className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-x-24 gap-y-10 px-2 py-12 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 48 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.15,
            duration: 0.7,
            ease: "easeOut",
          },
        },
      }}
      viewport={{ once: true, amount: 0.3 }}>
      {features.map((f, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 32 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            },
          }}>
          <TiltCard className="mx-auto w-fit">
            <div className="h-full min-h-[180px] max-w-[325px] rounded-2xl border-1px border-[#FFFFFF12] bg-[#202020] shadow-lg hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.5)]">
              <div className="h-16 w-full bg-[url('/images/backgrounds/abstract-dots.svg')] bg-cover bg-center bg-no-repeat px-6 py-4">
                {/* <Image src={f.icon} alt={f.title} width={32} height={32} /> */}
                <div className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#00B2FF] to-[#8F00FF] p-1.5">
                  <Icon name={f.icon} className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col items-start gap-4 p-6 pt-0">
                <h4 className="text-xl font-medium text-white">{f.title}</h4>
                <p className="text-sm text-white">{f.description}</p>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
