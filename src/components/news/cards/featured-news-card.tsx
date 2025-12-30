import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { truncateMarkdown } from "@/lib/markdown-utils";

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
    <div className="mb-12 flex flex-col gap-12 border-y border-[#4F1AD61A] py-16 px-0 md:flex-row group transition-all duration-300">
      <div className="relative h-64 w-full overflow-hidden rounded-[22px] md:h-96 md:w-1/2">
        <div
          className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{
            background:
              "radial-gradient(43% 50% at 50% 50%, #0F091226, #0C0912)",
          }}>
          <img
            src={thumbnailUrl || "/opengraph-image.png"}
            alt={title}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex w-full flex-col justify-center md:w-1/2">
        <div className="mb-4">
          <span className="mb-2 block text-sm font-semibold text-[#41A2F8]">
            Featured Article
          </span>
          <h2 className="text-3xl font-bold text-white transition-colors group-hover:text-[#41A2F8] sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mb-8 text-lg leading-relaxed text-gray-400">
          <ReactMarkdown>{truncateMarkdown(description, 180)}</ReactMarkdown>
        </div>
        <div className="mb-8 flex items-center gap-4">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Published on
            </span>
            <span className="text-sm text-gray-300">
              {new Date(publishedDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="flex md:justify-end">
          <Button
            asChild
            variant="gradient"
            className="px-8 py-6 text-lg font-semibold md:px-12">
            <Link to={`/news/${slug}`} className="flex items-center gap-2">
              Read more
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
