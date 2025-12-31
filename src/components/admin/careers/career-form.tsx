import { useState } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createCareer, updateCareer } from "@/lib/supabase/careers";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import type { CareerRow } from "@/lib/types/database";

const careerSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  features: z.array(z.string().min(1, "Feature cannot be empty")),
  tags: z.array(z.string().min(1, "Tag cannot be empty")),
  is_active: z.boolean().default(true),
  order_index: z.coerce.number().default(0),
});

type CareerFormValues = z.infer<typeof careerSchema>;

interface CareerFormProps {
  initialData?: CareerRow;
  isEdit?: boolean;
}

export function CareerForm({ initialData, isEdit = false }: CareerFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse initial arrays from DB (in case they are null, though schema has defaults)
  const defaultValues: Partial<CareerFormValues> = {
    title: initialData?.title || "",
    features: initialData?.features || [""],
    tags: initialData?.tags || [""],
    is_active: initialData?.is_active ?? true,
    order_index: initialData?.order_index || 0,
  };

  const form = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema) as any,
    defaultValues,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "features",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    // @ts-ignore
    name: "tags",
  });

  const onSubmit: SubmitHandler<CareerFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      // Filter out empty strings from arrays before saving
      const cleanedData = {
        title: data.title,
        is_active: data.is_active,
        order_index: data.order_index,
        features: data.features.filter((f) => f.trim() !== ""),
        tags: data.tags.filter((t) => t.trim() !== ""),
      };

      if (isEdit && initialData) {
        await updateCareer(initialData.id, cleanedData);
        toast.success("Career updated successfully");
      } else {
        await createCareer(cleanedData);
        toast.success("Career created successfully");
      }
      navigate(ROUTES.ADMIN.CAREERS);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save career");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(ROUTES.ADMIN.CAREERS)}
          className="rounded-full hover:bg-white/10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold md:text-3xl text-white">
          {isEdit ? "Edit Career" : "Add New Career"}
        </h1>
      </div>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Career Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-white">
                  Job Title
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="e.g. Backend Developer"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">
                      Features / Requirements
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendFeature("")}
                      className="h-8 border-white/20 bg-transparent text-white hover:bg-white/10">
                      <Plus className="mr-2 h-3 w-3" /> Add Feature
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {featureFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <Input
                          {...register(`features.${index}` as const)}
                          placeholder="e.g. Scalable API Design"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFeature(index)}
                          className="shrink-0 text-red-400 hover:bg-red-400/10 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {errors.features && (
                      <p className="text-sm text-red-500">
                        {errors.features.message as any}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Tags</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendTag("")}
                      className="h-8 border-white/20 bg-transparent text-white hover:bg-white/10">
                      <Plus className="mr-2 h-3 w-3" /> Add Tag
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {tagFields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <Input
                          {...register(`tags.${index}` as const)}
                          placeholder="e.g. Full Time"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTag(index)}
                          className="shrink-0 text-red-400 hover:bg-red-400/10 hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {errors.tags && (
                      <p className="text-sm text-red-500">
                        {errors.tags.message as any}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="order_index" className="text-white">
                    Order Index
                  </Label>
                  <Input
                    id="order_index"
                    type="number"
                    {...register("order_index")}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  <p className="text-xs text-gray-400">
                    Lower numbers appear first
                  </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base text-white">
                      Active Status
                    </Label>
                    <p className="text-sm text-gray-400">
                      Show this career on the public page
                    </p>
                  </div>
                  <Switch
                    checked={form.watch("is_active")}
                    onCheckedChange={(checked) =>
                      form.setValue("is_active", checked)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(ROUTES.ADMIN.CAREERS)}
                className="text-white hover:bg-white/10 hover:text-white">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="gradient"
                className="min-w-[120px]">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Career"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
