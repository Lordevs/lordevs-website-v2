import { CareerHeroSection } from "@/components/careers/career-hero-section";
import { CareerSection } from "@/components/careers/career-section";
import { SEO } from "@/components/common/seo";
import { ROUTES } from "@/constants/routes";

export default function CareersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="Careers | Build the Future with Us"
        description="Discover career opportunities at Lordevs, where innovation meets impact. Join our dynamic team and be part of a forward-thinking organization."
        url={ROUTES.CAREER}
      />
      <CareerHeroSection />
      <CareerSection />
    </main>
  );
}
