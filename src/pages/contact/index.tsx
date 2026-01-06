import { ReviewsSection } from "@/components/common/new-reviews-section";
import ContactFAQsSection from "@/components/contact/contact-faq-section";
import { ContactSection } from "@/components/contact/contact-section";
import { SEO } from "@/components/common/seo";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="Contact | DotCode"
        description="If you are planning to build an AI product, implement machine learning, automate business processes or explore strategic AI consulting, we are ready to support you. We work with startups, enterprise teams and public sector organisations to deliver intelligent systems that are designed for scale, stability and real-world impact. Share your goals with us and we will show you how we can help you move forward with clarity and confidence."
        url="/contact"
      />
      <ContactSection />
      <ContactFAQsSection />
      <ReviewsSection />
    </main>
  );
}
