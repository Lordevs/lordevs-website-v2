import { NavLink } from "react-router";
import { STATS_CARD_CONFIGS } from "@/constants/admin";
import { ROUTES } from "@/constants/routes";
import { CircleHelp, Eye, FolderOpen, Users } from "lucide-react";
import { useAdminStats } from "@/hooks/use-admin-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatsCard from "@/components/admin/common/stats-card";
import { AdminHeader } from "@/components/admin/navigation";

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats();

  const statCards = [
    {
      title: STATS_CARD_CONFIGS.faq.total.title,
      value: stats.faqs.total,
      icon: CircleHelp,
      color: STATS_CARD_CONFIGS.faq.total.color,
    },
    {
      title: STATS_CARD_CONFIGS.faq.active.title,
      value: stats.faqs.active,
      icon: Eye,
      color: STATS_CARD_CONFIGS.faq.active.color,
    },
    {
      title: STATS_CARD_CONFIGS.project.total.title,
      value: stats.projects.total,
      icon: FolderOpen,
      color: STATS_CARD_CONFIGS.project.total.color,
    },
    {
      title: STATS_CARD_CONFIGS.testimonials.total.title,
      value: stats.testimonials.total,
      icon: Users,
      color: STATS_CARD_CONFIGS.testimonials.total.color,
    },
  ] as const;

  return (
    <div className="relative">
      <AdminHeader title="Dashboard" />

      <main className="relative p-6">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatsCard
              key={card.title}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              loading={loading}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="group relative border border-blue-500/30 bg-linear-to-br from-[#23243A]/50 to-[#181A20]/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
            {/* linear glow effect */}
            <div className="absolute inset-0 rounded-lg bg-linear-to-br from-blue-600/10 to-purple-600/10 opacity-50 blur-sm transition-opacity duration-300 group-hover:opacity-70" />

            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="h-2 w-2 rounded-full bg-linear-to-r from-[#00B2FF] to-[#8F00FF]" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <NavLink
                  to={ROUTES.ADMIN.FAQS}
                  className="group/link relative flex items-center rounded-xl border border-blue-500/20 bg-linear-to-r from-blue-600/20 to-blue-800/20 p-4 text-sm text-blue-400 transition-all duration-300 hover:scale-105 hover:border-blue-500/40 hover:from-blue-600/30 hover:to-blue-800/30">
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-600/10 to-blue-800/10 opacity-0 blur-sm transition-opacity duration-300 group-hover/link:opacity-100" />
                  <CircleHelp className="relative mr-3 h-5 w-5 text-blue-400" />
                  <span className="relative font-medium">Manage FAQs</span>
                </NavLink>
                <NavLink
                  to={ROUTES.ADMIN.PROJECTS}
                  className="group/link relative flex items-center rounded-xl border border-purple-500/20 bg-linear-to-r from-purple-600/20 to-purple-800/20 p-4 text-sm text-purple-400 transition-all duration-300 hover:scale-105 hover:border-purple-500/40 hover:from-purple-600/30 hover:to-purple-800/30">
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-600/10 to-purple-800/10 opacity-0 blur-sm transition-opacity duration-300 group-hover/link:opacity-100" />
                  <FolderOpen className="relative mr-3 h-5 w-5 text-purple-400" />
                  <span className="relative font-medium">Manage Projects</span>
                </NavLink>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative border border-emerald-500/30 bg-linear-to-br from-[#23243A]/50 to-[#181A20]/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
            {/* linear glow effect */}
            <div className="absolute inset-0 rounded-lg bg-linear-to-br from-emerald-600/10 to-teal-600/10 opacity-50 blur-sm transition-opacity duration-300 group-hover:opacity-70" />

            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="h-2 w-2 rounded-full bg-linear-to-r from-emerald-400 to-teal-400" />
                System Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Current system status
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-linear-to-r from-emerald-600/10 to-teal-600/10 p-3">
                  <span className="text-sm text-gray-400">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">
                      Online
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-blue-500/20 bg-linear-to-r from-blue-600/10 to-purple-600/10 p-3">
                  <span className="text-sm text-gray-400">Last Update:</span>
                  <span className="text-sm font-medium text-gray-300">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
