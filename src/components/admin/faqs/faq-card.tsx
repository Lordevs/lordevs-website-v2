import { AVAILABLE_PAGES } from "@/constants/admin";
import { motion } from "framer-motion";
import { Edit, Eye, EyeOff, GripVertical, Trash2 } from "lucide-react";
import type { FAQ } from "@/lib/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FAQCardProps = {
  faq: FAQ;
  onDelete: (id: string) => void;
  onToggleActive?: (id: string, isActive: boolean) => void;
  onEdit?: (faq: FAQ) => void;
};

export default function FAQCard({
  faq,
  onDelete,
  onToggleActive,
  onEdit,
}: FAQCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative rounded-xl border border-blue-500/30 bg-linear-to-br from-[#23243A]/50 to-[#181A20]/50 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20">
      {/* Card glow effect */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-br from-blue-600/5 to-purple-600/5 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative mb-3 flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <GripVertical className="h-4 w-4 cursor-move text-gray-500" />
          <span className="text-xs text-gray-400">#{faq.order_index}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onToggleActive?.(faq.id, faq.is_active)}
            className="h-8 w-8 p-0 transition-all duration-300 hover:bg-linear-to-r hover:from-green-600/20 hover:to-green-800/20">
            {faq.is_active ? (
              <Eye className="h-4 w-4 text-green-400" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-500" />
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit?.(faq)}
            className="h-8 w-8 p-0 transition-all duration-300 hover:bg-linear-to-r hover:from-blue-600/20 hover:to-blue-800/20">
            <Edit className="h-4 w-4 text-blue-400" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(faq.id)}
            className="h-8 w-8 p-0 transition-all duration-300 hover:bg-linear-to-r hover:from-red-600/20 hover:to-red-800/20">
            <Trash2 className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      </div>

      <h3 className="relative mb-2 line-clamp-2 font-medium text-white">
        {faq.question}
      </h3>

      <p className="relative mb-3 line-clamp-3 text-sm text-gray-400">
        {faq.answer}
      </p>

      <div className="relative mb-3 flex flex-wrap gap-1">
        {faq.pages.map((pageId) => {
          const page = AVAILABLE_PAGES.find((p) => p.id === pageId);
          return (
            <Badge
              key={pageId}
              variant="outline"
              className="border border-blue-500/30 bg-linear-to-r from-blue-600/20 to-purple-600/20 text-xs text-blue-300">
              {page?.label || pageId}
            </Badge>
          );
        })}
      </div>

      <div className="relative flex items-center justify-between text-xs">
        <span
          className={`rounded-full px-3 py-1 font-medium ${
            faq.is_active
              ? "border border-green-500/30 bg-linear-to-r from-green-600/20 to-green-800/20 text-green-400"
              : "border border-red-500/30 bg-linear-to-r from-red-600/20 to-red-800/20 text-red-400"
          }`}>
          {faq.is_active ? "Active" : "Inactive"}
        </span>
        <span className="text-gray-500">
          {new Date(faq.updated_at).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
}
