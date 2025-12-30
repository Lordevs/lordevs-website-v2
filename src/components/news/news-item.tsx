import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedNewsCard } from "./cards/featured-news-card";
import { NewsCard } from "./cards/news-card";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  publishedDate: string;
}

interface NewsItemProps {
  /** Blog ID/slug to exclude from the list (useful on blog detail pages) */
  excludeId?: string;
}

// MOCK DATA
const MOCK_BLOGS: BlogItem[] = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    slug: "future-ai-web-dev",
    description:
      "Artificial Intelligence is revolutionizing how we build the web. From code generation to automated testing, explore the tools shaping the future.",
    thumbnailUrl: "/opengraph-image.png",
    publishedDate: "2024-12-28",
  },
  {
    id: "2",
    title: "Optimizing React Performance",
    slug: "optimizing-react-performance",
    description:
      "Learn key strategies to boost your React application's performance, including memoization, lazy loading, and code splitting techniques.",
    thumbnailUrl: "/opengraph-image.png",
    publishedDate: "2024-12-25",
  },
  {
    id: "3",
    title: "Understanding Next.js App Router",
    slug: "nextjs-app-router",
    description:
      "A comprehensive guide to the new App Router in Next.js 13+. Discover how to leverage server components, layouts, and nested routing.",
    thumbnailUrl: "/opengraph-image.png",
    publishedDate: "2024-12-20",
  },
  {
    id: "4",
    title: "Tailwind CSS Best Practices",
    slug: "tailwind-css-best-practices",
    description:
      "Write cleaner, more maintainable CSS with Tailwind. We share our top tips for organizing classes and creating reusable components.",
    thumbnailUrl: "/opengraph-image.png",
    publishedDate: "2024-12-15",
  },
];

export function NewsItem({ excludeId }: NewsItemProps) {
  // Simulate loading mock data
  const [blogs] = useState<BlogItem[]>(MOCK_BLOGS);
  const [loading] = useState(false);

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

  if (blogs.length === 0) {
    return null;
  }

  // Filter out the excluded blog if viewing a detail page
  const filteredBlogs = excludeId
    ? blogs.filter((blog) => blog.id !== excludeId && blog.slug !== excludeId)
    : blogs;

  const [featured, ...others] = filteredBlogs;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-white">
      {/* Featured Article */}
      {featured && (
        <FeaturedNewsCard
          title={featured.title}
          slug={featured.slug}
          description={featured.description}
          publishedDate={featured.publishedDate}
          thumbnailUrl={featured.thumbnailUrl}
        />
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 gap-8 px-0 pt-12 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            slug={item.slug}
            publishedDate={item.publishedDate}
            thumbnailUrl={item.thumbnailUrl}
          />
        ))}
      </div>
    </section>
  );
}
