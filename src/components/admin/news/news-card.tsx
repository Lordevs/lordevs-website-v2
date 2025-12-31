import { useState } from "react";
import {
  Edit,
  Eye,
  EyeOff,
  Trash2,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

import { deleteNews, toggleNewsStatus } from "@/lib/supabase/news";
import type { NewsRow } from "@/lib/types/database";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface NewsCardProps {
  news: NewsRow;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
}

export default function NewsCard({
  news,
  onEdit,
  onDelete,
  onToggleStatus,
}: NewsCardProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteNews(news.id);
      onDelete(news.id);
      toast.success("News article deleted successfully");
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news article");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      await toggleNewsStatus(news.id, !news.is_active);
      onToggleStatus(news.id, !news.is_active);
      toast.success(
        `News article ${
          news.is_active ? "deactivated" : "activated"
        } successfully`
      );
    } catch (error) {
      console.error("Error toggling news status:", error);
      toast.error("Failed to update news status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20">
      <CardHeader className="mb-0">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {news.thumbnail_url && (
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5">
                <img
                  src={news.thumbnail_url}
                  alt={news.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="line-clamp-1 font-semibold text-white">
                {news.title}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/40">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(news.published_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-3 w-3" />
                  <span className="line-clamp-1 max-w-[150px]">
                    {news.slug}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="line-clamp-2 text-sm text-white/80">
          {news.excerpt || "No excerpt provided."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                news.is_active ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-xs text-white/60">
              {news.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleStatus}
              disabled={loading}
              className="h-8 w-8 p-0 text-white/60 hover:text-white">
              {news.is_active ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(news.id)}
              className="h-8 w-8 p-0 text-white/60 hover:text-white">
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-white/60 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete News Article</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{news.title}"? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700">
                    {loading ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
