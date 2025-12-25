"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CareerHeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Enhanced Background with Gradient Dots */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Main background image */}
        <img
          src="./images/backgrounds/home/hero-bg.svg"
          alt=""
          className="object-cover opacity-70"
        />

        {/* Gradient Orbs - positioned to match your reference */}

        {/* Large blue gradient - center left */}
        <div
          className="absolute right-1/12 -bottom-6/12 aspect-video w-[900px]"
          style={{
            background:
              "radial-gradient(circle, #4742B6 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
            filter: "blur(132px)",
          }}
        />

        {/* Orange gradient - bottom left */}
        <div
          className="absolute -bottom-6/12 aspect-video w-[900px]"
          style={{
            background:
              "radial-gradient(circle, #8F403E 0%, rgba(249, 115, 22, 0.2) 30%, rgba(249, 115, 22, 0.1) 50%, transparent 70%)",
            filter: "blur(103px)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="mx-auto max-w-6xl text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-3xl leading-tight font-bold md:text-4xl md:text-[64px]">
            Build the{" "}
            <span className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
              Future{" "}
            </span>
            with Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-8 max-w-4xl text-base text-gray-300 md:text-2xl">
            At Lordevs, we&rsquo;re shaping the future of AI-driven websites.
            Join our team of innovators and help us push boundaries.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="my-16">
            <link href="/contact">
              <Button
                variant="gradient"
                className="px-8 py-4 text-base font-semibold md:px-16 md:py-6 md:text-xl">
                Reach us
                <span>
                  <ArrowRight className="size-6" />
                </span>
              </Button>
            </link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
