'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { Card } from '@/components/ui/card';

interface IntegrationCardProps {
  icon: string;
  title: string;
  description: string;
}

export function IntegrationCard({
  icon,
  title,
  description,
}: IntegrationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="gap-3 border-0 bg-transparent">
        <Image
          src={icon}
          alt={`${title} Icon`}
          width={48}
          height={48}
          className="mb-3"
        />
        <h3 className="text-[17px] font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </Card>
    </motion.div>
  );
}
