import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInformationSectionProps {
  title: string;
  onUpdateTitle: (value: string) => void;
  categories: string;
  onUpdateCategories: (value: string) => void;
  subtitle: string;
  onUpdateSubtitle: (value: string) => void;
  tagline: string;
  onUpdateTagline: (value: string) => void;
  services: string;
  onUpdateServices: (value: string) => void;
  liveUrl: string;
  onUpdateLiveUrl: (value: string) => void;
}

export default function BasicInformationSection({
  title,
  categories,
  subtitle,
  tagline,
  services,
  liveUrl,
  onUpdateTitle,
  onUpdateCategories,
  onUpdateSubtitle,
  onUpdateTagline,
  onUpdateServices,
  onUpdateLiveUrl,
}: BasicInformationSectionProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-xl font-semibold text-white">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="title" className="text-white">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            className="mt-1 border-white/20 bg-white/5 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="categories" className="text-white">
            Categories
          </Label>
          <Input
            id="categories"
            value={categories}
            onChange={(e) => onUpdateCategories(e.target.value)}
            className="mt-1 border-white/20 bg-white/5 text-white"
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="subtitle" className="text-white">
          Subtitle
        </Label>
        <Textarea
          id="subtitle"
          value={subtitle}
          onChange={(e) => onUpdateSubtitle(e.target.value)}
          className="mt-1 border-white/20 bg-white/5 text-white"
          rows={3}
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="tagline" className="text-white">
          Tagline
        </Label>
        <Input
          id="tagline"
          value={tagline}
          onChange={(e) => onUpdateTagline(e.target.value)}
          className="mt-1 border-white/20 bg-white/5 text-white"
          placeholder="Enter a catchy tagline for this project"
        />
      </div>
      <div className="mt-4">
        <Label htmlFor="services" className="text-white">
          Services
        </Label>
        <Textarea
          id="services"
          value={services}
          onChange={(e) => onUpdateServices(e.target.value)}
          className="mt-1 border-white/20 bg-white/5 text-white"
          rows={3}
          placeholder="Describe the services provided for this project"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="liveUrl" className="text-white">
            Live URL
          </Label>
          <Input
            id="liveUrl"
            type="url"
            value={liveUrl}
            onChange={(e) => onUpdateLiveUrl(e.target.value)}
            className="mt-1 border-white/20 bg-white/5 text-white"
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  );
}
