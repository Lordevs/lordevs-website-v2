import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/types/database";

type ApplicationInsert =
  Database["public"]["Tables"]["job_applications"]["Insert"];

export interface JobApplicationData {
  name: string;
  email: string;
  phoneNo: string;
  message: string;
  applyingFor: string;
}

export const uploadResume = async (file: File, applicationId: string) => {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const filePath = `${applicationId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from("resumes").getPublicUrl(filePath);
  return data.publicUrl;
};

export const submitJobApplication = async (
  formData: JobApplicationData,
  resumeFile: File
) => {
  const supabase = createClient();

  // 1. Generate an ID first so we can use it for the file name (optional, or just use random UUID for file)
  // Actually, we can just let DB generate ID, but we need resume URL first?
  // No, best practice: upload file first with a random name? Or use a temp ID.
  const tempId = crypto.randomUUID();

  // Upload resume
  const resumeUrl = await uploadResume(resumeFile, tempId);

  // 2. Insert record
  const payload: ApplicationInsert = {
    name: formData.name,
    email: formData.email,
    phone_number: formData.phoneNo,
    message: formData.message,
    role: formData.applyingFor,
    resume_url: resumeUrl,
  };

  const { data, error } = await supabase
    .from("job_applications")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getJobApplications = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const deleteJobApplication = async (id: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("job_applications")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
