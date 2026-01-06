import CTA from "@/components/common/cta";
import { ReviewsSection } from "@/components/common/new-reviews-section";
import { ProjectsHeroSection } from "@/components/projects/hero-section";
import ProjectsFAQsSection from "@/components/projects/projects-faq-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { SEO } from "@/components/common/seo";
import { ROUTES } from "@/constants/routes";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="Case Studies | Discover Our Exceptional Work"
        description="Discover our exceptional work and how we've helped businesses and startups leverage artificial intelligence to create customized SaaS applications, automate processes, and optimize their operations."
        url={ROUTES.CASE_STUDIES}
      />
      <ProjectsHeroSection />
      <ProjectsSection />
      <ProjectsFAQsSection />
      <div className="px-4 md:px-0">
        <CTA
          title="Each Project we Undertake is a Unique Opportunity"
          description="Ready to take the next step? Join us now and start transforming your vision into reality with expert support."
          ctaText="Book an Appointment →"
          containerClassName="flex-col items-center text-center justify-center gap-6"
          descriptionClassName="mx-auto md:mx-0"
        />
      </div>
      <ReviewsSection />
    </main>
  );
}
