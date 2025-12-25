import { Link } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";

export default function CTA({
  title,
  description,
  ctaText,
  containerClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  ctaLink = "/contact",
}: {
  title: string;
  description: string;
  ctaText: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  ctaLink?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
      className="mx-auto max-w-6xl">
      {/* box-shadow: -20px 4px 120px -80px #1FBBBB24 inset;
       */}
      <div className="relative overflow-hidden rounded-2xl shadow-[inset_0px_4px_120px_-80px_#1FBBBB24]">
        <ShineBorder
          shineColor={["#00B2FF", "#cfcfcf33", "#8F00FF", "#cfcfcf33"]}
          duration={20}
        />

        <div className="relative z-1 p-6 md:p-12">
          <div className="absolute top-0 left-0 z-[-1] h-full w-full blur-[178px]">
            <div className="absolute top-0 -left-90 h-[243px] w-[259px] bg-[#8F403E] blur-[5px] md:top-5 md:left-20 md:h-[343px] md:w-[459px]" />
            <div className="absolute top-10 -right-50 h-[243px] w-[259px] bg-[#4742B6] blur-[129px] md:top-18 md:right-20 md:h-[288px] md:w-[459px]" />
          </div>
          <img
            src="/images/backgrounds/cta/cta-bg.png"
            alt=""
            width={1200}
            height={309}
            className="absolute top-0 right-0 left-0 z-[-1] h-full w-full rotate-90 transform mix-blend-soft-light blur-[400px] md:blur-[178px]"
          />

          <div
            className={cn(
              "flex flex-col items-center justify-between text-center md:flex-row md:text-left",
              containerClassName
            )}>
            {/* Left side - Text content */}
            <div className="flex-1 md:pr-8">
              <h3
                className={cn(
                  "mb-2 text-2xl font-bold text-[#F0F0F0] md:mb-4 md:text-3xl",
                  titleClassName
                )}>
                {title}
              </h3>
              <p
                className={cn(
                  "max-w-lg text-base text-[#FDFDFDCC]",
                  descriptionClassName
                )}>
                {description}
              </p>
            </div>

            {/* Right side - Button */}
            <div className="mt-4 shrink-0 md:mt-0">
              <Link to={ctaLink}>
                <Button
                  variant="gradient"
                  className="cursor-pointer rounded-xl px-10 py-3 text-base font-medium">
                  {ctaText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
