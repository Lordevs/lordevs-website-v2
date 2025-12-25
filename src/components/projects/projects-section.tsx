'use client';

import { motion } from 'framer-motion';

import { useProjects } from '@/hooks/use-projects';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectCard } from '@/components/home/cards/project-card';

export function ProjectsSection() {
  const { projects, loading } = useProjects(true);

  // Transform project data to match ProjectCard props
  const transformedProjects = projects.map((project) => ({
    title: project.title,
    subtitle: project.subtitle,
    slug: project.project_slug,
    features: project.features.map((feature) => feature.title),
    tags: project.tags,
    // just show 2 images
    images: [
      project.main_image,
      ...(project.sections.flatMap((section) => section.screenshots) || []),
    ].slice(0, 2), // Limit to 2 images
  }));

  return (
    <section className="relative py-10 md:py-20">
      <div className="relative z-10 container mx-auto px-4">
        {/* Projects Grid */}
        <div className="mx-auto mb-12 max-w-6xl space-y-8">
          {loading
            ? // Show skeleton loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-4xl border-[#939393] bg-[#080808] p-3"
                >
                  <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
                    {/* Left side skeleton */}
                    <div className="relative overflow-hidden rounded-[22px] border-[1px] border-[#4F1AD626] p-4 lg:w-1/3">
                      <Skeleton className="mb-4 h-8 w-3/4" />
                      <div className="mb-4 h-[1px] bg-gradient-to-r from-[#FFFFFF05] via-[#FFFFFF1A] to-[#FFFFFF05]" />
                      <div className="mb-6 space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Skeleton className="h-5 w-5 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Skeleton key={i} className="h-6 w-16 rounded-full" />
                        ))}
                      </div>
                    </div>

                    {/* Right side skeleton */}
                    <div className="flex flex-col gap-4 md:flex-row lg:w-2/3">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="flex-1">
                          <Skeleton className="h-[200px] w-full max-w-[376px] rounded-3xl" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            : transformedProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
