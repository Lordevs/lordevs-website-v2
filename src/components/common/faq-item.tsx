import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-hidden rounded-lg bg-[#1A1D31] p-px backdrop-blur-sm">
      <div
        className="rounded-lg"
        style={{
          background:
            "radial-gradient(18% 116% at 94% 72.7%, #1A1D31, #0D0D12)",
        }}>
        <button
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left transition-colors hover:bg-gray-800/50 md:px-9 md:py-5">
          <span className="pr-4 text-lg font-medium text-[#FFFFFFDE] md:text-2xl">
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}>
            <Plus className="h-5 w-5 text-blue-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden">
              <div className="px-4 pb-4 text-sm leading-relaxed text-[#FFFFFFDE] md:px-6 md:text-base">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
