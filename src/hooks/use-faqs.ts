import { useCallback, useEffect, useState } from "react";
import type { FAQFormData } from "@/constants/admin";
import { toast } from "sonner";

import { generateOrderIndex } from "@/lib/admin-utils";
import { createClient } from "@/lib/supabase/client";
import type { FAQ } from "@/lib/types/database";

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Load FAQs
  const loadFAQs = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      toast.error("Failed to fetch FAQs");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Create or update FAQ
  const saveFAQ = async (formData: FAQFormData, editingId?: string | null) => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from("faqs")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId);

        if (error) throw error;
        toast.success("FAQ updated successfully");
      } else {
        const { error } = await supabase.from("faqs").insert([
          {
            ...formData,
            order_index: generateOrderIndex(faqs),
          },
        ]);

        if (error) throw error;
        toast.success("FAQ created successfully");
      }

      // Reload FAQs
      await loadFAQs();
      return true;
    } catch (error) {
      toast.error("Failed to save FAQ");
      console.error("Error:", error);
      return false;
    }
  };

  // Delete FAQ
  const deleteFAQ = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return false;

    try {
      const { error } = await supabase.from("faqs").delete().eq("id", id);

      if (error) throw error;
      toast.success("FAQ deleted successfully");
      setFaqs(faqs.filter((faq) => faq.id !== id));
      return true;
    } catch (error) {
      toast.error("Failed to delete FAQ");
      console.error("Error:", error);
      return false;
    }
  };

  // Toggle FAQ active status
  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("faqs")
        .update({
          is_active: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      toast.success(`FAQ ${!currentStatus ? "activated" : "deactivated"}`);
      setFaqs(
        faqs.map((faq) =>
          faq.id === id ? { ...faq, is_active: !currentStatus } : faq
        )
      );
      return true;
    } catch (error) {
      toast.error("Failed to update FAQ status");
      console.error("Error:", error);
      return false;
    }
  };

  // Calculate stats
  const stats = {
    total: faqs.length,
    active: faqs.filter((faq) => faq.is_active).length,
    inactive: faqs.filter((faq) => !faq.is_active).length,
  };

  // Load FAQs on mount
  useEffect(() => {
    loadFAQs();
  }, [loadFAQs]);

  return {
    faqs,
    loading,
    stats,
    setFaqs,
    loadFAQs,
    saveFAQ,
    deleteFAQ,
    toggleActive,
  };
}
