"use client";

import { useState } from "react";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import { Separator } from "@radix-ui/react-separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  slug: string;
  features: string[];
  tags: string[];
  images: string[];
}

export function ProjectCard({
  title,
  subtitle,
  slug,
  features,
  tags,
  images,
}: ProjectCardProps) {
  const [imageLoadingStates, setImageLoadingStates] = useState<boolean[]>(
    new Array(images.length).fill(true)
  );

  const handleImageLoad = (index: number) => {
    setImageLoadingStates((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
      <Link to={ROUTES.CASE_STUDY(slug)}>
        <Card className="rounded-4xl border-[#939393] bg-[#080808] px-3 py-4 backdrop-blur-sm transition-colors hover:bg-[#080808]/70 hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.5)]">
          <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
            {/* Left Side - Project Info */}
            <div
              className="relative overflow-hidden rounded-[22px] border-px border-[#4F1AD626] p-4 lg:w-1/3"
              style={{
                background:
                  "radial-gradient(43% 50% at 50% 50%, #0F091226, #0C0912)",
              }}>
              <div className="absolute top-[-84px] left-[325px] h-[205px] w-[162px] bg-linear-to-r from-[#00B1FE] to-[#504EFF] opacity-30 blur-[103.4px]" />

              <div className="mb-2 flex items-center space-x-2">
                <h3 className="mb-1 text-xl font-bold text-white md:text-2xl">
                  {title}
                </h3>
                <p className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] bg-clip-text text-xs text-transparent md:text-sm">
                  {subtitle}
                </p>
              </div>

              <Separator className="mb-4 h-1px bg-linear-to-r from-[#FFFFFF05] via-[#FFFFFF1A] to-[#FFFFFF05]" />

              {/* Features */}
              <div className="mb-6 space-y-3 md:space-y-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <img
                      src="/icons/check-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="h-5 w-5 md:h-6 md:w-6"
                    />
                    <span className="text-sm text-[#FFFFFF99] md:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="relative inline-block rounded-full bg-linear-to-l from-[#202020] from-[20.61%] to-[#FFFFFF] p-px">
                    <div className="relative z-10 rounded-full bg-[#000000] px-5 py-1 text-xs md:text-base">
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
            </div>

            {/* Right Side - Images */}
            <div className="flex flex-col gap-4 md:flex-row lg:w-2/3">
              {images.map((image, index) => (
                <div key={index} className="flex-1">
                  <div className="relative h-full w-full max-w-[376px] overflow-hidden rounded-3xl">
                    {imageLoadingStates[index] && (
                      <Skeleton className="h-full min-h-[200px] w-full rounded-3xl" />
                    )}
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${title} mockup ${index + 1}`}
                      className={cn(
                        "object-cover h-full w-full transition-opacity duration-300",
                        imageLoadingStates[index] ? "opacity-0" : "opacity-100"
                      )}
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
