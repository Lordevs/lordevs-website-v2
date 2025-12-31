import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

import { getTestimonialById } from "@/lib/supabase/testimonials";
import type { Testimonial } from "@/lib/types/database";
import { AdminHeader } from "@/components/admin/navigation";
import TestimonialForm from "@/components/admin/testimonials/testimonial-form";

export default function EditTestimonialPage() {
  const params = useParams();
  const testimonialId = params.id as string;

  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (testimonialId) {
      loadTestimonial();
    }
  }, [testimonialId]);

  const loadTestimonial = async () => {
    try {
      const data = await getTestimonialById(testimonialId);
      setTestimonial(data);
    } catch (error) {
      console.error("Error loading testimonial:", error);
      toast.error("Failed to load testimonial");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-white">Loading testimonial...</div>
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-white">Testimonial not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader title="Edit Testimonial" />
      <TestimonialForm
        initialData={testimonial}
        isEdit={true}
        testimonialId={testimonialId}
      />
    </div>
  );
}
