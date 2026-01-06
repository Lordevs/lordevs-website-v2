import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import * as z from "zod";

import {
  type FieldConfig,
  ReusableForm,
} from "@/components/common/reuseable-form";

import { toast } from "sonner";
import { submitJobApplication } from "@/lib/supabase/job-applications";
import { useCareers } from "@/hooks/use-careers";

// Zod schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNo: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
  applyingFor: z.string().min(1, "Please select a role"),
  resume: z
    .any()
    .refine((file) => file instanceof File, "Resume is required")
    .refine((file) => file?.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file?.type),
      "Only .pdf, .doc, and .docx formats are supported."
    ),
});

export function ApplyJobSection() {
  const { careers, loading } = useCareers(true);

  // Field configuration moved inside component to access careers data
  const contactFields: FieldConfig[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your full name",
    },
    { name: "email", label: "Email", type: "email", placeholder: "Your email" },
    {
      name: "phoneNo",
      label: "Phone Number",
      type: "tel",
      placeholder: "Your phone no",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Type your message",
    },
    {
      name: "applyingFor",
      label: "Applying for",
      type: "select",
      options: loading
        ? []
        : careers.map((career) => ({
            label: career.title,
            value: career.title,
          })),
      placeholder: loading ? "Loading positions..." : "Select your option",
    },
    {
      name: "resume",
      label: "Resume",
      type: "file",
      accept: ".pdf,.doc,.docx",
    },
  ];

  const handleContactSubmit = async (
    values: z.infer<typeof contactFormSchema>
  ) => {
    try {
      const resumeFile = values.resume;
      await submitJobApplication(
        {
          name: values.name,
          email: values.email,
          phoneNo: values.phoneNo,
          message: values.message,
          applyingFor: values.applyingFor,
        },
        resumeFile
      );
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/images/backgrounds/home/hero-bg.svg"
          alt="Background dots"
          className="object-cover opacity-70 h-full w-full"
        />
        <div
          className="absolute top-0 -left-1/3 aspect-video w-[900px]"
          style={{
            background:
              "radial-gradient(circle, #4742B6 0%, rgba(59,130,246,0.2) 30%, rgba(59,130,246,0.1) 50%, transparent 70%)",
            filter: "blur(132px)",
          }}
        />
        <div
          className="absolute bottom-1/12 -left-5/12 aspect-video w-[900px]"
          style={{
            background:
              "radial-gradient(circle, #8F403E 0%, rgba(249,115,22,0.2) 30%, rgba(249,115,22,0.1) 50%, transparent 70%)",
            filter: "blur(103px)",
          }}
        />
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          {/* Left Info Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-left text-white">
            <h2 className="text-3xl leading-12 font-bold md:text-5xl md:leading-16">
              Apply for our career opportunities
            </h2>
            <p className="text-base text-[#FFFFFFCC] md:text-lg">
              Take the next step in your professional journey by joining a team
              that&rsquo;s building the future with AI and innovation
            </p>
            <div className="flex items-center space-x-3 text-[#FFFFFFB2]">
              <Mail className="h-5 w-5" />
              <a
                href="mailto:info@DotCode.com"
                className="hover:text-[#FFFFFFB2]">
                info@DotCode.com
              </a>
            </div>
          </motion.div>

          {/* Form Block (reusable) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-xl bg-linear-to-br from-[#363636] to-[#DEDEDE] p-px">
            <div className="rounded-xl bg-black p-8 md:p-12">
              <ReusableForm
                schema={contactFormSchema}
                fields={contactFields}
                onSubmit={handleContactSubmit}
                submitLabel={loading ? "Loading..." : "Submit"}
                resetOnSuccess={true}
              />
            </div>
            <div className="absolute -right-2 -bottom-4 -z-10 h-40 w-16 rounded-full bg-linear-to-r from-[#00B1FE] to-[#504EFF] blur-[20px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
