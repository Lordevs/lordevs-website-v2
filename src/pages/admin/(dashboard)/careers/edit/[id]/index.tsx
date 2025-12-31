import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AdminHeader } from "@/components/admin/navigation";
import { CareerForm } from "@/components/admin/careers/career-form";
import { getCareerById } from "@/lib/supabase/careers";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import type { CareerRow } from "@/lib/types/database";
import { Loader2 } from "lucide-react";

export default function AdminEditCareerPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [career, setCareer] = useState<CareerRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      if (!id) return;
      try {
        const data = await getCareerById(id);
        if (data) {
          setCareer(data);
        } else {
          toast.error("Career not found");
          navigate(ROUTES.ADMIN.CAREERS);
        }
      } catch (error) {
        console.error("Error fetching career:", error);
        toast.error("Failed to load career");
        navigate(ROUTES.ADMIN.CAREERS);
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!career) return null;

  return (
    <div className="space-y-6">
      <AdminHeader title="Edit Career Position" />
      <main className="p-6">
        <CareerForm initialData={career} isEdit />
      </main>
    </div>
  );
}
