import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { getNewsById } from "@/lib/supabase/news";
import type { NewsRow } from "@/lib/types/database";
import { AdminHeader } from "@/components/admin/navigation";
import NewsForm from "@/components/admin/news/news-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EditNewsPage() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsRow | null>(null);
  const [loading, setLoading] = useState(true);

  const loadNews = useCallback(async () => {
    if (!id) return;
    try {
      const data = await getNewsById(id);
      setNews(data);
    } catch (_error) {
      console.error("Error loading news article:", _error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-white">Loading article...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-white">Article not found.</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <AdminHeader title="Edit Article" />
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            <NewsForm isEdit initialData={news} newsId={id} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
