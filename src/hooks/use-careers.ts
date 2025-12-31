import { useState, useEffect, useCallback } from "react";
import {
  getCareers,
  getActiveCareers,
  deleteCareer as deleteCareerService,
} from "@/lib/supabase/careers";
import type { CareerRow } from "@/lib/types/database";
import { toast } from "sonner";

export function useCareers(onlyActive = false) {
  const [careers, setCareers] = useState<CareerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCareers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = onlyActive ? await getActiveCareers() : await getCareers();
      setCareers(data);
    } catch (err) {
      console.error("Error fetching careers:", err);
      setError("Failed to fetch careers");
    } finally {
      setLoading(false);
    }
  }, [onlyActive]);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const deleteCareer = async (id: string) => {
    try {
      await deleteCareerService(id);
      setCareers((prev) => prev.filter((item) => item.id !== id));
      toast.success("Career deleted successfully");
    } catch (err) {
      console.error("Error deleting career:", err);
      toast.error("Failed to delete career");
      throw err;
    }
  };

  return {
    careers,
    loading,
    error,
    refetch: fetchCareers,
    deleteCareer,
  };
}
