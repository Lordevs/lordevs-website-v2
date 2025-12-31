import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

import {
  createProject,
  deleteProjectImage,
  type ProjectFormData,
  updateProject,
  uploadProjectImage,
} from "@/lib/supabase/projects";
import type { ProjectFeature, ProjectSection } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import type { IconName } from "@/components/ui/icon-picker";

import LoadingSpinner from "../common/loading-spinner";
import BasicInformationSection from "./basic-information-section";
import ProjectFeaturesSection from "./project-features-section";
import ProjectImageSection from "./project-image-section";
import ProjectSectionsSection from "./project-sections-section";
import TagsSection from "./tags-section";

// Extended section interface for form state management
interface ExtendedProjectSection extends Omit<ProjectSection, "screenshots"> {
  screenshots: (string | File)[];
  screenshotPreviews: string[];
}

// Extended feature interface for form state management
interface ExtendedProjectFeature extends Omit<ProjectFeature, "icon"> {
  icon: IconName;
  iconPreview: string;
}

// Extended form data interface
interface ExtendedProjectFormData
  extends Omit<ProjectFormData, "sections" | "features"> {
  sections: ExtendedProjectSection[];
  features: ExtendedProjectFeature[];
  main_image?: string;
  tagline?: string;
  //   is_featured: boolean;
}

export interface ProjectFormProps {
  initialData?: ProjectFormData;
  isEdit?: boolean;
  projectId?: string;
}

