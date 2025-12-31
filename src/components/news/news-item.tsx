import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedNewsCard } from "./cards/featured-news-card";
import { NewsCard } from "./cards/news-card";
import { useNews } from "@/hooks/use-news";

interface NewsItemProps {
  /** Blog ID/slug to exclude from the list (useful on blog detail pages) */
  excludeId?: string;
}

export function NewsItem({ excludeId }: NewsItemProps) {
  // Fetch active news only
  const { news: blogs, loading } = useNews(true);

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 text-white">
        {/* Featured skeleton */}
        <div className="mb-12 flex flex-col gap-12 border-y border-[#4F1AD61A] py-16 md:flex-row">
          <Skeleton className="h-64 w-full rounded-[22px] bg-gray-600/40 md:h-96 md:w-1/2" />
          <div className="flex flex-1 flex-col justify-center space-y-6">
            <Skeleton className="h-4 w-32 bg-gray-600/40" />
            <Skeleton className="h-12 w-3/4 bg-gray-600/40" />
            <Skeleton className="h-4 w-full bg-gray-600/40" />
            <Skeleton className="h-4 w-5/6 bg-gray-600/40" />
            <div className="pt-4 md:flex md:justify-end">
              <Skeleton className="h-14 w-40 rounded-md bg-gray-600/40" />
            </div>
          </div>
        </div>
        {/* Grid skeletons */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-4 rounded-[22px] border border-[#4F1AD61A] p-6">
              <Skeleton className="h-40 w-full rounded-[12px] bg-gray-600/40" />
              <Skeleton className="h-6 w-3/4 bg-gray-600/40" />
              <Skeleton className="h-4 w-1/2 bg-gray-600/40" />
              <div className="mt-auto flex justify-end">
                <Skeleton className="h-10 w-28 bg-gray-600/40" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 text-center text-white">
        <p>No news articles available at the moment.</p>
      </section>
    );
  }

  // Filter out the excluded blog if viewing a detail page
  const filteredBlogs = excludeId
    ? blogs.filter((blog) => blog.id !== excludeId && blog.slug !== excludeId)
    : blogs;

  const [featured, ...others] = filteredBlogs;

  // Helper to extract description
  const getDescription = (item: any) =>
    item.excerpt || item.content?.slice(0, 150) + "..." || "";

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-white">
      {/* Featured Article */}
      {featured && (
        <FeaturedNewsCard
          title={featured.title}
          slug={featured.slug || featured.id}
          description={getDescription(featured)}
          publishedDate={featured.published_at}
          thumbnailUrl={featured.thumbnail_url || "opengraph-image.png"}
        />
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 gap-8 px-0 pt-12 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            slug={item.slug || item.id}
            publishedDate={item.published_at}
            thumbnailUrl={item.thumbnail_url || "/opengraph-image.png"}
          />
        ))}
      </div>
    </section>
  );
}
