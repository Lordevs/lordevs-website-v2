import { getFAQsForPage } from "@/lib/utils/faqs";
import { FAQSection } from "../common/faq-section";

export default async function ProjectsFAQsSection() {
  const faqs = await getFAQsForPage("about");

  return (
    <FAQSection
      faqs={faqs}
      title="We got Answer to your Questions"
      subtitle="We have got the answers you might need to know about our AI services"
    />
  );
}
