import { useCallback, useEffect, useState } from "react";

import { getActiveNews, getNews } from "@/lib/supabase/news";
import type { NewsRow } from "@/lib/types/database";

export function useNews(activeOnly: boolean = false) {
  const [news, setNews] = useState<NewsRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = activeOnly ? await getActiveNews() : await getNews();
      setNews(data);
    } catch (err) {
      setError("Failed to fetch news articles");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const refetch = () => {
    fetchNews();
  };

  return {
    news,
    loading,
    error,
    refetch,
  };
}
