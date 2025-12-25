import { createClient } from '@/lib/supabase/server';
import type { FAQ } from '@/lib/types/database';

export async function getFAQsForPage(page: string): Promise<FAQ[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .or(`pages.cs.{${page}},pages.cs.{all}`)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return data || [];
}

export async function getAllFAQs(): Promise<FAQ[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return data || [];
}
