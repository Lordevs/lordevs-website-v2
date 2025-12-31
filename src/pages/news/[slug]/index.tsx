import { useParams } from "react-router";
import { useEffect, useState } from "react";
import NewsArticle from "@/components/news/detail/news-artical";
import NewsCtaSection from "@/components/news/detail/news-cta-section";
import { SEO } from "@/components/common/seo";
import { NewsItem } from "@/components/news/news-item";
import Newsletter from "@/components/news/news-letter";
import { getNewsBySlug } from "@/lib/supabase/news";
import type { NewsRow } from "@/lib/types/database";

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<NewsRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getNewsBySlug(slug);
        if (data) {
          setBlog(data);
        } else {
          setError("Article not found.");
        }
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  const getDescription = (item: NewsRow) =>
    item.excerpt || item.content?.slice(0, 160) || "";

  return (
    <div>
      <SEO
        title={blog ? `${blog.title} | Lordevs News` : "Loading News..."}
        description={
          blog ? getDescription(blog) : "Reading the latest from Lordevs"
        }
      />
      <div className="min-h-screen bg-[#0C0912] pt-28">
        <NewsArticle blog={blog} loading={loading} error={error} />
        <NewsCtaSection />
        <NewsItem excludeId={blog?.id || blog?.slug} />
        <Newsletter />
      </div>
    </div>
  );
}
