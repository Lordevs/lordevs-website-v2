import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminModal from "@/components/admin/common/modal";
import AdminForm from "@/components/admin/common/form";
import { AVAILABLE_PAGES, type FAQFormData } from "@/constants/admin";

type ImprovedFAQFormProps = {
  isOpen: boolean;
  onClose: () => void;
  formData: FAQFormData;
  setFormData: React.Dispatch<React.SetStateAction<FAQFormData>>;
  editingId: string | null;
  onSubmit: (data: FAQFormData) => Promise<void>;
};

/**
 * Improved FAQ form using reusable modal and form components
 * Better scrolling behavior and cleaner structure
 */
export default function ImprovedFAQForm({
  isOpen,
  onClose,
  formData,
  setFormData,
  editingId,
  onSubmit,
}: ImprovedFAQFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function togglePage(page: string) {
    setFormData((prev) => ({
      ...prev,
      pages: prev.pages.includes(page)
        ? prev.pages.filter((p) => p !== page)
        : [...prev.pages, page],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const formContent = (
    <AdminForm
      id="improved-faq-form"
      onSubmit={handleSubmit}
      onCancel={onClose}
      submitLabel={editingId ? "Update FAQ" : "Create FAQ"}
      isSubmitting={isSubmitting}>
      <div>
        <Label htmlFor="question" className="mb-2 font-medium text-gray-300">
          Question
        </Label>
        <Input
          id="question"
          value={formData.question}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              question: e.target.value,
            }))
          }
          placeholder="Enter the FAQ question"
          className="border-blue-500/30 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50 text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label htmlFor="answer" className="mb-2 font-medium text-gray-300">
          Answer
        </Label>
        <textarea
          id="answer"
          value={formData.answer}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              answer: e.target.value,
            }))
          }
          placeholder="Enter the FAQ answer"
          className="w-full resize-none rounded-lg border border-blue-500/30 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50 p-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none disabled:opacity-50"
          rows={4}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Label className="font-medium text-gray-300">Pages</Label>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
          {AVAILABLE_PAGES.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => !isSubmitting && togglePage(page.id)}
              disabled={isSubmitting}
              className={`rounded-lg border p-3 text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                formData.pages.includes(page.id)
                  ? "border-blue-500/50 bg-linear-to-r from-[#00B2FF]/20 to-[#8F00FF]/20 text-blue-400 shadow-lg shadow-blue-500/20"
                  : "border-gray-600/50 bg-linear-to-r from-[#23243A]/30 to-[#181A20]/30 text-gray-400 hover:border-blue-500/30 hover:text-blue-400"
              }`}>
              {page.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              is_active: e.target.checked,
            }))
          }
          disabled={isSubmitting}
          className="rounded border-blue-500/30 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50 text-blue-600 focus:ring-blue-500/50 disabled:opacity-50"
        />
        <Label htmlFor="is_active" className="font-medium text-gray-300">
          Active
        </Label>
      </div>
    </AdminForm>
  );

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingId ? "Edit FAQ" : "Create New FAQ"}
      maxWidth="2xl"
      scrollable={true}>
      {formContent}
    </AdminModal>
  );
}
