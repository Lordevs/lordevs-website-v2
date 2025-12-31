import { AdminHeader } from "@/components/admin/navigation";
import { CareerForm } from "@/components/admin/careers/career-form";

export default function AdminAddCareerPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Add New Career Position" />
      <main className="p-6">
        <CareerForm />
      </main>
    </div>
  );
}
