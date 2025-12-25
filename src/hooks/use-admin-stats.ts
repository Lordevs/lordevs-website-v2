import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

export interface AdminStats {
  faqs: {
    total: number;
    active: number;
    inactive: number;
  };
  projects: {
    total: number;
    // featured: number;
    active: number;
  };
  testimonials: {
    total: number;
    active: number;
    inactive: number;
  };
}

/**
 * Custom hook for fetching and managing admin dashboard statistics
 * Provides real-time stats for FAQs and Projects with loading states
 */
export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    faqs: { total: 0, active: 0, inactive: 0 },
    projects: { total: 0, active: 0 },
    testimonials: { total: 0, active: 0, inactive: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch FAQ stats
      const { data: faqs, error: faqError } = await supabase
        .from("faqs")
        .select("id, is_active");

      if (faqError) throw faqError;

      // Fetch Project stats
      const { data: projects, error: projectError } = await supabase
        .from("projects")
        .select("id, is_active");

      if (projectError) throw projectError;

      // Fetch Testimonial stats
      const { data: testimonials, error: testimonialError } = await supabase
        .from("testimonials")
        .select("id, is_active");

      if (testimonialError) throw testimonialError;

      // Calculate stats
      const faqStats = {
        total: faqs?.length || 0,
        active: faqs?.filter((faq) => faq.is_active).length || 0,
        inactive: faqs?.filter((faq) => !faq.is_active).length || 0,
      };

      const projectStats = {
        total: projects?.length || 0,
        // featured:
        //   projects?.filter((project) => project.is_featured).length || 0,
        active: projects?.filter((project) => project.is_active).length || 0,
      };

      const testimonialStats = {
        total: testimonials?.length || 0,
        active:
          testimonials?.filter((testimonial) => testimonial.is_active).length ||
          0,
        inactive:
          testimonials?.filter((testimonial) => !testimonial.is_active)
            .length || 0,
      };

      setStats({
        faqs: faqStats,
        projects: projectStats,
        testimonials: testimonialStats,
      });
    } catch (error) {
      const errorMessage = "Failed to fetch admin statistics";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching admin stats:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Refresh stats manually
  const refreshStats = () => {
    fetchStats();
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refreshStats,
  };
}
