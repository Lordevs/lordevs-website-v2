'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import type { FAQ } from '@/lib/types/database';
import { FAQItem } from '@/components/common/faq-item';

import SectionBagde from '../common/section-badge';

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  faqs: propFaqs,
  title,
  subtitle,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fallback to default FAQs if none provided
  const defaultFaqs = [
    {
      id: '1',
      question: 'What is LORDEVS and what services do you offer?',
      answer:
        'LORDEVS is an innovative software company specializing in AI-driven solutions. We help businesses and startups leverage artificial intelligence to create customized SaaS applications, automate processes, and optimize their operations. Our services include AI development, machine learning integration, data analytics, and more.',
      pages: ['home'],
      order_index: 1,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '2',
      question: 'Do you offer customer support?',
      answer:
        'Yes, we provide comprehensive customer support including 24/7 technical assistance, onboarding help, training sessions, and ongoing maintenance for all our AI solutions.',
      pages: ['home'],
      order_index: 2,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '3',
      question: 'Is my data secure on this platform?',
      answer:
        'Absolutely. We implement enterprise-grade security measures including end-to-end encryption, secure data storage, regular security audits, and compliance with industry standards like GDPR and SOC 2.',
      pages: ['home'],
      order_index: 3,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '4',
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a 14-day free trial for most of our services. This allows you to explore our AI solutions and see how they can benefit your business before making a commitment.',
      pages: ['home'],
      order_index: 4,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
    {
      id: '5',
      question: 'Can I set up automated reorder alerts?',
      answer:
        'Yes, our AI-powered systems can automatically monitor your inventory levels and set up intelligent reorder alerts based on your business patterns, seasonal trends, and custom thresholds.',
      pages: ['home'],
      order_index: 5,
      is_active: true,
      created_at: '',
      updated_at: '',
    },
  ];

  const faqs = propFaqs || defaultFaqs;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-10 md:py-20">
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <SectionBagde name="FAQ" />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-medium md:text-5xl"
          >
            {title || 'We got Answer to your Questions'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-base text-[#B2B2B2] md:text-2xl"
          >
            {subtitle ||
              'We have got the answers you might need to know about our AI services'}
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="relative mx-auto max-w-6xl space-y-4">
          <motion.div
            layoutId="glow"
            className="absolute top-10 -right-3 z-[-1] h-[30] w-[30px] rotate-[32deg] rounded-full bg-[#8F00FF] blur-[15px] md:h-[70px] md:w-[70px]"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            layoutId="glow2"
            className="absolute top-5 right-5 z-[-2] h-[30] w-[30px] rotate-[32deg] rounded-full bg-gradient-to-r from-[#00B1FE] to-[#504EFF] blur-[15px] md:h-[70px] md:w-[70px]"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            layoutId="glow3"
            className="absolute top-2 left-5 z-[-1] h-[30] w-[30px] rotate-[32deg] rounded-full bg-[#8F00FF] blur-[15px] md:h-[70px] md:w-[70px]"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            layoutId="glow4"
            className="absolute top-0 -left-3 z-[-2] h-[30] w-[30px] rotate-[32deg] rounded-full bg-gradient-to-r from-[#00B1FE] to-[#504EFF] blur-[15px] md:h-[70px] md:w-[70px]"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
