import { useEffect, useState } from "react";
import { useParams } from "react-router";

import CTA from "@/components/common/cta";
import { ProjectFeatureGrid } from "@/components/projects/detail/project-feature-grid";
import { ProjectHero } from "@/components/projects/detail/project-hero";
import { ProjectSection } from "@/components/projects/detail/project-section";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjectBySlug } from "@/lib/supabase/projects";
import type { Project } from "@/lib/types/database";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await getProjectBySlug(slug);

        if (!data) {
          setNotFound(true);
        } else {
          setProject(data);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setNotFound(true); // Treat error as not found for now, or add distinct error state
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-48 bg-gray-800" />
          <Skeleton className="h-4 w-64 bg-gray-800" />
        </div>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Project Not Found</h1>
          <p className="text-gray-400">
            The project you are looking for does not exist.
          </p>
        </div>
      </main>
    );
  }

  const hero = {
    title: project.title,
    subtitle: project.tagline ?? "",
    tags: project.tags,
    mainImage: project.main_image,
    services: project.services,
    categories: project.categories,
    liveUrl: project.live_url,
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <ProjectHero {...hero} />

      {/* Project Sections */}
      {project.sections &&
        project.sections.length > 0 &&
        project.sections.map((section) => (
          <ProjectSection
            key={section.id}
            title={section.title}
            description={section.description}
            screenshots={section.screenshots.map((screenshot, i) => ({
              src: screenshot,
              alt: `${section.title} screenshot ${i + 1}`,
            }))}
            isGrid={section.isGrid}
          />
        ))}

      {/* Project Features */}
      {project.features && project.features.length > 0 && (
        <ProjectFeatureGrid features={project.features} />
      )}

      {/* Call to Action */}
      <div className="px-4 pb-12 md:px-0">
        <CTA
          title="Get Your Tailored System for Your Needs"
          description="Ready to take the next step? Join us now and start transforming your vision into reality with expert support."
          ctaText="Book an Appointment"
          containerClassName="flex-col gap-4 text-center"
          descriptionClassName="max-w-xl"
        />
      </div>
    </main>
  );
}
