import { useNavigate } from "react-router";
import type { FC } from "react";
import { Button } from "@/components/ui/button";

const NewsCtaSection: FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-24 my-16 overflow-hidden">
      {/* Background with Dark Orbs to match site theme */}
      <div className="absolute inset-0 z-[-1] bg-[#0C0912]">
        <div className="absolute top-0 left-0 h-full w-full blur-[178px]">
          <div className="absolute top-0 -left-90 h-[243px] w-[259px] bg-[#8F403E] blur-[5px] md:top-5 md:left-20 md:h-[343px] md:w-[459px] opacity-30" />
          <div className="absolute top-10 -right-50 h-[243px] w-[259px] bg-[#4742B6] blur-[129px] md:top-18 md:right-20 md:h-[288px] md:w-[459px] opacity-30" />
        </div>
      </div>

      {/* Background texture matching CTA.tsx */}
      <img
        src="/images/backgrounds/cta/cta-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20 mix-blend-soft-light"
      />

      <div className="relative z-10 flex flex-col justify-center items-center max-w-4xl mx-auto text-center px-4 space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Stay Ahead with Lordevs
        </h2>
        <p className="text-gray-400 text-lg md:text-xl w-full max-w-2xl leading-relaxed">
          Discover how our creative solutions can optimise your operations,
          boost efficiency, and accelerate growth. Stay ahead of the competition
          with our cutting-edge expertise.
        </p>

        <Button
          onClick={() => navigate("/contact")}
          variant="gradient"
          className="px-10 py-6 text-lg font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300">
          Get in touch today
        </Button>
      </div>
    </section>
  );
};

export default NewsCtaSection;
