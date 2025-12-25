import { getFAQsForPage } from '@/lib/utils/faqs';

import { FAQSection } from '../common/faq-section';

export default async function HomeFAQsSection() {
  const faqs = await getFAQsForPage('home');

  return (
    <FAQSection
      faqs={faqs}
      title="We got Answer to your Questions"
      subtitle="We have got the answers you might need to know about our AI services"
    />
  );
}
