import AboutFAQsSection from "@/components/about/about-faq-section";
import { AboutHeroSection } from "@/components/about/about-hero-section";
import { ApproachSection } from "@/components/about/approach-section";
import { BuiltBySection } from "@/components/about/built-by-section";
import { CoreVisionSection } from "@/components/about/core-vision-section";
import { TransformationSection } from "@/components/about/transformation-section";
import CTA from "@/components/common/cta";
import { SEO } from "@/components/common/seo";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="About | LORDEVS"
        description="LORDEVS is an innovative software company specializing in AI-driven solutions. We help businesses and startups leverage artificial intelligence to create customized SaaS applications, automate processes, and optimize their operations. Our services include AI development, machine learning integration, data analytics, and more."
        url="/about"
      />
      <AboutHeroSection />
      <BuiltBySection />
      <TransformationSection />
      <CoreVisionSection />
      <ApproachSection />
      <AboutFAQsSection />
      <div className="mb-5 overflow-hidden px-4 md:px-0">
        <CTA
          title="Innovative solutions for business"
          description="We’re dedicated to delivering impactful solutions that drive value and elevate the experience for every client."
          ctaText="Get in Touch →"
        />
      </div>
    </main>
  );
}
