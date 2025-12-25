import { getFAQsForPage } from '@/lib/utils/faqs';

import { FAQSection } from '../common/faq-section';

export default async function ContactFAQsSection() {
  const faqs = await getFAQsForPage('contact');

  return (
    <FAQSection
      faqs={faqs}
      title="We got Answer to your Questions"
      subtitle="We have got the answers you might need to know about our AI services"
    />
  );
}
