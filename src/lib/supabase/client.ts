import {
  createClient as createSupabaseClient,
  SupabaseClient,
} from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export function createClient() {
  if (supabaseInstance) return supabaseInstance;

  supabaseInstance = createSupabaseClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL!,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY!
  );

  return supabaseInstance;
}
