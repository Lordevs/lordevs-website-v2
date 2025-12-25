import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectHeroProps {
  title: string;
  subtitle: string;
  tags: string[];
  services: string;
  categories: string;
  mainImage: string;
  children?: React.ReactNode;
}

export function ProjectHero({
  title,
  subtitle,
  tags,
  services,
  categories,
  mainImage,
  children,
}: ProjectHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.section
      className="relative flex min-h-[80vh] flex-col items-center justify-center gap-10 overflow-hidden pt-20 md:min-h-screen md:gap-32"
      initial={{ opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}>
      <div className="absolute inset-0 z-0 bg-black">
        <div className='h-full w-full bg-[url("/images/backgrounds/home/hero-bg.svg")] bg-top opacity-70' />

        <div
          className="absolute top-0 left-0 h-full w-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #000000 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.25) 50%, transparent 70%)",
          }}
        />

        {/* Large blue gradient - center left */}
        <div
          className="absolute top-30 right-3/12 aspect-video w-[1010px]"
          style={{
            background:
              "radial-gradient(circle, #4742B6 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)",
            filter: "blur(132px)",
            transform: "translate(50%, 50%)",
          }}
        />

        {/* Orange gradient - bottom left */}
        <div
          className="absolute top-30 left-3/12 aspect-video w-[1017px]"
          style={{
            background:
              "radial-gradient(circle, #8F403E 0%, rgba(249, 115, 22, 0.2) 30%, rgba(249, 115, 22, 0.1) 50%, transparent 70%)",
            filter: "blur(103px)",
            transform: "translate(-50%, 50%)",
          }}
        />

        <div
          className="absolute top-15 left-6/12 aspect-video w-[1026px]"
          style={{
            background:
              "radial-gradient(circle, #0A50A0 0%, rgba(10,80,160,0.2) 30%, rgba(10,80,160,0.1) 50%, transparent 70%)",
            filter: "blur(102px)",
            transform: "translate(-50%, 50%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 container mx-auto flex max-w-6xl flex-col items-center gap-10 px-12 pt-20 md:flex-row md:gap-20 md:pt-0"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}>
        <div className="flex flex-1 flex-col gap-4 md:gap-6">
          <h1 className="mb-2 text-4xl text-white md:text-6xl">{title}</h1>
          <p className="mb-4 text-lg text-white md:text-2xl">{subtitle}</p>
          {/* Tags */}
          <div className="flex flex-wrap gap-4">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="relative inline-block rounded-full bg-linear-to-l from-[#202020] from-[20.61%] to-[#FFFFFF] p-1px">
                <div className="relative z-10 rounded-full bg-[#000000] px-5 py-1">
                  <div
                    style={{
                      background:
                        "radial-gradient(65.65% 45.65% at 50.59% 69.57%, #FFFFFF 0%, #B8B8B8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    {tag}
                  </div>
                </div>
                {/* Bottom-left gradient backdrop */}
                <span
                  className={cn(
                    "absolute top-1/2 z-0 h-6 w-6 -translate-y-1/2 transform rounded-full",
                    "bg-linear-to-r",
                    index % 2 === 0
                      ? "-left-1 from-[#00B2FF]"
                      : "-left-3 from-[##8F00FF]",
                    "to-[#504EFF] blur-sm"
                  )}
                />
              </div>
            ))}
          </div>
          {children}
        </div>
        <div className="relative grid w-full grid-cols-1 items-start gap-1 md:mt-12 md:max-w-[450px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative z-10">
            <div className={cn("relative rounded-lg bg-[#202020CC] p-6")}>
              {/* Icon + Title + Desc */}
              <div className="flex items-center space-x-4">
                <h3 className="text-base text-[#FFFFFFDE]">Services</h3>
              </div>
              <p className="mt-4 text-left text-sm leading-relaxed text-[#B2B2B2] md:mt-6">
                {services}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="relative z-10">
            <div className={cn("relative rounded-lg bg-[#202020CC] p-6")}>
              {/* Icon + Title + Desc */}
              <div className="flex items-center space-x-4">
                <h3 className="text-base text-[#FFFFFFDE]">Category</h3>
              </div>
              <p className="mt-6 text-left text-sm leading-relaxed text-[#B2B2B2]">
                {categories}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="absolute top-[48.5%] right-2 left-2 h-1 -translate-y-1/2 rounded-lg bg-linear-to-r from-[#00B1FE] to-[#504EFF] md:top-1/2"
          />
        </div>
      </motion.div>

      <motion.div
        className="mb-4 flex w-full flex-1 items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
        viewport={{ once: true }}>
        <div className="relative aspect-16/10 w-full max-w-xs overflow-hidden rounded-2xl border border-[#23243A] bg-[#181A20] shadow-2xl md:max-w-6xl md:rounded-[65px]">
          {!imageLoaded && (
            <Skeleton className="h-full w-full rounded-2xl md:rounded-[65px]" />
          )}
          <img
            src={mainImage}
            alt={title}
            className={cn(
              "object-cover h-full w-full transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
