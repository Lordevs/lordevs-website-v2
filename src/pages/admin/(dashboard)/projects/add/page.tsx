import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectForm from "@/components/admin/projects/project-form";

export default function AddProjectPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F0F0F] via-[#1A1A2E] to-[#16213E] p-6">
      <div className="mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
        <h1 className="mb-2 text-3xl font-bold text-white">Add New Project</h1>
        <p className="text-white/70">
          Create a new project to showcase your work
        </p>

        <ProjectForm />
      </div>
    </div>
  );
}
