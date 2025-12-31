import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: "blue" | "green" | "red" | "purple" | "orange" | "yellow";
  loading?: boolean;
}

const colorConfig = {
  blue: {
    border: "border-blue-500/30",
    gradient: "from-blue-600/20 to-blue-800/20",
    glow: "hover:shadow-blue-500/20",
    blur: "from-blue-600/10 to-blue-800/10",
    icon: "text-blue-400",
  },
  green: {
    border: "border-green-500/30",
    gradient: "from-green-600/20 to-green-800/20",
    glow: "hover:shadow-green-500/20",
    blur: "from-green-600/10 to-green-800/10",
    icon: "text-green-400",
  },
  red: {
    border: "border-red-500/30",
    gradient: "from-red-600/20 to-red-800/20",
    glow: "hover:shadow-red-500/20",
    blur: "from-red-600/10 to-red-800/10",
    icon: "text-red-400",
  },
  purple: {
    border: "border-purple-500/30",
    gradient: "from-purple-600/20 to-purple-800/20",
    glow: "hover:shadow-purple-500/20",
    blur: "from-purple-600/10 to-purple-800/10",
    icon: "text-purple-400",
  },
  orange: {
    border: "border-orange-500/30",
    gradient: "from-orange-600/20 to-orange-800/20",
    glow: "hover:shadow-orange-500/20",
    blur: "from-orange-600/10 to-orange-800/10",
    icon: "text-orange-400",
  },
  yellow: {
    border: "border-yellow-500/30",
    gradient: "from-yellow-600/20 to-yellow-800/20",
    glow: "hover:shadow-yellow-500/20",
    blur: "from-yellow-600/10 to-yellow-800/10",
    icon: "text-yellow-400",
  },
  teal: {
    border: "border-teal-500/30",
    gradient: "from-teal-600/20 to-teal-800/20",
    glow: "hover:shadow-teal-500/20",
    blur: "from-teal-600/10 to-teal-800/10",
    icon: "text-teal-400",
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  loading = false,
}: StatsCardProps) {
  const config = colorConfig[color];

  return (
    <Card
      className={`group relative border ${config.border} bg-linear-to-br ${config.gradient} backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${config.glow}`}>
      <div
        className={`absolute inset-0 rounded-lg bg-linear-to-br ${config.blur} opacity-50 blur-sm transition-opacity duration-300 group-hover:opacity-70`}
      />
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">
              {loading ? "..." : value}
            </p>
          </div>
          <Icon className={`h-8 w-8 ${config.icon}`} />
        </div>
      </CardContent>
    </Card>
  );
}
