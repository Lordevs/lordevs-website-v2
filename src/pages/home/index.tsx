import { ReviewsSection } from "@/components/common/new-reviews-section";
import { AboutSection } from "@/components/home/about-section";
import { ExpertiseSection } from "@/components/home/expertise-section";
import { HeroSection } from "@/components/home/hero-section";
import HomeFAQsSection from "@/components/home/home-faq-section";
import { IntegrationsSection } from "@/components/home/integrations-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { BentoServicesSection } from "@/components/home/bento-services-section";
// import { ServicesSection } from "@/components/home/services-section";
import { SEO } from "@/components/common/seo";
import { ROUTES } from "@/constants/routes";

export default function HomePage() {
  // testing
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="Home | We Turn Your Vision into Impact with AI-Powered Products"
        description="We Turn Your Vision into Impact with AI-Powered Products. Accelerating growth through custom SaaS, agents, and automation tools."
        url={ROUTES.HOME}
      />
      <HeroSection />
      <BentoServicesSection />
      {/* <ServicesSection /> */}
      <AboutSection />
      <ExpertiseSection />
      <PortfolioSection />
      <IntegrationsSection />
      <ReviewsSection />
      <HomeFAQsSection />
    </main>
  );
}
