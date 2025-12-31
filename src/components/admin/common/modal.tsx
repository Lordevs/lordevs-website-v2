import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  scrollable?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

/**
 * Reusable modal component for admin interfaces
 * Features proper scrolling, consistent styling, and accessibility
 */
export default function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "2xl",
  scrollable = true,
}: AdminModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            // Close modal when clicking on backdrop
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`relative max-h-[90vh] w-full ${maxWidthClasses[maxWidth]} rounded-xl border border-blue-500/30 bg-linear-to-br from-[#23243A] to-[#181A20] shadow-2xl backdrop-blur-xl flex flex-col`}
            onClick={(e) => e.stopPropagation()}>
            {/* Modal glow effect */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-blue-600/10 to-purple-600/10 opacity-50 blur-sm" />

            {/* Fixed Header */}
            <div className="relative p-6 pb-4 flex items-center justify-between border-b border-blue-500/20">
              <h2 className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-xl font-bold text-transparent">
                {title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="transition-colors duration-300 hover:bg-red-600/20 hover:text-red-400">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            {scrollable ? (
              <ScrollArea className="flex-1 px-6">
                <div className="py-4">{children}</div>
              </ScrollArea>
            ) : (
              <div className="flex-1 p-6 overflow-hidden">{children}</div>
            )}

            {/* Fixed Footer */}
            {footer && (
              <div className="relative p-6 pt-4 border-t border-blue-500/20">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
