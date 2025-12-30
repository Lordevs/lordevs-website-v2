import { useParams } from "react-router";
import { useEffect, useState } from "react";
import NewsArticle from "@/components/news/detail/news-artical";
import NewsCtaSection from "@/components/news/detail/news-cta-section";
import { SEO } from "@/components/common/seo";
import { NewsItem } from "@/components/news/news-item";
import Newsletter from "@/components/news/news-letter";

interface Blog {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedDate: string;
}

// MOCK DATA - Similar to NewsItem for consistency
const MOCK_BLOGS: Record<string, Blog> = {
  "future-ai-web-dev": {
    id: "1",
    title: "The Future of AI in Web Development",
    publishedDate: "2024-12-28",
    thumbnailUrl: "/opengraph-image.png",
    description: `
# The Future of AI in Web Development

Artificial Intelligence is revolutionizing how we build the web. From code generation to automated testing, explore the tools shaping the future.

## Key Takeaways
- **AI-Powered Code Completion**: Tools like GitHub Copilot and Cursor are changing how developers write code.
- **Automated Testing**: AI can now generate and run complex test suites, catching bugs before they reach production.
- **Personalized User Experiences**: Machine learning allows for dynamic content that adapts to individual user behavior.

### Comparison of AI Tools

| Tool | Focus | Primary Benefit |
| :--- | :--- | :--- |
| GitHub Copilot | Implementation | Speeding up coding |
| Vercel v0 | UI/UX | Rapid prototyping |
| Sentry AI | Debugging | Faster root cause analysis |

Join us as we dive deep into the technical implementation of these technologies.
    `,
  },
  "optimizing-react-performance": {
    id: "2",
    title: "Optimizing React Performance",
    publishedDate: "2024-12-25",
    thumbnailUrl: "/opengraph-image.png",
    description:
      "Learn key strategies to boost your React application's performance, including memoization, lazy loading, and code splitting techniques.",
  },
  "nextjs-app-router": {
    id: "3",
    title: "Understanding Next.js App Router",
    publishedDate: "2024-12-20",
    thumbnailUrl: "/opengraph-image.png",
    description:
      "A comprehensive guide to the new App Router in Next.js 13+. Discover how to leverage server components, layouts, and nested routing.",
  },
  "tailwind-css-best-practices": {
    id: "4",
    title: "Tailwind CSS Best Practices",
    publishedDate: "2024-12-15",
    thumbnailUrl: "/opengraph-image.png",
    description:
      "Write cleaner, more maintainable CSS with Tailwind. We share our top tips for organizing classes and creating reusable components.",
  },
};

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      if (slug && MOCK_BLOGS[slug]) {
        setBlog(MOCK_BLOGS[slug]);
      } else {
        setError("Article not found.");
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [slug]);

  return (
    <div>
      <SEO
        title={blog ? `${blog.title} | Lordevs News` : "Loading News..."}
        description={
          blog
            ? blog.description.slice(0, 160)
            : "Reading the latest from Lordevs"
        }
      />
      <div className="min-h-screen bg-[#0C0912] pt-28">
        <NewsArticle blog={blog} loading={loading} error={error} />
        <NewsCtaSection />
        <NewsItem />
        <Newsletter />
      </div>
    </div>
  );
}
