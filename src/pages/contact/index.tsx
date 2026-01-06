import { ReviewsSection } from "@/components/common/new-reviews-section";
import ContactFAQsSection from "@/components/contact/contact-faq-section";
import { ContactSection } from "@/components/contact/contact-section";
import { SEO } from "@/components/common/seo";
import { ROUTES } from "@/constants/routes";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <SEO
        title="Contact | Ask Whatever You have in Your Mind"
        description="Whether you have questions or are ready to discuss your business, we’re here to help. Reach out today."
        url={ROUTES.CONTACT}
      />
      <ContactSection />
      <ContactFAQsSection />
      <ReviewsSection />
    </main>
  );
}
