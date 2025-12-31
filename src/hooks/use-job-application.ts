import { useState, useEffect, useCallback } from "react";
import {
  getJobApplications,
  deleteJobApplication,
} from "@/lib/supabase/job-applications";
import { toast } from "sonner";
import type { Database } from "@/lib/types/database";

type JobApplicationRow =
  Database["public"]["Tables"]["job_applications"]["Row"];

export function useJobApplications() {
  const [applications, setApplications] = useState<JobApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getJobApplications();
      setApplications(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching job applications:", err);
      setError("Failed to fetch job applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleDeleteApplication = async (id: string) => {
    try {
      await deleteJobApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
      toast.success("Application deleted successfully");
    } catch (err) {
      console.error("Error deleting application:", err);
      toast.error("Failed to delete application");
    }
  };

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    deleteApplication: handleDeleteApplication,
  };
}
