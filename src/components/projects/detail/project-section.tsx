'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { ProjectScreenshots } from './project-screenshots';
import { ProjectScreenshotsGrid } from './project-screenshots-grid';

interface ProjectSectionProps {
  title: string;
  description: string;
  screenshots?: {
    src: string;
    alt: string;
  }[];
  isGrid?: boolean;
  children?: ReactNode;
}

export function ProjectSection({
  title,
  description,
  screenshots,
  isGrid,
  children,
}: ProjectSectionProps) {
  return (
    <motion.section
      className="w-full pt-10 md:pt-16"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <motion.div
        className="container mx-auto max-w-6xl px-8 text-center"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="mb-4 text-2xl font-medium text-white md:text-4xl">
          {title}
        </h2>
        <p className="mb-6 text-base text-[#B2B2B2] md:text-2xl">
          {description}
        </p>
        {children}
      </motion.div>
      {screenshots &&
        screenshots.length > 0 &&
        (isGrid ? (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <ProjectScreenshotsGrid
              screenshots={screenshots}
              containerClassName="pt-12"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <ProjectScreenshots
              screenshots={screenshots}
              containerClassName="pt-12"
            />
          </motion.div>
        ))}
    </motion.section>
  );
}
