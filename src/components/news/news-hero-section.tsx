import { motion } from "framer-motion";

export function NewsHeroSection() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
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

      <div className="relative z-10 container mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl text-center md:px-4">
          <h1 className="text-4xl md:text-7xl font-md mb-4 font-bold text-white">
            News, insights and more
          </h1>
          <p className="mb-6 text-lg text-center text-gray-300">
            Dive into our newsletter for expert insights, tips, and industry
            trends to elevate <br className="hidden md:block" />
            your project management journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
