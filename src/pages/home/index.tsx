import { ReviewsSection } from "@/components/common/new-reviews-section";
import { AboutSection } from "@/components/home/about-section";
import { ExpertiseSection } from "@/components/home/expertise-section";
import { HeroSection } from "@/components/home/hero-section";
import HomeFAQsSection from "@/components/home/home-faq-section";
import { IntegrationsSection } from "@/components/home/integrations-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { ServicesSection } from "@/components/home/services-section";

export default function HomePage() {
  // testing
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ExpertiseSection />
      <PortfolioSection />
      <IntegrationsSection />
      <ReviewsSection />
      <HomeFAQsSection />
    </main>
  );
}
