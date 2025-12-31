import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

interface ProjectFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  categories: string[];
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function ProjectFilters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterCategory,
  setFilterCategory,
  categories,
}: ProjectFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-[250px] rounded-lg border border-blue-500/30 bg-gradient-to-r from-[#23243A]/50 to-[#181A20]/50 pl-10 text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <Select
          defaultValue={filterStatus}
          onValueChange={(value) => setFilterStatus(value)}
        >
          <SelectTrigger className="min-w-[150px] rounded-lg border border-blue-500/30 bg-gradient-to-r from-[#23243A]/50 to-[#181A20]/50 px-3 py-2 text-white backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none">
            <span className="text-gray-400">
              {STATUS_OPTIONS.find((s) => s.value === filterStatus)?.label ||
                'All Status'}
            </span>
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={filterCategory}
          onValueChange={(value) => setFilterCategory(value)}
        >
          <SelectTrigger className="min-w-[150px] rounded-lg border border-blue-500/30 bg-gradient-to-r from-[#23243A]/50 to-[#181A20]/50 px-3 py-2 text-white backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none">
            <span className="text-gray-400">
              {filterCategory === 'all' ? 'All Categories' : filterCategory}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Link href={ROUTES.ADMIN.ADD_PROJECT}>
        <Button className="group relative bg-gradient-to-r from-[#00B2FF] to-[#8F00FF] shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:from-[#0094D9] hover:to-[#7300D9] hover:shadow-blue-500/40">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00B2FF] to-[#8F00FF] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20" />
          <Plus className="relative mr-2 h-4 w-4" />
          <span className="relative">New Project</span>
        </Button>
      </Link>
    </div>
  );
}
