import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { ListFilter, Plus, Search } from "lucide-react";
import { useNews } from "@/hooks/use-news";
import type { NewsRow } from "@/lib/types/database";
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
import NewsCard from "@/components/admin/news/news-card";

export default function NewsPage() {
  const navigate = useNavigate();
  const { news: allNews, loading } = useNews();
  const [news, setNews] = useState<NewsRow[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const filterNews = useCallback(() => {
    let filtered = news;

    if (searchTerm) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((n) =>
        statusFilter === "active" ? n.is_active : !n.is_active
      );
    }

    setFilteredNews(filtered);
  }, [news, searchTerm, statusFilter]);

  useEffect(() => {
    setNews(allNews);
  }, [allNews]);

  useEffect(() => {
    filterNews();
  }, [filterNews]);

  const handleEdit = (id: string) => {
    navigate(ROUTES.ADMIN.EDIT_NEWS(id));
  };

  const handleDelete = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const handleToggleStatus = (id: string, isActive: boolean) => {
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_active: isActive } : n))
    );
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-white">Loading news articles...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader title="News Articles" />
      <main className="relative p-6">
        {/* Stats */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">{news.length}</div>
            <div className="text-sm text-white/60">Total Articles</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-400">
              {news.filter((n) => n.is_active).length}
            </div>
            <div className="text-sm text-white/60">Active</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
            <div className="text-2xl font-bold text-red-400">
              {news.filter((n) => !n.is_active).length}
            </div>
            <div className="text-sm text-white/60">Drafts</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search news..."
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
              onClick={() => navigate(ROUTES.ADMIN.ADD_NEWS)}
              className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add News
            </Button>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="text-white/60">
                {news.length === 0
                  ? "No news articles found. Create your first article!"
                  : "No news match your filters."}
              </div>
              {news.length === 0 && (
                <Button
                  onClick={() => navigate(ROUTES.ADMIN.ADD_NEWS)}
                  className="mt-4 bg-linear-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add News
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((n) => (
              <NewsCard
                key={n.id}
                news={n}
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
