import { createClient } from '@/lib/supabase/client';
import { Testimonial } from '@/lib/types/database';

const supabase = createClient();

export interface TestimonialFormData {
  image: string;
  name: string;
  country: string;
  content: string;
  rating: number;
  is_active: boolean;
}

/**
 * Upload testimonial image to Supabase storage
 */
export const uploadTestimonialImage = async (
  file: File,
  testimonialId: string
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const uniqueSuffix =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 10);

  const fileName = `${testimonialId}-${uniqueSuffix}.${fileExt}`;
  const filePath = `testimonials/${fileName}`;

  const { data, error } = await supabase.storage
    .from('testimonial-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from('lordevs').getPublicUrl(data.path);

  return publicUrl;
};

/**
 * Delete testimonial image from Supabase storage
 */
export const deleteTestimonialImage = async (
  imageUrl: string
): Promise<void> => {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const filePath = `testimonials/${fileName}`;

    const { error } = await supabase.storage
      .from('testimonial-images')
      .remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting testimonial image:', error);
    throw error;
  }
};

/**
 * Create a new testimonial
 */
export const createTestimonial = async (
  testimonialData: TestimonialFormData,
  imageFile?: File
): Promise<Testimonial> => {
  const tempId = Date.now().toString();
  let imageUrl = testimonialData.image;

  // Upload image if provided
  if (imageFile) {
    imageUrl = await uploadTestimonialImage(imageFile, tempId);
  }

  const { data, error } = await supabase
    .from('testimonials')
    .insert({
      ...testimonialData,
      image: imageUrl,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update an existing testimonial
 */
export const updateTestimonial = async (
  id: string,
  testimonialData: TestimonialFormData,
  imageFile?: File,
  existingImageUrl?: string
): Promise<Testimonial> => {
  let imageUrl = testimonialData.image;

  // Upload new image if provided
  if (imageFile) {
    imageUrl = await uploadTestimonialImage(imageFile, id);

    // Delete old image if it exists and is different
    if (existingImageUrl && existingImageUrl !== imageUrl) {
      try {
        await deleteTestimonialImage(existingImageUrl);
      } catch (error) {
        console.error('Error deleting old testimonial image:', error);
      }
    }
  }

  const { data, error } = await supabase
    .from('testimonials')
    .update({
      ...testimonialData,
      image: imageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get all testimonials
 */
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get active testimonials only
 */
export const getActiveTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get testimonial by ID
 */
export const getTestimonialById = async (id: string): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a testimonial
 */
export const deleteTestimonial = async (id: string): Promise<void> => {
  // First get the testimonial to get the image URL
  const testimonial = await getTestimonialById(id);

  // Delete the testimonial record
  const { error } = await supabase.from('testimonials').delete().eq('id', id);

  if (error) throw error;

  // Delete the image if it exists
  if (testimonial.image) {
    try {
      await deleteTestimonialImage(testimonial.image);
    } catch (error) {
      console.error('Error deleting testimonial image:', error);
    }
  }
};

/**
 * Toggle testimonial active status
 */
export const toggleTestimonialStatus = async (
  id: string,
  isActive: boolean
): Promise<Testimonial> => {
  const { data, error } = await supabase
    .from('testimonials')
    .update({
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
