import type { FormEvent, ReactNode } from "react";
import { Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AdminFormProps {
  id?: string;
  onSubmit: (e: FormEvent) => void | Promise<void>;
  onCancel: () => void;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  className?: string;
  btnContainerClassName?: string;
}

/**
 * Reusable form component for admin interfaces
 * Provides consistent styling and button layout
 */
export default function AdminForm({
  id = "admin-form",
  onSubmit,
  onCancel,
  children,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isSubmitting = false,
  className = "space-y-4",
  btnContainerClassName,
}: AdminFormProps) {
  return (
    <form id={id} onSubmit={onSubmit} className={className}>
      {/* Form Content */}
      {children}

      {/* Form Actions - Now inside the form */}
      <div
        className={cn(
          "mt-6 flex gap-x-3 border-t border-blue-500/20 pt-4",
          btnContainerClassName
        )}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="group relative bg-linear-to-r from-[#00B2FF] to-[#8F00FF] shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-[#0094D9] hover:to-[#7300D9] hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100">
          <div className="absolute inset-0 rounded-lg bg-linear-to-r from-[#00B2FF] to-[#8F00FF] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20" />
          <Save className="relative mr-2 h-4 w-4" />
          <span className="relative">
            {isSubmitting ? "Saving..." : submitLabel}
          </span>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="border-gray-600/50 bg-linear-to-r from-[#23243A]/30 to-[#181A20]/30 text-gray-300 hover:border-gray-500/50 hover:bg-linear-to-r hover:from-[#2A2B45]/50 hover:to-[#1F212A]/50 disabled:cursor-not-allowed disabled:opacity-50">
          <X className="mr-2 h-4 w-4" />
          {cancelLabel}
        </Button>
      </div>
    </form>
  );
}
