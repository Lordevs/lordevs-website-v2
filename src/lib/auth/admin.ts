import { getSupabaseClient } from "@/lib/supabase/server";

export async function isAdminUser(email: string): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("admin_users")
      .select("id, is_active")
      .eq("email", email)
      .eq("is_active", true)
      .single();

    if (error || !data) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking admin user:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const supabase = getSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getCurrentAdminUser() {
  try {
    const user = await getCurrentUser();
    if (!user) return null;

    const isAdmin = await isAdminUser(user.email!);
    if (!isAdmin) return null;

    return user;
  } catch (error) {
    console.error("Error getting current admin user:", error);
    return null;
  }
}
