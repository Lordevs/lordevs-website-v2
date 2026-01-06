import AboutFAQsSection from "@/components/about/about-faq-section";
import { AboutHeroSection } from "@/components/about/about-hero-section";
import { ApproachSection } from "@/components/about/approach-section";
import { BuiltBySection } from "@/components/about/built-by-section";
import { CoreVisionSection } from "@/components/about/core-vision-section";
import { TransformationSection } from "@/components/about/transformation-section";
import CTA from "@/components/common/cta";
import { SEO } from "@/components/common/seo";
import { ROUTES } from "@/constants/routes";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="About | Pioneering AI Innovation with Revolution!"
        description="DotCode is your trusted agency for creative strategy. We specialize in cutting-edge digital business solutions."
        url={ROUTES.ABOUT}
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
