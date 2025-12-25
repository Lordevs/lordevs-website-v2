"use client";

import { motion } from "framer-motion";
import {
  InfiniteLogoCarousel,
  type LogoItem,
} from "@/components/common/infinite-logo-carousel";

// List of built-by logos
const builtByLogos: LogoItem[] = [
  { name: "Gripco Lims", logo: "/images/logos/gripco-lims-logo.png" },
  { name: "Compl-AI", logo: "/images/logos/compl-ai-logo.png" },
  { name: "QuickAuthors", logo: "/images/logos/quick-authors-logo.png" },
  { name: "More Life", logo: "/images/logos/more-life-logo.png" },
  { name: "Skainet Beta", logo: "/images/logos/skainet-logo.png" },
  { name: "Model Leap", logo: "/images/logos/model-leap-logo.png" },
  { name: "Mind Hush", logo: "/images/logos/mind-hush-logo.png" },
];

export function BuiltBySection() {
  return (
    <section className="bg-black py-10 md:py-20">
      <div className="container mx-auto space-y-8 px-6 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}>
          <h2 className="text-3xl font-medium text-white md:text-5xl">
            Built by{" "}
            <span className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
              LORDEVS
            </span>
          </h2>
          <p className="mt-2 text-base text-gray-300 md:text-2xl">
            Crafted solutions for visionary brands and businesses.
          </p>
        </motion.div>

        {/* Logo carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}>
          <InfiniteLogoCarousel
            items={builtByLogos}
            duration={40}
            className="mx-auto w-full max-w-6xl"
            logoClassName="w-40 h-40 md:mx-8"
          />
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-4xl text-3xl font-medium text-white md:mt-36 md:text-5xl">
          We at{" "}
          <span className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
            Lordevs
          </span>
          , help founders like you to automate their day to day business
          operations with the help of AI
        </motion.p>
      </div>
    </section>
  );
}
