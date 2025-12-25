"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SectionBagde from "../common/section-badge";

export function AboutSection() {
  return (
    <section className="relative py-10 md:py-20">
      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <SectionBagde name="Who we are" />

          {/* Main Content */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 text-3xl leading-tight font-medium md:text-5xl">
            We at{" "}
            <span className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
              Lordevs
            </span>
            , help founders like you to automate their day to day business
            operations with the help of AI
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Button
              variant="gradient"
              className="px-10 py-5 text-base font-semibold md:px-16 md:py-6 md:text-xl">
              Reach us out →
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
