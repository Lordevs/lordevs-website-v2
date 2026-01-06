import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { ListFilter, Plus, Search } from "lucide-react";
import { useCareers } from "@/hooks/use-careers";
import type { CareerRow } from "@/lib/types/database";
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
import CareerAdminCard from "@/components/admin/careers/career-admin-card";

export default function AdminCareersPage() {
  const navigate = useNavigate();
  const { careers: allCareers, loading } = useCareers();
  const [careers, setCareers] = useState<CareerRow[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<CareerRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const filterCareers = useCallback(() => {
    let filtered = careers;

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) =>
        statusFilter === "active" ? c.is_active : !c.is_active
      );
    }

    setFilteredCareers(filtered);
  }, [careers, searchTerm, statusFilter]);

  useEffect(() => {
    setCareers(allCareers);
  }, [allCareers]);

  useEffect(() => {
    filterCareers();
  }, [filterCareers]);

  const handleEdit = (id: string) => {
    navigate(ROUTES.ADMIN.EDIT_CAREER(id));
  };

  const handleDelete = (id: string) => {
    setCareers((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleStatus = (id: string, isActive: boolean) => {
    setCareers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_active: isActive } : c))
    );
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-white">Loading career opportunities...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader title="Career Opportunities" />
      <main className="relative p-6">
        {/* Stats */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">
              {careers.length}
            </div>
            <div className="text-sm text-white/60">Total Positions</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-400">
              {careers.filter((c) => c.is_active).length}
            </div>
            <div className="text-sm text-white/60">Active</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-red-400">
              {careers.filter((c) => !c.is_active).length}
            </div>
            <div className="text-sm text-white/60">Drafts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search positions..."
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
                <SelectItem value="inactive">Drafts</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => navigate(ROUTES.ADMIN.ADD_CAREER)}
              className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add Position
            </Button>
          </div>
        </div>

        {/* Careers Grid */}
        {filteredCareers.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="text-white/60">
                {careers.length === 0
                  ? "No career positions found. Create your first one!"
                  : "No positions match your filters."}
              </div>
              {careers.length === 0 && (
                <Button
                  onClick={() => navigate(ROUTES.ADMIN.ADD_CAREER)}
                  className="mt-4 bg-linear-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Position
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCareers.map((career) => (
              <CareerAdminCard
                key={career.id}
                career={career}
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
