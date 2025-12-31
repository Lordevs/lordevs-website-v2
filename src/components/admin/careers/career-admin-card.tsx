import {
  Pencil,
  Trash2,
  Calendar,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CareerRow } from "@/lib/types/database";
import { updateCareer, deleteCareer } from "@/lib/supabase/careers";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CareerAdminCardProps {
  career: CareerRow;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, newStatus: boolean) => void;
}

export default function CareerAdminCard({
  career,
  onEdit,
  onDelete,
  onToggleStatus,
}: CareerAdminCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusToggle = async () => {
    setIsUpdating(true);
    try {
      const newStatus = !career.is_active;
      await updateCareer(career.id, { is_active: newStatus });
      onToggleStatus(career.id, newStatus);
      toast.success(
        `Career ${newStatus ? "published" : "unpublished"} successfully`
      );
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCareer(career.id);
      onDelete(career.id);
      toast.success("Career deleted successfully");
    } catch (error) {
      toast.error("Failed to delete career");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#41A2F8]/30 hover:bg-white/10 hover:shadow-lg">
        <div>
          <div className="mb-4">
            <h3 className="line-clamp-2 text-xl font-bold text-white group-hover:text-[#41A2F8]">
              {career.title}
            </h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
              <Calendar className="h-3 w-3" />
              Created {format(new Date(career.created_at), "MMM d, yyyy")}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {career.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white/10 text-xs hover:bg-white/20">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col gap-1 text-sm text-white/70">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40">
                <CheckCircle2 className="h-3 w-3" /> Requirements:
              </div>
              <p className="line-clamp-2 text-xs text-white/50">
                {career.features.join(" • ") || "No items listed"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 pt-4 border-t border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <Badge
            variant={career.is_active ? "default" : "secondary"}
            className={
              career.is_active
                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 w-fit"
                : "bg-white/10 text-white/50 w-fit"
            }>
            {career.is_active ? "Active" : "Draft"}
          </Badge>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(career.id)}
              className="text-white/60 hover:text-white hover:bg-white/10">
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setDeleteDialogOpen(true)}
              className="text-red-400 hover:text-red-500 hover:bg-red-500/10">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>

            <Button
              size="sm"
              variant="ghost"
              disabled={isUpdating}
              onClick={handleStatusToggle}
              className={
                career.is_active
                  ? "text-white/60 hover:text-white hover:bg-white/10"
                  : "text-[#41A2F8] hover:text-[#41A2F8] hover:bg-[#41A2F8]/10"
              }>
              {career.is_active ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" /> Deactivate
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" /> Activate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              career "{career.title}" and remove it from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
