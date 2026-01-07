import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfiniteLogoCarousel } from "../common/infinite-logo-carousel";
import { NavLink } from "react-router";
import { ROUTES } from "@/constants/routes";

export function HeroSection() {
  const aiLogos = [
    { name: "OpenAI", logo: "./images/logos/openai-logo.svg" },
    { name: "Claude", logo: "./images/logos/claude-logo.svg" },
    { name: "Loveable", logo: "./images/logos/loveable-logo.svg" },
    { name: "Gemini", logo: "./images/logos/gemini-logo.svg" },
    { name: "Langchain", logo: "./images/logos/langchain-logo.svg" },
    { name: "DALL-E", logo: "./images/logos/dalle-logo.svg" },
  ];

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-20 md:min-h-screen">
      {/* Enhanced Background with Gradient Dots */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Main background image */}
        <img
          src="./images/backgrounds/home/hero-bg.svg"
          alt=""
          className="object-cover opacity-70 h-full w-full"
          fetchPriority="high"
          loading="eager"
        />

        {/* Gradient Orbs - positioned to match your reference */}

        {/* Large blue gradient - center left */}
        <div
          className="absolute right-2/6 bottom-1/12 aspect-video w-[900px]"
          style={{
            background:
              "radial-gradient(circle, #4742B6 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
            filter: "blur(132px)",
            transform: "translate(50%, 50%)",
          }}
        />

        {/* Orange gradient - bottom left */}
        <div
          className="absolute bottom-1/12 left-2/6 aspect-video w-[900px]"
          style={{
            background:
              "radial-gradient(circle, #8F403E 0%, rgba(249, 115, 22, 0.2) 30%, rgba(249, 115, 22, 0.1) 50%, transparent 70%)",
            filter: "blur(103px)",
            transform: "translate(-50%, 50%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="mx-auto max-w-6xl text-center">
          {/* Main Heading */}
          {/* Main Heading */}
          <h1 className="mb-6 text-3xl leading-tight font-bold md:text-4xl md:text-[64px]">
            We Turn Your Vision into Impact with{" "}
            <span className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
              AI-Powered Products
            </span>
          </h1>
          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-sm text-lg text-gray-300 md:max-w-4xl md:text-2xl">
            Accelerating growth through custom SaaS, agents, and automation
            tools.
          </p>
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="my-10 md:my-16">
            <NavLink to={ROUTES.CONTACT}>
              <Button
                variant="gradient"
                className="cursor-pointer px-10 py-5 text-lg font-semibold md:px-16 md:py-6 md:text-xl">
                Schedule a Call{" "}
                <span>
                  <ArrowRight className="size-6" />
                </span>
              </Button>
            </NavLink>
          </motion.div>
          {/* AI Logos - Continuous Slider */}
          <InfiniteLogoCarousel
            items={aiLogos}
            duration={40}
            logoClassName="md:w-32"
          />
        </div>
      </div>
    </section>
  );
}
