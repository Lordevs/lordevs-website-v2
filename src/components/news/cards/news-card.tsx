import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <div className="flex flex-col overflow-hidden rounded-[22px] border border-[#4F1AD61A] bg-[#0C0912] transition-all duration-300 hover:border-[#4F1AD640] hover:shadow-[0_4px_32px_0_rgba(59,130,246,0.5)] group">
      <div className="relative h-62 w-full overflow-hidden md:h-40 lg:h-40">
        <div
          className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{
            background:
              "radial-gradient(43% 50% at 50% 50%, #0F091226, #0C0912)",
          }}>
          <img
            src={thumbnailUrl || "/opengraph-image.png"}
            alt={title}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="mb-2 text-lg font-bold text-white group-hover:text-[#41A2F8] transition-colors">
            {title}
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            {new Date(publishedDate).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex justify-end">
          <Button
            asChild
            variant="gradient"
            size="sm"
            className="px-4 py-2 text-xs font-semibold">
            <Link to={`/news/${slug}`} className="flex items-center gap-2">
              Read more
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
