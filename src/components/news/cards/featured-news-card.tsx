import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Clock, Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { truncateMarkdown } from "@/lib/markdown-utils";
import { ShineBorder } from "@/components/ui/shine-border";
import { motion } from "framer-motion";

interface FeaturedNewsCardProps {
  title: string;
  slug: string;
  description: string;
  publishedDate: string;
  thumbnailUrl: string;
}

export function FeaturedNewsCard({
  title,
  slug,
  description,
  publishedDate,
  thumbnailUrl,
}: FeaturedNewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative mb-24 flex flex-col gap-12 rounded-[40px] border border-white/5 bg-[#0C0912]/40 backdrop-blur-3xl p-8 md:p-10 md:flex-row group transition-all duration-700 overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]">
      <ShineBorder
        shineColor={["#41A2F8", "#8F00FF", "#00FFFF"]}
        duration={12}
        borderWidth={2}
        className="opacity-40 group-hover:opacity-80 transition-opacity duration-1000"
      />

      {/* Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-[#4F1AD6]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-[#41A2F8]/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative h-80 w-full overflow-hidden rounded-[32px] md:h-[350px] md:w-[55%] z-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        <div
          className="flex h-full w-full items-center justify-center transition-transform duration-2000 group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #1A1A2E 0%, #03001C 100%)",
          }}>
          <motion.img
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            src={thumbnailUrl || "/opengraph-image.png"}
            alt={title}
            width={300}
            height={300}
            className="object-contain drop-shadow-[0_20px_50px_rgba(65,162,248,0.4)] transition-all duration-700 group-hover:brightness-125"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-tr from-black/40 to-transparent" />

        {/* Featured Tag Floating */}
        <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#41A2F8] shadow-[0_0_30px_#41A2F866]">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="bg-black/40 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#41A2F8]">
              Recommended
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-center md:w-[45%] z-10 py-4">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
              <Clock className="h-4 w-4 text-[#41A2F8]" />
              Trending
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
              <Globe className="h-4 w-4 text-[#8F00FF]" />
              Global Update
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-white transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-[#41A2F8] leading-[1.1] tracking-tight">
            {title}
          </h2>
        </div>

        <div className="mb-10 text-xl leading-[1.6] text-gray-400 font-medium max-w-xl italic border-l-4 border-[#41A2F8]/60 pl-6 py-2">
          <ReactMarkdown>{truncateMarkdown(description, 240)}</ReactMarkdown>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full border-2 border-[#41A2F8] p-0.5 shadow-[0_0_15px_rgba(65,162,248,0.3)]">
              <img
                src="/favicon.ico"
                className="h-full w-full rounded-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-wide">
                {new Date(publishedDate).toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Lordevs Official
              </span>
            </div>
          </div>

          <Button
            asChild
            variant="gradient"
            className="px-12 py-8 text-2xl font-black rounded-[24px] shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:shadow-[0_30px_60px_rgba(59,130,246,0.5)] transition-all transform hover:scale-105 active:scale-95 group/btn">
            <Link to={`/news/${slug}`} className="flex items-center gap-3">
              Read Story
              <ArrowRight className="h-7 w-7 transition-transform group-hover/btn:translate-x-3" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
