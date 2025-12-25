import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import {
  deleteProject as deleteProjectSupabase,
  getActiveProjects,
  getProjects,
  type ProjectFormData,
} from "@/lib/supabase/projects";
import type { Project } from "@/lib/types/database";

const supabase = createClient();

export function useProjects(activeOnly: boolean = false) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = activeOnly ? await getActiveProjects() : await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  // Calculate stats
  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.is_active).length,
    inactive: projects.filter((p) => !p.is_active).length,
  };

  // Save project (create or update)
  const saveProject = useCallback(
    async (projectData: ProjectFormData, editingId?: string | null) => {
      setLoading(true);
      setError(null);

      try {
        const now = new Date().toISOString();
        const projectPayload = {
          ...projectData,
          updated_at: now,
          ...(editingId ? {} : { created_at: now }),
        };

        let data: Project;
        if (editingId) {
          // Update existing project
          const { data: updateData, error } = await supabase
            .from("projects")
            .update(projectPayload)
            .eq("id", editingId)
            .select()
            .single();

          if (error) throw error;
          data = updateData as Project;

          // Update local state
          setProjects((prev) =>
            prev.map((p) => (p.id === editingId ? data : p))
          );

          toast.success("Project updated successfully");
        } else {
          // Create new project
          const { data: insertData, error } = await supabase
            .from("projects")
            .insert([projectPayload])
            .select()
            .single();

          if (error) throw error;
          data = insertData as Project;

          // Update local state
          setProjects((prev) => [data, ...prev]);

          toast.success("Project created successfully");
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to save project";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete project (with image cleanup)
  const deleteProject = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteProjectSupabase(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted successfully");
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete project";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle project active status
  const toggleActive = useCallback(
    async (id: string, currentStatus: boolean) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("projects")
          .update({
            is_active: !currentStatus,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setProjects((prev) => prev.map((p) => (p.id === id ? data : p)));

        toast.success(
          `Project ${!currentStatus ? "activated" : "deactivated"} successfully`
        );
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to toggle project status";
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    stats,
    saveProject,
    deleteProject,
    toggleActive,
    fetchProjects,
  };
}
