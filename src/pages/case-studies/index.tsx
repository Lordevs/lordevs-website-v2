import CTA from "@/components/common/cta";
import { ReviewsSection } from "@/components/common/new-reviews-section";
import { ProjectsHeroSection } from "@/components/projects/hero-section";
import ProjectsFAQsSection from "@/components/projects/projects-faq-section";
import { ProjectsSection } from "@/components/projects/projects-section";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
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
