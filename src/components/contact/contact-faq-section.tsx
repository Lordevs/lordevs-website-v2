import { useEffect, useState } from "react";
import { getFAQsForPage } from "@/lib/utils/faqs";
import { FAQSection } from "../common/faq-section";
import type { FAQ } from "@/lib/types/database";

export default function ContactFAQsSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    getFAQsForPage("contact").then(setFaqs);
  }, []);

  return (
    <FAQSection
      faqs={faqs}
      title="We got Answer to your Questions"
      subtitle="We have got the answers you might need to know about our AI services"
    />
  );
}
