import { BlogList } from "@/components/news/news-list";
import { NewsHeroSection } from "@/components/news/news-hero-section";
import { NewsItem } from "@/components/news/news-item";
import FutureTechSection from "@/components/news/future-tech-section";
import Newsletter from "@/components/news/news-letter";
import { SEO } from "@/components/common/seo";
import { ROUTES } from "@/constants/routes";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="News | Latest AI Insights"
        description="Dive into our newsletter for expert insights, tips, and industry trends to elevate your project management journey."
        url={ROUTES.NEWS}
      />
      <NewsHeroSection />
      <NewsItem />
      <BlogList />
      <FutureTechSection />
      <Newsletter />
    </div>
  );
}
