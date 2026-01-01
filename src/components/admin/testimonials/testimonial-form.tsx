import { useState } from "react";
import { useNavigate } from "react-router";
import { Star } from "lucide-react";
import { toast } from "sonner";

import {
  createTestimonial,
  type TestimonialFormData,
  updateTestimonial,
} from "@/lib/supabase/testimonials";
import type { Testimonial } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Flag } from "@/components/ui/flag";
import { FlagPicker } from "@/components/ui/flag-picker";
import { type FlagCode, flagsData } from "@/components/ui/flags-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import AdminForm from "../common/form";

export interface TestimonialFormProps {
  initialData?: Testimonial;
  isEdit?: boolean;
  testimonialId?: string;
}

export default function TestimonialForm({
  initialData,
  isEdit = false,
  testimonialId,
}: TestimonialFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<FlagCode | undefined>(
    (initialData?.country as FlagCode) || undefined
  );

  const [formData, setFormData] = useState<TestimonialFormData>({
    image: initialData?.image || "",
    name: initialData?.name || "",
    country: initialData?.country || "",
    content: initialData?.content || "",
    rating: initialData?.rating || 5,
    is_active: initialData?.is_active ?? true,
  });

  // Flag handlers
  const handleCountryChange = (country: FlagCode) => {
    setSelectedCountry(country);
    // Get the country name from the flags data
    const countryName =
      flagsData.find((flag) => flag.code === country)?.name || country;
    setFormData((prev) => ({ ...prev, country: countryName, image: country }));
  };

  const handleClearCountry = () => {
    setSelectedCountry(undefined);
    setFormData((prev) => ({ ...prev, country: "", image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit && testimonialId) {
        await updateTestimonial(
          testimonialId,
          formData,
          undefined, // No image file since we're using flags
          initialData?.image
        );
        toast.success("Testimonial updated successfully!");
      } else {
        await createTestimonial(formData, undefined); // No image file since we're using flags
        toast.success("Testimonial created successfully!");
      }
      navigate("/admin/testimonials");
    } catch (error) {
      console.error(error);
      toast.error(
        isEdit
          ? "Failed to update testimonial."
          : "Failed to create testimonial."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 cursor-pointer transition-colors ${index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300 hover:text-yellow-400"
          }`}
        onClick={() => setFormData((prev) => ({ ...prev, rating: index + 1 }))}
      />
    ));
  };

  return (
    <AdminForm
      id="testimonial-form"
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
      isSubmitting={loading}
      cancelLabel="Cancel"
      submitLabel={isEdit ? "Update Testimonial" : "Create Testimonial"}
      className="space-y-8 p-6"
      btnContainerClassName="flex-row-reverse">
      {/* <form onSubmit={handleSubmit} className="relative space-y-8 p-6"> */}
      {/* Basic Information */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="mt-1 border-white/20 bg-white/5 text-white"
              required
            />
          </div>
          <div>
            <Label htmlFor="country" className="text-white">
              Country
            </Label>
            <Input
              id="country"
              value={formData.country}
              className="mt-1 border-white/20 bg-white/5 text-white"
              readOnly
              placeholder="Country will be set when you select a flag"
            />
          </div>
        </div>
      </div>

      {/* Country Flag */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-semibold text-white">Country Flag</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Select Country</Label>
            <div className="mt-2 flex items-center gap-4">
              <FlagPicker
                value={selectedCountry}
                onValueChange={handleCountryChange}
                triggerPlaceholder="Select a country"
                searchPlaceholder="Search countries..."
                className="w-fit"
              />

              {selectedCountry && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearCountry}
                  className="border-white/20 text-white/80 hover:text-white">
                  Clear
                </Button>
              )}
            </div>
          </div>

          {selectedCountry && (
            <div className="space-y-3">
              <Label className="text-white/80">Selected Country:</Label>
              <div className="flex items-center gap-3">
                <Flag code={selectedCountry} size="xl" />
                <div className="text-white">
                  <div className="font-medium">{formData.country}</div>
                  <div className="text-sm text-white/70">
                    Country Code: {selectedCountry}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Testimonial Content
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="content" className="text-white">
              Content
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className="mt-1 border-white/20 bg-white/5 text-white"
              rows={4}
              required
              placeholder="Enter testimonial content..."
            />
          </div>
          <div>
            <Label className="text-white">Rating</Label>
            <div className="mt-2 flex items-center gap-1">
              {renderStars(formData.rating)}
              <span className="ml-2 text-sm text-white/70">
                {formData.rating} out of 5 stars
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-semibold text-white">Status</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, is_active: checked }))
            }
          />
          <Label htmlFor="is_active" className="text-white">
            Active Testimonial
          </Label>
        </div>
      </div>
    </AdminForm>
  );
}
