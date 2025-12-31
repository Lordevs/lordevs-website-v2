import { useState } from "react";
import {
  AVAILABLE_PAGES,
  type FAQFormData,
  STATS_CARD_CONFIGS,
} from "@/constants/admin";
import { AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Globe, Users } from "lucide-react";
import type { FAQ } from "@/lib/types/database";
import { useFAQs } from "@/hooks/use-faqs";
import EmptyState from "@/components/admin/common/empty-state";
import LoadingSpinner from "@/components/admin/common/loading-spinner";
import StatsCard from "@/components/admin/common/stats-card";
import FAQCard from "@/components/admin/faqs/faq-card";
import FAQFilters from "@/components/admin/faqs/faq-filters";
import FAQForm from "@/components/admin/faqs/improved-faq-form";
import { AdminHeader } from "@/components/admin/navigation";

export default function FAQsPage() {
  const { faqs, loading, stats, saveFAQ, deleteFAQ, toggleActive } = useFAQs();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPage, setFilterPage] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState<FAQFormData>({
    question: "",
    answer: "",
    pages: [],
    order_index: 0,
    is_active: true,
  });

  // Filter FAQs based on search and filters
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPage = filterPage === "all" || faq.pages.includes(filterPage);

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && faq.is_active) ||
      (filterStatus === "inactive" && !faq.is_active);

    return matchesSearch && matchesPage && matchesStatus;
  });

  // Handle delete with confirmation
  const handleDelete = async (id: string) => {
    await deleteFAQ(id);
  };

  // Handle toggle active status
  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleActive(id, currentStatus);
  };

  // Start editing an FAQ
  function startEdit(faq: FAQ) {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      pages: faq.pages,
      order_index: faq.order_index,
      is_active: faq.is_active,
    });
    setShowForm(true);
  }

  // Handle form submission
  const handleFormSubmit = async (data: FAQFormData) => {
    const success = await saveFAQ(data, editingId);
    if (success) {
      setShowForm(false);
      setEditingId(null);
      setFormData({
        question: "",
        answer: "",
        pages: [],
        order_index: 0,
        is_active: true,
      });
    }
  };

  return (
    <div className="relative">
      <AdminHeader title="FAQ Management" />
      <main className="relative p-6">
        {/* Stats Dashboard */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatsCard
            title={STATS_CARD_CONFIGS.faq.total.title}
            value={stats.total}
            icon={Globe}
            color={STATS_CARD_CONFIGS.faq.total.color}
            loading={loading}
          />
          <StatsCard
            title={STATS_CARD_CONFIGS.faq.active.title}
            value={stats.active}
            icon={CheckCircle2}
            color={STATS_CARD_CONFIGS.faq.active.color}
            loading={loading}
          />
          <StatsCard
            title={STATS_CARD_CONFIGS.faq.inactive.title}
            value={stats.inactive}
            icon={AlertCircle}
            color={STATS_CARD_CONFIGS.faq.inactive.color}
            loading={loading}
          />
          <StatsCard
            title={STATS_CARD_CONFIGS.faq.pages.title}
            value={AVAILABLE_PAGES.filter((p) => p.id !== "all").length}
            icon={Users}
            color={STATS_CARD_CONFIGS.faq.pages.color}
            loading={false}
          />
        </div>

        {/* Controls */}
        <FAQFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterPage={filterPage}
          setFilterPage={setFilterPage}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setShowForm={setShowForm}
        />

        {/* Create/Edit Modal */}
        <FAQForm
          isOpen={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingId(null);
            setFormData({
              question: "",
              answer: "",
              pages: [],
              order_index: 0,
              is_active: true,
            });
          }}
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          onSubmit={handleFormSubmit}
        />

        {/* FAQ Cards Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredFAQs.map((faq) => (
                <FAQCard
                  key={faq.id}
                  faq={faq}
                  onDelete={handleDelete}
                  onToggleActive={handleToggleActive}
                  onEdit={startEdit}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredFAQs.length === 0 && !loading && (
          <EmptyState
            icon={Globe}
            title="No FAQs Found"
            description="No FAQs found matching your criteria."
            actionLabel="Create your first FAQ"
            onAction={() => setShowForm(true)}
          />
        )}
      </main>
    </div>
  );
}
