'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface ApproachCardProps {
  index: number;
  title: string;
  description: string;
  features: string[];
}

function ApproachCard({
  index,
  title,
  description,
  features,
}: ApproachCardProps) {
  return (
    <div className="relative flex h-full min-h-[250px] flex-1 flex-col bg-black md:min-h-[450px]">
      {/* Number backdrop */}
      <div className="mb-2 ml-1 w-fit bg-gradient-to-br from-[#00B1FE] to-[#504EFF] to-70% bg-clip-text text-[1.5rem] font-bold text-clip text-transparent md:mb-0 md:ml-5 md:block md:text-[4rem]">
        <span className="md:hidden">Step </span>
        <span>{index}</span>
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-1 flex-col rounded-xl p-6"
        style={{
          background:
            'radial-gradient(circle at top right, #0f091280 0%, #0f0d27 40%, #000000 60%)',
        }}
      >
        <div className="w-[283px] rotate-1 rounded-xl bg-gradient-to-r from-[#00B1FE] to-[#504EFF] opacity-30 blur-[181.47px]" />
        <h3 className="mb-3 text-xl font-medium text-white md:text-3xl">
          {title}
        </h3>
        <p className="mb-4 text-base text-white md:text-lg">{description}</p>
        <div className="space-y-3">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <Image
                src="/icons/check-icon.svg"
                alt=""
                width={16}
                height={16}
                className="h-5 w-5 md:h-6 md:w-6"
              />
              <span className="text-[#FFFFFF99]">{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ApproachSection() {
  const steps = [
    {
      title: 'Discover & Define',
      description:
        'We dive deep into your business needs, define the problem, and align on goals.',
      features: ['AI Use Case Exploration', 'Business & Tech Goal Mapping'],
    },
    {
      title: 'Design & Architect',
      description:
        'We design intuitive user flows, select the right tech stack, and build scalable AI-ready architectures.',
      features: ['UI/UX Design', 'Architecture Planning'],
    },
    {
      title: 'Build & Integrate',
      description:
        'Our team develops clean, modular code and integrates AI models, APIs, and third-party systems.',
      features: ['AI Integration', 'Custom Web & App Dev'],
    },
    {
      title: 'Deploy & Evolve',
      description:
        'We ensure smooth deployment, monitor and optimize for real-world performance and user feedback.',
      features: ['Cloud Deployment', 'Ongoing Monitoring'],
    },
  ];

  return (
    <section className="mx-auto max-w-6xl bg-black py-10 md:py-20">
      <div className="container mx-auto mb-8 space-y-3 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          Our Approach
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-base text-gray-300 md:text-lg"
        >
          Turning Your Ideas into Scalable AI Products
        </motion.p>
      </div>

      {/* Steps Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mx-4 max-w-6xl md:mx-auto"
      >
        <div className="rounded-2xl">
          <div className="grid grid-cols-1 items-stretch gap-4 p-4 md:grid-cols-4 md:gap-2 md:p-0">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="h-full"
              >
                <ApproachCard index={idx + 1} {...step} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
