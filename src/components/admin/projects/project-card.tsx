import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { motion } from 'framer-motion';
import { Edit, Eye, EyeOff, Trash2 } from 'lucide-react';

import { Project } from '@/lib/types/database';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, currentStatus: boolean) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  onDelete,
  onToggleActive,
}) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      onDelete(project.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative rounded-xl border border-white/10 bg-white/5 p-6 text-white shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl"
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-[#00B2FF] to-[#8F00FF] p-[1px] opacity-0 transition-opacity group-hover:opacity-20">
        <div className="h-full w-full rounded-xl bg-transparent"></div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-semibold text-white">{project.title}</div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            project.is_active
              ? 'border border-green-500/30 bg-green-500/20 text-green-300'
              : 'border border-gray-500/30 bg-gray-500/20 text-gray-300'
          }`}
        >
          {project.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="mb-4 text-sm text-white/70">{project.subtitle}</div>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-gradient-to-r from-[#00B2FF]/20 to-[#8F00FF]/20 px-3 py-1 text-xs font-medium text-white/90"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.main_image && (
        <div className="mb-4">
          <Image
            src={project.main_image}
            alt={project.title}
            width={400}
            height={128}
            className="h-32 w-full rounded-lg border border-white/10 object-cover"
          />
        </div>
      )}

      <div className="mt-auto flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onToggleActive(project.id, project.is_active)}
          title={project.is_active ? 'Deactivate' : 'Activate'}
          className="h-8 w-8 p-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-600/20 hover:to-green-800/20"
        >
          {project.is_active ? (
            <Eye className="h-4 w-4 text-green-400" />
          ) : (
            <EyeOff className="h-4 w-4 text-gray-500" />
          )}
        </Button>
        <Link href={ROUTES.ADMIN.EDIT_PROJECT(project.id)}>
          <Button
            size="icon"
            variant="ghost"
            title="Edit"
            className="h-8 w-8 p-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-800/20"
          >
            <Edit className="h-4 w-4 text-blue-400" />
          </Button>
        </Link>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleDelete}
          title="Delete"
          className="h-8 w-8 p-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-800/20"
        >
          <Trash2 className="h-4 w-4 text-red-400" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
