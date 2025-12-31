import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { ListFilter, Plus, Search } from "lucide-react";
import { getTestimonials } from "@/lib/supabase/testimonials";
import type { Testimonial } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminHeader } from "@/components/admin/navigation";
import TestimonialCard from "@/components/admin/testimonials/testimonial-card";

export default function TestimonialsPage() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    Testimonial[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    filterTestimonials();
  }, [testimonials, searchTerm, statusFilter]);

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTestimonials = () => {
    let filtered = testimonials;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (testimonial) =>
          testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          testimonial.country
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((testimonial) =>
        statusFilter === "active"
          ? testimonial.is_active
          : !testimonial.is_active
      );
    }

    setFilteredTestimonials(filtered);
  };

  const handleEdit = (id: string) => {
    navigate(ROUTES.ADMIN.EDIT_TESTIMONIAL(id));
  };

  const handleDelete = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (id: string, isActive: boolean) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, is_active: isActive } : t))
    );
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-white">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminHeader title="Testimonials" />
      <main className="relative p-6">
        {/* Stats */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">
              {testimonials.length}
            </div>
            <div className="text-sm text-white/60">Total Testimonials</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-400">
              {testimonials.filter((t) => t.is_active).length}
            </div>
            <div className="text-sm text-white/60">Active</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-red-400">
              {testimonials.filter((t) => !t.is_active).length}
            </div>
            <div className="text-sm text-white/60">Inactive</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/40"
            />
          </div>
          <div className="flex items-center gap-2">
            <ListFilter className="h-4 w-4 text-white/60" />
            <Select
              value={statusFilter}
              onValueChange={(value: "all" | "active" | "inactive") =>
                setStatusFilter(value)
              }>
              <SelectTrigger className="w-32 border-white/20 bg-white/5 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => navigate(ROUTES.ADMIN.ADD_TESTIMONIAL)}
              className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </div>
        </div>

        {/* Testimonials Grid */}
        {filteredTestimonials.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="text-white/60">
                {testimonials.length === 0
                  ? "No testimonials found. Create your first testimonial!"
                  : "No testimonials match your filters."}
              </div>
              {testimonials.length === 0 && (
                <Button
                  onClick={() => navigate("/admin/testimonials/add")}
                  className="mt-4 bg-linear-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Testimonial
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
