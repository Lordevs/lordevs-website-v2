import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/types/database";

type CareerInsert = Database["public"]["Tables"]["careers"]["Insert"];
type CareerUpdate = Database["public"]["Tables"]["careers"]["Update"];

export const getCareers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("careers")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getActiveCareers = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("careers")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getCareerById = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("careers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createCareer = async (careerData: CareerInsert) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("careers")
    .insert([careerData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateCareer = async (id: string, careerData: CareerUpdate) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("careers")
    .update(careerData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteCareer = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase.from("careers").delete().eq("id", id);

  if (error) throw error;
};
