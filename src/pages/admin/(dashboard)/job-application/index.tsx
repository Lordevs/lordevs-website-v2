import { useState, useMemo } from "react";
import { AdminHeader } from "@/components/admin/navigation";
import { useJobApplications } from "@/hooks/use-job-application";
import { format } from "date-fns";
import {
  Loader2,
  Search,
  FileText,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Users,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/lib/types/database";

type JobApplicationRow =
  Database["public"]["Tables"]["job_applications"]["Row"];

export default function JobApplicationsPage() {
  const { applications, loading, deleteApplication } = useJobApplications();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplicationRow | null>(null);

  // Derive statistics and filtered data
  const { stats, filteredApplications, uniqueRoles } = useMemo(() => {
    const uniqueRoles = Array.from(
      new Set(applications.map((app) => app.role))
    ).sort();

    // Filter logic
    const filtered = applications.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || app.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    // Stats logic
    const totalApps = applications.length;
    const roleCounts = applications.reduce((acc, app) => {
      acc[app.role] = (acc[app.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get top role
    const topRole = Object.entries(roleCounts).sort(
      (a, b) => b[1] - a[1]
    )[0] || ["None", 0];

    return {
      stats: {
        total: totalApps,
        topRole: topRole[0],
        topRoleCount: topRole[1],
        today: applications.filter(
          (app) =>
            new Date(app.created_at).toDateString() ===
            new Date().toDateString()
        ).length,
      },
      filteredApplications: filtered,
      uniqueRoles,
    };
  }, [applications, searchTerm, roleFilter]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this application?")) {
      await deleteApplication(id);
      if (selectedApplication?.id === id) {
        setSelectedApplication(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white/50" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminHeader title="Job Applications" />

      <main className="px-6 pb-6 space-y-8">
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Applications
              </CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-gray-500">Lifetime submissions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Most Popular Role
              </CardTitle>
              <Briefcase className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate pr-2">
                {stats.topRole}
              </div>
              <p className="text-xs text-blue-400/80">
                {stats.topRoleCount} applications
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                New Today
              </CardTitle>
              <Calendar className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
              <p className="text-xs text-green-400/80">Need review</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search applicants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-11"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10 text-white h-11">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl shadow-black/50">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-400 font-medium">
                  Date
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Applicant
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Applied For
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Resume
                </TableHead>
                <TableHead className="text-right text-gray-400 font-medium">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-48 text-center text-gray-500 text-lg">
                    No applications found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow
                    key={app.id}
                    className="border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-200 group"
                    onClick={() => setSelectedApplication(app)}>
                    <TableCell className="w-[150px] font-medium text-white/50 group-hover:text-white/80 transition-colors">
                      {format(new Date(app.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-base">
                          {app.name}
                        </span>
                        <span className="text-sm text-gray-500 group-hover:text-blue-400 transition-colors">
                          {app.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                        {app.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white hover:underline decoration-blue-500 underline-offset-4 transition-all"
                        onClick={(e) => e.stopPropagation()}>
                        <FileText className="h-4 w-4 text-blue-500" />
                        View PDF
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDelete(e, app.id)}
                        className="text-white/30 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-white/10 text-xs text-gray-500 flex justify-between">
            <span>
              Showing {filteredApplications.length} of {applications.length}{" "}
              applications
            </span>
          </div>
        </div>
      </main>

      {/* Detail Sheet */}
      <Sheet
        open={!!selectedApplication}
        onOpenChange={(open) => !open && setSelectedApplication(null)}>
        <SheetContent className="w-full sm:max-w-xl border-l border-white/10 bg-[#0C0912] text-white p-0">
          <div className="p-6 border-b border-white/10 bg-white/5">
            <SheetHeader>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                  {selectedApplication?.role}
                </Badge>
                <span className="text-sm text-gray-400">
                  {selectedApplication &&
                    format(new Date(selectedApplication.created_at), "PPP")}
                </span>
              </div>
              <SheetTitle className="text-3xl text-white font-bold tracking-tight">
                {selectedApplication?.name}
              </SheetTitle>
              <SheetDescription className="text-gray-400 text-base">
                Applicant Details
              </SheetDescription>
            </SheetHeader>
          </div>

          {selectedApplication && (
            <ScrollArea className="h-[calc(100vh-140px)]">
              <div className="p-6 space-y-8">
                {/* Actions Bar */}
                <div className="flex gap-3">
                  <a
                    href={selectedApplication.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1">
                    <Button
                      className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
                      size="lg">
                      <FileText className="mr-2 h-4 w-4" />
                      Open Resume
                    </Button>
                  </a>
                </div>

                <div className="space-y-6">
                  {/* Contact Card */}
                  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                      <h4 className="font-medium text-white flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-400" /> Contact Info
                      </h4>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Email
                          </p>
                          <a
                            href={`mailto:${selectedApplication.email}`}
                            className="text-white hover:text-blue-400 transition-colors">
                            {selectedApplication.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Phone
                          </p>
                          <a
                            href={`tel:${selectedApplication.phone_number}`}
                            className="text-white hover:text-purple-400 transition-colors">
                            {selectedApplication.phone_number}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Card */}
                  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                      <h4 className="font-medium text-white flex items-center gap-2">
                        <Mail className="h-4 w-4 text-green-400" /> Message
                      </h4>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {selectedApplication.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
