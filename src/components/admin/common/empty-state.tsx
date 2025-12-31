import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Reusable empty state component for when no data is available
 * Consistent styling across all admin pages
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <div className="relative mx-auto mb-6 w-fit">
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>
        <div className="relative rounded-full bg-linear-to-r from-[#23243A] to-[#181A20] p-6">
          <Icon className="h-12 w-12 text-blue-400" />
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-4 text-gray-400">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="group relative bg-linear-to-r from-[#00B2FF] to-[#8F00FF] shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-[#0094D9] hover:to-[#7300D9] hover:shadow-blue-500/40">
          <div className="absolute inset-0 rounded-lg bg-linear-to-r from-[#00B2FF] to-[#8F00FF] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20" />
          <span className="relative">{actionLabel}</span>
        </Button>
      )}
    </div>
  );
}
