import { BlogList } from "@/components/news/blog-list";
import { NewsHeroSection } from "@/components/news/news-hero-section";
import { NewsItem } from "@/components/news/news-item";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-black">
      <NewsHeroSection />
      <NewsItem />
      <BlogList />
    </div>
  );
}
