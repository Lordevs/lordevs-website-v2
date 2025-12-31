'use client';

import Image from 'next/image';
import { Trash2, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProjectImageSectionProps {
  imagePreview: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  imageFile: File | null;
  hasExistingImage: boolean;
}

export default function ProjectImageSection({
  imagePreview,
  onImageUpload,
  onImageRemove,
  imageFile,
  hasExistingImage,
}: ProjectImageSectionProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-xl font-semibold text-white">Project Image</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
            id="image-upload"
          />
          <Label
            htmlFor="image-upload"
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#00B2FF] to-[#8F00FF] px-4 py-2 text-white transition-opacity hover:opacity-90"
          >
            <Upload className="h-4 w-4" />
            {imagePreview ? 'Change Image' : 'Upload Image'}
          </Label>
          {imagePreview && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onImageRemove}
              className="px-3 py-1"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        {imagePreview && imagePreview.trim() !== '' && (
          <div className="relative">
            <Image
              src={imagePreview}
              alt="Preview"
              width={400}
              height={192}
              className="h-48 w-full max-w-md rounded-lg border border-white/10 object-cover"
              onError={(e) => {
                console.error('Main image load error:', imagePreview);
                e.currentTarget.style.display = 'none';
              }}
              unoptimized={imagePreview.startsWith('blob:')}
            />
            {imagePreview.startsWith('http') && !imageFile && (
              <div className="absolute top-2 left-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
                Existing Image
              </div>
            )}
            {imageFile && (
              <div className="absolute top-2 right-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                New Image
              </div>
            )}
            {hasExistingImage &&
              imagePreview &&
              imagePreview.startsWith('http') &&
              !imageFile && (
                <div className="absolute bottom-2 left-2 rounded bg-yellow-500 px-2 py-1 text-xs text-white">
                  Saved
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
