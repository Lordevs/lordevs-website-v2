import { useState } from "react";
import { STATS_CARD_CONFIGS } from "@/constants/admin";
import { AnimatePresence } from "framer-motion";
import { AlertCircle, Eye, FolderOpen } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import EmptyState from "@/components/admin/common/empty-state";
import LoadingSpinner from "@/components/admin/common/loading-spinner";
import StatsCard from "@/components/admin/common/stats-card";
import { AdminHeader } from "@/components/admin/navigation";
import ProjectCard from "@/components/admin/projects/project-card";
import ProjectFilters from "@/components/admin/projects/project-filters";

export default function ProjectsPage() {
  const { projects, loading, stats, deleteProject, toggleActive } =
    useProjects();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" ||
      project.categories.toLowerCase().includes(filterCategory.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && project.is_active) ||
      (filterStatus === "inactive" && !project.is_active);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories
  const categories = [...new Set(projects.map((p) => p.categories))].filter(
    Boolean
  );

  // Handle delete with confirmation
  const handleDelete = async (id: string) => {
    await deleteProject(id);
  };

  // Handle toggle active status
  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleActive(id, currentStatus);
  };

  return (
    <div className="relative">
      <AdminHeader title="Projects Management" />
      <main className="relative p-6">
        {/* Stats Dashboard */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatsCard
            title={STATS_CARD_CONFIGS.project.total.title}
            value={stats.total}
            icon={FolderOpen}
            color={STATS_CARD_CONFIGS.project.total.color}
            loading={loading}
          />
          <StatsCard
            title={STATS_CARD_CONFIGS.project.active.title}
            value={stats.active}
            icon={Eye}
            color={STATS_CARD_CONFIGS.project.active.color}
            loading={loading}
          />
          <StatsCard
            title={STATS_CARD_CONFIGS.project.inactive.title}
            value={stats.inactive}
            icon={AlertCircle}
            color={STATS_CARD_CONFIGS.project.inactive.color}
            loading={loading}
          />
        </div>

        {/* Controls */}
        <ProjectFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          categories={categories}
        />

        {/* Projects Cards Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDelete}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <EmptyState
            icon={FolderOpen}
            title="No Projects Found"
            description="No projects found matching your criteria."
            actionLabel="Create your first project"
          />
        )}
      </main>
    </div>
  );
}
