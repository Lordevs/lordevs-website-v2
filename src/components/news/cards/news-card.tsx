import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { ShineBorder } from "@/components/ui/shine-border";
import { TiltCard } from "@/components/common/tilt-card";
import { motion } from "framer-motion";

interface NewsCardProps {
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  thumbnailUrl: string;
}

export function NewsCard({
  title,
  slug,
  publishedDate,
  thumbnailUrl,
}: NewsCardProps) {
  return (
    <TiltCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/5 bg-[#0C0912]/80 backdrop-blur-xl transition-all duration-500 hover:border-[#4F1AD640] hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.3)] group">
        <ShineBorder
          shineColor={["#41A2F8", "#8F00FF", "#41A2F8"]}
          duration={8}
          borderWidth={1.5}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        />

        {/* Animated Background Highlights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -right-[10%] h-[150px] w-[150px] bg-[#4742B6] blur-[60px] opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-150" />
          <div className="absolute top-[40%] -left-[10%] h-[100px] w-[100px] bg-[#8F403E] blur-[50px] opacity-10 transition-all duration-700 group-hover:opacity-30" />
        </div>

        <div className="relative h-56 w-full overflow-hidden z-10 p-4">
          <div className="h-full w-full rounded-[24px] overflow-hidden relative border border-white/5">
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-1000 group-hover:scale-110"
              style={{
                background:
                  "radial-gradient(100% 100% at 50% 0%, #1A1A2E 0%, #0C0912 100%)",
              }}>
              <img
                src={thumbnailUrl || "/opengraph-image.png"}
                alt={title}
                width={140}
                height={140}
                className="object-contain opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:brightness-125 drop-shadow-[0_0_20px_rgba(65,162,248,0.3)]"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-[#0C0912] via-transparent to-transparent opacity-60" />

            {/* Floating Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-[#41A2F8] uppercase tracking-widest shadow-lg">
                <div className="h-1.5 w-1.5 rounded-full bg-[#41A2F8] animate-pulse" />
                Latest Update
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-between p-7 z-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                <Calendar className="h-3 w-3 text-[#41A2F8]" />
                {new Date(publishedDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                <User className="h-3 w-3 text-[#8F00FF]" />
                Team Lordevs
              </span>
            </div>

            <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-[#41A2F8] transition-colors leading-[1.3] decoration-[#41A2F8] decoration-2 underline-offset-4 group-hover:underline">
              {title}
            </h3>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-[#0C0912] bg-[#1A1A2E] flex items-center justify-center overflow-hidden">
                  <img src="/favicon.png" className="h-4 w-4 opacity-50" />
                </div>
              ))}
            </div>

            <Button
              asChild
              variant="gradient"
              size="sm"
              className="rounded-2xl px-6 py-5 font-extrabold shadow-[0_10px_20px_rgba(59,130,246,0.4)] transition-all transform hover:shadow-[0_15px_30px_rgba(59,130,246,0.6)] active:scale-95 group/btn">
              <Link to={`/news/${slug}`} className="flex items-center gap-2">
                Read
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}
