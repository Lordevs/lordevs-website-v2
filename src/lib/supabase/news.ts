import { createClient } from "@/lib/supabase/client";
import type { NewsRow, Database } from "@/lib/types/database";

const supabase = createClient();

export type NewsInsert = Database["public"]["Tables"]["news"]["Insert"];
export type NewsUpdate = Database["public"]["Tables"]["news"]["Update"];

export interface NewsFormData {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  thumbnail_url?: string;
  is_active: boolean;
  order_index?: number;
  published_at: string;
}

/**
 * Upload image to Supabase storage
 */
export const uploadNewsImage = async (
  file: File,
  newsId: string
): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const uniqueSuffix =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 10);

  const fileName = `${newsId}/${uniqueSuffix}.${fileExt}`;
  const filePath = `news/${fileName}`;

  const { error } = await supabase.storage
    .from("lordevs")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("lordevs").getPublicUrl(filePath);

  return publicUrl;
};

/**
 * Delete image from Supabase storage
 */
export const deleteNewsImage = async (imageUrl: string): Promise<void> => {
  const path = imageUrl.split("/storage/v1/object/public/lordevs/")[1];
  if (!path) return;

  const { error } = await supabase.storage.from("lordevs").remove([path]);
  if (error) throw error;
};

/**
 * Get all news with optional filtering
 */
export const getNews = async (filters?: {
  searchTerm?: string;
  isActive?: boolean;
}): Promise<NewsRow[]> => {
  let query = supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  if (filters?.isActive !== undefined) {
    query = query.eq("is_active", filters.isActive);
  }

  if (filters?.searchTerm) {
    query = query.ilike("title", `%${filters.searchTerm}%`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

/**
 * Get active news only (shorthand)
 */
export const getActiveNews = async (): Promise<NewsRow[]> => {
  return getNews({ isActive: true });
};

/**
 * Get news by ID
 */
export const getNewsById = async (id: string): Promise<NewsRow> => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get news by Slug
 */
export const getNewsBySlug = async (slug: string): Promise<NewsRow | null> => {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }
  return data;
};

/**
 * Create a new news article
 */
export const createNews = async (
  formData: NewsFormData,
  imageFile?: File
): Promise<NewsRow> => {
  const tempId = Date.now().toString();
  let thumbnailUrl = formData.thumbnail_url || "";

  if (imageFile) {
    thumbnailUrl = await uploadNewsImage(imageFile, tempId);
  }

  const payload: NewsInsert = {
    title: formData.title,
    excerpt: formData.excerpt || null,
    content: formData.content || null,
    thumbnail_url: thumbnailUrl || null,
    is_active: formData.is_active,
    order_index: formData.order_index || 0,
    published_at: formData.published_at,
    slug: formData.slug || undefined,
  };

  const { data, error } = await supabase
    .from("news")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update a news article
 */
export const updateNews = async (
  id: string,
  formData: NewsFormData,
  imageFile?: File,
  currentImageUrl?: string
): Promise<NewsRow> => {
  let thumbnailUrl = currentImageUrl || "";

  if (imageFile) {
    if (currentImageUrl) {
      try {
        await deleteNewsImage(currentImageUrl);
      } catch (e) {
        console.error("Error removing old image", e);
      }
    }
    thumbnailUrl = await uploadNewsImage(imageFile, id);
  }

  const payload: NewsUpdate = {
    title: formData.title,
    excerpt: formData.excerpt || null,
    content: formData.content || null,
    thumbnail_url: thumbnailUrl || null,
    is_active: formData.is_active,
    order_index: formData.order_index,
    published_at: formData.published_at,
    updated_at: new Date().toISOString(),
  };

  if (formData.slug) {
    payload.slug = formData.slug;
  }

  const { data, error } = await supabase
    .from("news")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a news article
 */
export const deleteNews = async (id: string): Promise<void> => {
  const news = await getNewsById(id);

  if (news.thumbnail_url) {
    try {
      await deleteNewsImage(news.thumbnail_url);
    } catch (e) {
      console.error("Error deleting image", e);
    }
  }

  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;
};

/**
 * Toggle news status
 */
export const toggleNewsStatus = async (
  id: string,
  isActive: boolean
): Promise<void> => {
  const { error } = await supabase
    .from("news")
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
};
