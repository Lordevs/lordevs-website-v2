import { CareerHeroSection } from "@/components/careers/career-hero-section";
import { CareerSection } from "@/components/careers/career-section";

export default function CareersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <CareerHeroSection />
      <CareerSection />
    </main>
  );
}
