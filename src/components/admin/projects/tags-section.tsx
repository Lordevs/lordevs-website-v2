'use client';

import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TagsSectionProps {
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export default function TagsSection({
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: TagsSectionProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-xl font-semibold text-white">Tags & URLs</h2>
      <div className="space-y-4">
        <div>
          <Label className="text-white">Tags</Label>
          <div className="mt-1 flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => onTagInputChange(e.target.value)}
              placeholder="Add a tag"
              className="border-white/20 bg-white/5 text-white"
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), onAddTag())
              }
            />
            <Button
              type="button"
              onClick={onAddTag}
              className="bg-gradient-to-r from-[#00B2FF] to-[#8F00FF]"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-[#00B2FF]/20 to-[#8F00FF]/20 px-3 py-1 text-sm font-medium text-white/90"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="text-white/70 hover:text-white"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
