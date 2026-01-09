import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import {
  ReusableForm,
  type FieldConfig,
} from "@/components/common/reuseable-form";

// Zod schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  subject: z.enum([
    "general-inquiry",
    "support-request",
    "career-opportunity",
    "feedback",
    "partnership-inquiry",
    "other",
  ]),
});

// Field configuration for contact form
const contactFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
  { name: "email", label: "Email", type: "email", placeholder: "Your email" },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Type your message",
  },
  {
    name: "subject",
    label: "Subject",
    type: "radio",
    options: [
      { label: "General Inquiry", value: "general-inquiry" },
      { label: "Support Request", value: "support-request" },
      { label: "Career Opportunity", value: "career-opportunity" },
      { label: "Feedback", value: "feedback" },
      { label: "Partnership Inquiry", value: "partnership-inquiry" },
      { label: "Other", value: "other" },
    ],
  },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (
    values: z.infer<typeof contactFormSchema>
  ) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success(
          "Message sent successfully! We'll get back to you soon. Check your email for confirmation."
        );
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-32 pb-20 md:px-0">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src="/images/backgrounds/home/hero-bg.svg"
          alt="Background dots"
          className="object-cover opacity-70 w-full h-full"
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
      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="mx-auto grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          {/* Left Info Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-left text-white">
            <h2 className="text-4xl leading-16 font-bold md:text-5xl">
              Ask whatever you have in your mind
            </h2>
            <p className="text-lg text-[#FFFFFFCC]">
              Whether you have questions or are ready to discuss your business,
              we&rsquo;re here to help. Reach out today.
            </p>
            <div className="flex items-center space-x-3 text-[#FFFFFFB2]">
              <Mail className="h-5 w-5" />
              <a
                href="mailto:info@dotcodesolutions.com"
                className="hover:text-[#FFFFFFB2]">
                info@dotcodesolutions.com
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
                submitLabel={isSubmitting ? "Sending..." : "Send Message"}
                disabled={isSubmitting}
                resetOnSuccess={true}
                defaultValues={{
                  name: "",
                  email: "",
                  message: "",
                  subject: "general-inquiry",
                }}
              />
            </div>
            <div className="absolute -right-2 -bottom-4 -z-10 h-40 w-16 rounded-full bg-linear-to-r from-[#00B1FE] to-[#504EFF] blur-[20px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
