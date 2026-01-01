import { ApplyJobSection } from "@/components/apply-for-job/apply-job-section";
import { SEO } from "@/components/common/seo";
import { ROUTES } from "@/constants/routes";

export default function ApplyJobPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="Apply for Job | Build the Future with Us"
        description="At Lordevs, we're shaping the future of AI-driven websites. Join our team of innovators and help us push boundaries."
        url={ROUTES.CAREER}
      />
      <ApplyJobSection />
    </main>
  );
}
