import { useCallback, useEffect, useState } from "react";

import {
  getActiveTestimonials,
  getTestimonials,
} from "@/lib/supabase/testimonials";
import type { Testimonial } from "@/lib/types/database";

export function useTestimonials(activeOnly: boolean = false) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = activeOnly
        ? await getActiveTestimonials()
        : await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      setError("Failed to fetch testimonials");
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  return {
    testimonials,
    loading,
    error,
    refetch: fetchTestimonials,
  };
}
