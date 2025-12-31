import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (id) {
      loadNews();
    }
  }, [id]);

  const loadNews = async () => {
    try {
      const data = await getNewsById(id!);
      setNews(data);
    } catch (error) {
      console.error("Error loading news article:", error);
    } finally {
      setLoading(false);
    }
  };

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
