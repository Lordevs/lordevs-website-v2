import { AVAILABLE_PAGES, FILTER_OPTIONS } from "@/constants/admin";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type FAQFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPage: string;
  setFilterPage: (page: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  setShowForm: (show: boolean) => void;
};

export default function FAQFilters({
  searchTerm,
  setSearchTerm,
  filterPage,
  setFilterPage,
  filterStatus,
  setFilterStatus,
  setShowForm,
}: FAQFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-blue-500/30 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50 pl-10 text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <Select
        defaultValue={filterPage}
        onValueChange={(value) => setFilterPage(value)}>
        <SelectTrigger className="rounded-lg border border-blue-500/30 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50 px-3 py-2 text-white backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none">
          <span className="text-gray-400">
            {AVAILABLE_PAGES.find((p) => p.id === filterPage)?.label ||
              "All Pages"}
          </span>
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_PAGES.map((page) => (
            <SelectItem key={page.id} value={page.id}>
              {page.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={filterStatus}
        onValueChange={(value) => setFilterStatus(value)}>
        <SelectTrigger className="rounded-lg border border-blue-500/30 bg-linear-to-r from-[#23243A]/50 to-[#181A20]/50 px-3 py-2 text-white backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none">
          <span className="text-gray-400">
            {FILTER_OPTIONS.status.find((s) => s.value === filterStatus)
              ?.label || "All Status"}
          </span>
        </SelectTrigger>
        <SelectContent>
          {FILTER_OPTIONS.status.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={() => setShowForm(true)}
        className="group relative bg-linear-to-r from-[#00B2FF] to-[#8F00FF] shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-[#0094D9] hover:to-[#7300D9] hover:shadow-blue-500/40">
        <div className="absolute inset-0 rounded-lg bg-linear-to-r from-[#00B2FF] to-[#8F00FF] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20" />
        <Plus className="relative mr-2 h-4 w-4" />
        <span className="relative">New FAQ</span>
      </Button>
    </div>
  );
}