export default function ProjectForm({
  initialData,
  isEdit = false,
  projectId,
}: ProjectFormProps) {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.main_image || null
  );

  const [formData, setFormData] = useState<ExtendedProjectFormData>({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    tagline: initialData?.tagline || "",
    services: initialData?.services || "",
    categories: initialData?.categories || "",
    tags: initialData?.tags || [],
    is_active: initialData?.is_active ?? true,
    // is_featured: initialData?.is_featured ?? false,
    sections:
      initialData?.sections?.map((sec) => ({
        ...sec,
        screenshots: sec.screenshots || [],
        screenshotPreviews: sec.screenshots || [],
      })) || [],
    features:
      initialData?.features?.map((feat) => ({
        ...feat,
        icon: feat.icon || ("" as IconName),
        iconPreview: feat.icon || "",
      })) || [],
    live_url: initialData?.live_url || "",
    main_image: initialData?.main_image || "",
  });
  const [tagInput, setTagInput] = useState("");

  // Main image handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageRemove = async () => {
    if (imagePreview && imagePreview.startsWith("http")) {
      // If it's an existing image (URL), delete from storage
      try {
        await deleteProjectImage(imagePreview);
        toast.success("Image deleted from storage");
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("Failed to delete image from storage");
      }
    }
    // Reset image state
    setImageFile(null);
    setImagePreview(null);
    // Also update the form data to remove the main_image
    setFormData((prev) => ({
      ...prev,
      main_image: "",
    }));
  };

  // Section handlers
  const addSection = () => {
    const newSection: ExtendedProjectSection = {
      id: Date.now().toString(),
      title: "",
      description: "",
      screenshots: [],
      screenshotPreviews: [],
      isGrid: false,
    };
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const updateSection = (
    id: string,
    field: keyof ExtendedProjectSection,
    value: string | boolean | (string | File)[] | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === id ? { ...sec, [field]: value } : sec
      ),
    }));
  };

  const removeSection = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((sec) => sec.id !== id),
    }));
  };

  // Section screenshot handler
  const handleSectionScreenshots = (
    sectionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) => {
        if (sec.id === sectionId) {
          const previews = files.map((f) => URL.createObjectURL(f));
          return {
            ...sec,
            screenshots: [...sec.screenshots, ...files],
            screenshotPreviews: [...sec.screenshotPreviews, ...previews],
          };
        }
        return sec;
      }),
    }));
  };

  const removeSectionScreenshot = async (
    sectionId: string,
    previewUrl: string
  ) => {
    // If it's an existing image (URL), delete from storage
    if (previewUrl.startsWith("http")) {
      try {
        await deleteProjectImage(previewUrl);
        toast.success("Screenshot deleted from storage");
      } catch (error) {
        console.error("Error deleting screenshot:", error);
        toast.error("Failed to delete screenshot from storage");
      }
    }

    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) => {
        if (sec.id === sectionId) {
          const idx = sec.screenshotPreviews.indexOf(previewUrl);
          if (idx > -1) {
            // Create new arrays to avoid mutation
            const newScreenshots = [...sec.screenshots];
            const newPreviews = [...sec.screenshotPreviews];
            newScreenshots.splice(idx, 1);
            newPreviews.splice(idx, 1);
            return {
              ...sec,
              screenshots: newScreenshots,
              screenshotPreviews: newPreviews,
            };
          }
        }
        return sec;
      }),
    }));
  };

  // Feature handlers
  const addFeature = () => {
    const newFeature: ExtendedProjectFeature = {
      id: Date.now().toString(),
      title: "",
      description: "",
      icon: "" as IconName,
      iconPreview: "",
    };
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature],
    }));
  };

  const updateFeature = (
    id: string,
    field: keyof ExtendedProjectFeature,
    value: string | File
  ) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((fe) =>
        fe.id === id ? { ...fe, [field]: value } : fe
      ),
    }));
  };

  const removeFeature = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((fe) => fe.id !== id),
    }));
  };

  // Tags
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };
  const removeTag = (tag: string) =>
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Temp ID for uploads
      const tempId = Date.now().toString();

      // Upload section screenshots
      const sectionsWithUrls = await Promise.all(
        formData.sections.map(async (sec) => {
          // Separate existing URLs from new files
          const existingUrls = sec.screenshots.filter(
            (item): item is string => typeof item === "string"
          );
          const newFiles = sec.screenshots.filter(
            (item): item is File => item instanceof File
          );

          // Upload new files
          const newUrls = await Promise.all(
            newFiles.map((file) => uploadProjectImage(file, tempId))
          );

          // Combine existing URLs with new URLs
          const allUrls = [...existingUrls, ...newUrls];

          return {
            ...sec,
            screenshots: allUrls,
          };
        })
      );

      // Upload feature icons
      const featuresWithUrls = await Promise.all(
        formData.features.map(async (feat) => {
          return {
            id: feat.id,
            title: feat.title,
            description: feat.description,
            icon: feat.icon,
          };
        })
      );

      // Prepare payload
      const payload: ProjectFormData = {
        title: formData.title,
        subtitle: formData.subtitle,
        tagline: formData.tagline,
        services: formData.services,
        categories: formData.categories,
        tags: formData.tags,
        is_active: formData.is_active,
        sections: sectionsWithUrls.map((sec) => ({
          id: sec.id,
          title: sec.title,
          description: sec.description,
          screenshots: sec.screenshots,
          isGrid: sec.isGrid,
        })),
        features: featuresWithUrls,
        live_url: formData.live_url,
        main_image: formData.main_image,
      };

      if (isEdit && projectId) {
        // Update existing project
        await updateProject(
          projectId,
          payload,
          imageFile || undefined,
          formData.main_image || initialData?.main_image
        );
        toast.success("Project updated successfully!");
      } else {
        // Create new project
        await createProject(payload, imageFile || undefined);
        toast.success("Project created successfully!");
      }
      router(ROUTES.ADMIN.PROJECTS);
    } catch (error) {
      console.error(error);
      toast.error(
        isEdit ? "Failed to update project." : "Failed to create project."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicInformationSection
        title={formData.title}
        onUpdateTitle={(title) => setFormData((prev) => ({ ...prev, title }))}
        categories={formData.categories}
        onUpdateCategories={(categories) =>
          setFormData((prev) => ({ ...prev, categories }))
        }
        subtitle={formData.subtitle}
        onUpdateSubtitle={(subtitle) =>
          setFormData((prev) => ({ ...prev, subtitle }))
        }
        tagline={formData.tagline || ""}
        onUpdateTagline={(tagline) =>
          setFormData((prev) => ({ ...prev, tagline }))
        }
        services={formData.services}
        onUpdateServices={(services) =>
          setFormData((prev) => ({ ...prev, services }))
        }
        liveUrl={formData.live_url}
        onUpdateLiveUrl={(live_url) =>
          setFormData((prev) => ({ ...prev, live_url }))
        }
      />

      <ProjectImageSection
        imageFile={imageFile}
        imagePreview={imagePreview}
        onImageUpload={handleImageUpload}
        onImageRemove={handleImageRemove}
        hasExistingImage={!!initialData?.main_image}
      />

      <TagsSection
        tags={formData.tags}
        tagInput={tagInput}
        onTagInputChange={setTagInput}
        onAddTag={addTag}
        onRemoveTag={removeTag}
      />

      <ProjectSectionsSection
        sections={formData.sections}
        onAddSection={addSection}
        onRemoveSection={removeSection}
        onUpdateSection={updateSection}
        onHandleSectionScreenshots={handleSectionScreenshots}
        onRemoveSectionScreenshot={removeSectionScreenshot}
      />

      <ProjectFeaturesSection
        features={formData.features}
        onAddFeature={addFeature}
        onRemoveFeature={removeFeature}
        onUpdateFeature={updateFeature}
      />

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-linear-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90">
        {loading
          ? isEdit
            ? "Updating..."
            : "Creating..."
          : isEdit
          ? "Update Project"
          : "Create Project"}
      </Button>
    </form>
  );
}
