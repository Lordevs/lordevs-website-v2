import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface ExtendedProjectSection {
  id: string;
  title: string;
  description: string;
  screenshots: (string | File)[];
  screenshotPreviews: string[];
  isGrid: boolean;
}

interface ProjectSectionsSectionProps {
  sections: ExtendedProjectSection[];
  onAddSection: () => void;
  onRemoveSection: (id: string) => void;
  onUpdateSection: (
    id: string,
    field: keyof ExtendedProjectSection,
    value: string | boolean | (string | File)[] | string[]
  ) => void;
  onHandleSectionScreenshots: (
    sectionId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onRemoveSectionScreenshot: (sectionId: string, previewUrl: string) => void;
}

export default function ProjectSectionsSection({
  sections,
  onAddSection,
  onRemoveSection,
  onUpdateSection,
  onHandleSectionScreenshots,
  onRemoveSectionScreenshot,
}: ProjectSectionsSectionProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Project Sections</h2>
        <Button
          type="button"
          onClick={onAddSection}
          className="bg-linear-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>
      <div className="space-y-4">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Section</h3>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemoveSection(sec.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-white">Section Title</Label>
                <Input
                  value={sec.title}
                  onChange={(e) =>
                    onUpdateSection(sec.id, "title", e.target.value)
                  }
                  className="mt-1 border-white/20 bg-white/5 text-white"
                  placeholder="Title"
                />
              </div>
              <div>
                <Label className="text-white">Section Description</Label>
                <Textarea
                  value={sec.description}
                  onChange={(e) =>
                    onUpdateSection(sec.id, "description", e.target.value)
                  }
                  className="mt-1 border-white/20 bg-white/5 text-white"
                  rows={3}
                  placeholder="Description"
                />
              </div>
              <div>
                <Label className="text-white">Screenshots</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => onHandleSectionScreenshots(sec.id, e)}
                  className="mt-1 hidden"
                  id={`screenshots-${sec.id}`}
                />
                <Label
                  htmlFor={`screenshots-${sec.id}`}
                  className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-linear-to-r from-[#00B2FF] to-[#8F00FF] px-3 py-1 text-white hover:opacity-90">
                  <Upload className="h-4 w-4" /> Upload
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sec.screenshotPreviews
                    .filter((preview) => preview && preview.trim() !== "")
                    .map((preview) => (
                      <div key={preview} className="relative">
                        <img
                          src={preview}
                          alt="screenshot"
                          width={100}
                          height={100}
                          className="rounded object-cover"
                          onError={(e) => {
                            console.error("Image load error:", preview);
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        {preview.startsWith("http") && (
                          <div className="absolute top-1 left-1 rounded bg-blue-500 px-1 py-0.5 text-xs text-white">
                            Saved
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            onRemoveSectionScreenshot(sec.id, preview)
                          }
                          className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id={`grid-${sec.id}`}
                  checked={sec.isGrid}
                  onCheckedChange={(val) =>
                    onUpdateSection(sec.id, "isGrid", val)
                  }
                />
                <Label htmlFor={`grid-${sec.id}`} className="text-white">
                  Display as Grid
                </Label>
              </div>
            </div>
          </div>
        ))}
        {sections.length === 0 && (
          <p className="py-8 text-center text-white/70">
            No sections yet. Click &quot;Add Section&quot; to start.
          </p>
        )}
      </div>
    </div>
  );
}
