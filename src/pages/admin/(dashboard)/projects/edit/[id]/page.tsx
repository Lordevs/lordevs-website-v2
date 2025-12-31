import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getProjectById, type ProjectFormData } from "@/lib/supabase/projects";
import { Button } from "@/components/ui/button";
import ProjectForm from "@/components/admin/projects/project-form";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const navigate = useNavigate();
  const { id } = use(params);
  const [loadingProject, setLoadingProject] = useState(true);
  const [projectData, setProjectData] = useState<ProjectFormData | null>(null);

  useEffect(() => {
    // Load project data
    const loadProject = async () => {
      try {
        const project = await getProjectById(id);

        setProjectData({
          title: project.title,
          subtitle: project.subtitle,
          services: project.services,
          categories: project.categories,
          tags: project.tags,
          is_active: project.is_active,
          sections: project.sections,
          features: project.features,
          main_image: project.main_image,
          live_url: project.live_url || "",
        });
      } catch (error) {
        console.error("Error loading project:", error);
        toast.error("Failed to load project data");
      } finally {
        setLoadingProject(false);
      }
    };

    loadProject();
  }, [id]);

  if (loadingProject) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0F0F0F] via-[#1A1A2E] to-[#16213E] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="mb-4 h-8 rounded bg-white/10"></div>
            <div className="h-32 rounded bg-white/10"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F0F0F] via-[#1A1A2E] to-[#16213E] p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <h1 className="mb-2 text-3xl font-bold text-white">Edit Project</h1>
          <p className="text-white/70">Update your project details</p>
        </div>

        {/* Project Form */}
        {projectData && (
          <ProjectForm initialData={projectData} isEdit={true} projectId={id} />
        )}
      </div>
    </div>
  );
}
