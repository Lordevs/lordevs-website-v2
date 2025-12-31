import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ImagePlus, X, Calendar } from "lucide-react";

import { createNews, updateNews, deleteNewsImage } from "@/lib/supabase/news";
import type { NewsRow } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import AdminForm from "../common/form";
import MarkdownEditor from "../common/markdown-editor";

// type NewsInsert = Database["public"]["Tables"]["news"]["Insert"];

export interface NewsFormProps {
  initialData?: NewsRow;
  isEdit?: boolean;
  newsId?: string;
}

export default function NewsForm({
  initialData,
  isEdit = false,
  newsId,
}: NewsFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.thumbnail_url || null
  );

  const [formData, setFormData] = useState<Partial<NewsRow>>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    is_active: initialData?.is_active ?? true,
    published_at: initialData?.published_at || new Date().toISOString(),
    order_index: initialData?.order_index || 0,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageRemove = async () => {
    if (imagePreview && imagePreview.startsWith("http") && !imageFile) {
      try {
        await deleteNewsImage(imagePreview);
        toast.success("Image deleted from storage");
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newsData = {
        title: formData.title!,
        slug: formData.slug || undefined,
        excerpt: formData.excerpt || undefined,
        content: formData.content || undefined,
        thumbnail_url: initialData?.thumbnail_url || undefined,
        is_active: formData.is_active!,
        order_index: formData.order_index,
        published_at: formData.published_at!,
      };

      if (isEdit && newsId) {
        await updateNews(
          newsId,
          newsData,
          imageFile || undefined,
          initialData?.thumbnail_url || undefined
        );
        toast.success("News article updated successfully!");
      } else {
        await createNews(newsData, imageFile || undefined);
        toast.success("News article created successfully!");
      }
      navigate("/admin/news");
    } catch (error) {
      console.error(error);
      toast.error(
        isEdit
          ? "Failed to update news article."
          : "Failed to create news article."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminForm
      id="news-form"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      isSubmitting={loading}
      submitLabel={isEdit ? "Update Article" : "Create Article"}
      className="space-y-8 p-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Slug */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Article Content
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="mt-1 border-white/20 bg-white/5 text-white"
                  placeholder="Enter article title"
                  required
                />
              </div>
              {/* <div>
                <Label htmlFor="slug" className="text-white">
                  Slug (Optional)
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="mt-1 border-white/20 bg-white/5 text-white"
                  placeholder="auto-generated-from-title"
                />
              </div> */}
              <div>
                <Label htmlFor="excerpt" className="text-white">
                  Excerpt (Summary)
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      excerpt: e.target.value,
                    }))
                  }
                  className="mt-1 border-white/20 bg-white/5 text-white"
                  placeholder="Brief summary for list view..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="content" className="text-white">
                  Full Content (Markdown)
                </Label>
                <MarkdownEditor
                  value={formData.content || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: value,
                    }))
                  }
                  className="mt-1 min-h-[500px]"
                  placeholder="# Article content here..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Status & Date */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Publishing
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="is_active"
                  className="text-white cursor-pointer">
                  Active / Visible
                </Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, is_active: checked }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="published_at" className="text-white">
                  Publish Date
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="published_at"
                    type="datetime-local"
                    value={formData.published_at?.slice(0, 16)}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        published_at: new Date(e.target.value).toISOString(),
                      }))
                    }
                    className="border-white/20 bg-white/5 text-white pr-10"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Image */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-xl font-semibold text-white">Thumbnail</h2>
            <div className="space-y-4">
              {imagePreview ? (
                <div className="group relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={handleImageRemove}>
                      <X className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative aspect-video w-full">
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/10 bg-white/5 transition-colors hover:bg-white/10">
                    <ImagePlus className="mb-2 h-8 w-8 text-white/40" />
                    <span className="text-sm text-white/40">
                      Upload Thumbnail
                    </span>
                    <input
                      id="thumbnail-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
              <p className="text-xs text-white/40">
                Recommended size: 1200x630px
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
