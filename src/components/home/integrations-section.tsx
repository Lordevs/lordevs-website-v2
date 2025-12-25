'use client';

import { motion } from 'framer-motion';

import { IntegrationCard } from '@/components/home/cards/integration-card';

import CTA from '../common/cta';
import SectionBagde from '../common/section-badge';

export function IntegrationsSection() {
  const integrations = [
    {
      icon: '/icons/ai-rag-icon.svg',
      title: 'AI RAG AGENTS',
      description: 'Connect with AI chatbots to improve engagement.',
    },
    {
      icon: '/icons/erp-sys-icon.svg',
      title: 'ERP System Integration',
      description: 'Sync inventory with enterprise resource (ERP) systems.',
    },
    {
      icon: '/icons/supplier-procurement-icon.svg',
      title: 'Supplier & Procurement',
      description: 'Seamlessly connect with for automated restocking.',
    },
    {
      icon: '/icons/pos-integration-icon.svg',
      title: 'POS Integration',
      description: 'Sync inventory with POS for real-time updates.',
    },
  ];

  return (
    <section className="relative py-10 md:py-20">
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <SectionBagde name="Integrations" />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-medium md:text-5xl"
          >
            Seamless Integrations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-base text-[#B2B2B2] md:text-lg"
          >
            Effortlessly connect AI into your existing workflows, tools, and
            platforms — without disrupting your operations.
          </motion.p>
        </div>

        {/* Integrations Grid */}
        <div className="mx-auto mb-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="px-4 md:px-0"
            >
              <IntegrationCard {...integration} />
            </motion.div>
          ))}
        </div>

        {/* CTA Card */}
        <CTA
          title="Want to explore what AI can do for you?"
          description="We&rsquo;re dedicated to delivering impactful solutions that drive
              value and elevate the experience for every client."
          ctaText="Get in Touch →"
        />
      </div>
    </section>
  );
}
