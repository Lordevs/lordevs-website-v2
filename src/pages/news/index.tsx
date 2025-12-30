import { BlogList } from "@/components/news/blog-list";
import { NewsHeroSection } from "@/components/news/news-hero-section";
import { NewsItem } from "@/components/news/news-item";
import FutureTechSection from "@/components/news/future-tech-section";
import Newsletter from "@/components/news/news-letter";
import { SEO } from "@/components/common/seo";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="News | Lordevs"
        description="News and insights from Lordevs"
      />
      <NewsHeroSection />
      <NewsItem />
      <BlogList />
      <FutureTechSection />
      <Newsletter />
    </div>
  );
}
