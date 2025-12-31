'use client';

import { useState } from 'react';
import { Edit, Eye, EyeOff, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  deleteTestimonial,
  toggleTestimonialStatus,
} from '@/lib/supabase/testimonials';
import { Testimonial } from '@/lib/types/database';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Flag, { FlagCode } from '@/components/ui/flag';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
}

export default function TestimonialCard({
  testimonial,
  onEdit,
  onDelete,
  onToggleStatus,
}: TestimonialCardProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTestimonial(testimonial.id);
      onDelete(testimonial.id);
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      await toggleTestimonialStatus(testimonial.id, !testimonial.is_active);
      onToggleStatus(testimonial.id, !testimonial.is_active);
      toast.success(
        `Testimonial ${testimonial.is_active ? 'deactivated' : 'activated'} successfully`
      );
    } catch (error) {
      console.error('Error toggling testimonial status:', error);
      toast.error('Failed to update testimonial status');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <Card className="group relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-white/20">
      <CardHeader className="mb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative self-start overflow-hidden">
              <Flag code={testimonial.image as FlagCode} size="2xl" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{testimonial.name}</h3>
              <p className="text-sm text-white/60">{testimonial.country}</p>
              <div className="flex items-center gap-1">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="line-clamp-3 text-sm text-white/80">
          {testimonial.content}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${testimonial.is_active ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-xs text-white/60">
              {testimonial.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleStatus}
              disabled={loading}
              className="h-8 w-8 p-0 text-white/60 hover:text-white"
            >
              {testimonial.is_active ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(testimonial.id)}
              className="h-8 w-8 p-0 text-white/60 hover:text-white"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-white/60 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this testimonial from{' '}
                    {testimonial.name}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
