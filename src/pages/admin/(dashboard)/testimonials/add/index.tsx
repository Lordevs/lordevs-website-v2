import { AdminHeader } from "@/components/admin/navigation";
import TestimonialForm from "@/components/admin/testimonials/testimonial-form";

export default function AddTestimonialPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Add New Testimonial" />
      <TestimonialForm />
    </div>
  );
}
