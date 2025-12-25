import { ReviewsSection } from "@/components/common/new-reviews-section";
import ContactFAQsSection from "@/components/contact/contact-faq-section";
import { ContactSection } from "@/components/contact/contact-section";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <ContactSection />
      <ContactFAQsSection />
      <ReviewsSection />
    </main>
  );
}
