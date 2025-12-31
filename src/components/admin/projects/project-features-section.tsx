'use client';

import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconName, IconPicker } from '@/components/ui/icon-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ExtendedProjectFeature {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  iconPreview: string;
}

interface ProjectFeaturesSectionProps {
  features: ExtendedProjectFeature[];
  onAddFeature: () => void;
  onRemoveFeature: (id: string) => void;
  onUpdateFeature: (
    id: string,
    field: keyof ExtendedProjectFeature,
    value: string | File
  ) => void;
}

export default function ProjectFeaturesSection({
  features,
  onAddFeature,
  onRemoveFeature,
  onUpdateFeature,
}: ProjectFeaturesSectionProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Project Features</h2>
        <Button
          type="button"
          onClick={onAddFeature}
          className="bg-gradient-to-r from-[#00B2FF] to-[#8F00FF] hover:opacity-90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Feature
        </Button>
      </div>
      <div className="space-y-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="rounded-lg border border-white/10 bg-white/5 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Feature</h3>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemoveFeature(feature.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-white">Feature Title</Label>
                <Input
                  value={feature.title}
                  onChange={(e) =>
                    onUpdateFeature(feature.id, 'title', e.target.value)
                  }
                  className="mt-1 border-white/20 bg-white/5 text-white"
                  placeholder="Feature title"
                />
              </div>
              <div>
                <Label className="text-white">Feature Description</Label>
                <Textarea
                  value={feature.description}
                  onChange={(e) =>
                    onUpdateFeature(feature.id, 'description', e.target.value)
                  }
                  className="mt-1 border-white/20 bg-white/5 text-white"
                  rows={3}
                  placeholder="Feature description"
                />
              </div>
              <div>
                <Label className="text-white">Feature Icon</Label>
                <div className="mt-2 flex flex-col space-y-3">
                  <div className="flex flex-col space-y-2">
                    <Label className="text-sm text-white/80">
                      Choose from icons library:
                    </Label>
                    <div className="flex items-center space-x-2">
                      <IconPicker
                        value={
                          typeof feature.icon === 'string'
                            ? feature.icon
                            : undefined
                        }
                        onValueChange={(icon) =>
                          onUpdateFeature(feature.id, 'icon', icon)
                        }
                        triggerPlaceholder="Select an icon from library"
                        className="w-fit"
                      />
                      {feature.icon && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            onUpdateFeature(feature.id, 'icon', '' as IconName);
                            onUpdateFeature(feature.id, 'iconPreview', '');
                          }}
                          className="cursor-pointer border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>

                  {feature.icon && (
                    <div className="flex items-center space-x-2 text-sm text-white/80">
                      <span>Selected icon:</span>
                      <div className="flex items-center space-x-2">
                        <Icon name={feature.icon} className="h-4 w-4" />
                        <span className="font-mono text-blue-300">
                          {feature.icon}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {features.length === 0 && (
          <p className="py-8 text-center text-white/70">
            No features yet. Click &quot;Add Feature&quot; to start.
          </p>
        )}
      </div>
    </div>
  );
}
