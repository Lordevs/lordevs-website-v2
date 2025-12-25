import { CareerHeroSection } from "@/components/careers/career-hero-section";
import { CareerSection } from "@/components/careers/career-section";
import { SEO } from "@/components/common/seo";

export default function CareersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="Careers | LORDEVS"
        description="LORDEVS is an innovative software company specializing in AI-driven solutions. We help businesses and startups leverage artificial intelligence to create customized SaaS applications, automate processes, and optimize their operations. Our services include AI development, machine learning integration, data analytics, and more."
        url="/career"
      />
      <CareerHeroSection />
      <CareerSection />
    </main>
  );
}
