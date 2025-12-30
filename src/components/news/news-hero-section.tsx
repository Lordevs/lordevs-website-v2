import { motion } from "framer-motion";

export function NewsHeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Enhanced Background with Gradient Dots */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Main background image */}
        <img
          src="./images/backgrounds/home/hero-bg.svg"
          alt=""
          className="object-cover opacity-70 h-full w-full"
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
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-3xl leading-tight font-bold md:text-4xl md:text-[64px] text-white">
            News,{" "}
            <span className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-transparent">
              Insights{" "}
            </span>
            and more
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto mb-8 max-w-4xl text-base text-gray-300 md:text-2xl">
            Dive into our newsletter for expert insights, tips, and industry
            trends to elevate <br className="hidden md:block" />
            your project management journey.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
