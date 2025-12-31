import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import type { Database } from "@/lib/types/database";

type JobApplicationRow =
  Database["public"]["Tables"]["job_applications"]["Row"];

export default function JobApplicationsPage() {
  const { applications, loading, deleteApplication } = useJobApplications();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplicationRow | null>(null);

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="space-y-6">
      <AdminHeader title="Job Applications" />
      <main className="p-6">
        {/* Search */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="text-sm text-gray-400">
            {filteredApplications.length} Applications
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Role</TableHead>
                <TableHead className="text-gray-400">Resume</TableHead>
                <TableHead className="text-right text-gray-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-gray-500">
                    No applications found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow
                    key={app.id}
                    className="border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
                    onClick={() => setSelectedApplication(app)}>
                    <TableCell className="font-medium text-white/80">
                      {format(new Date(app.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">
                          {app.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {app.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                        {app.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-white/60 hover:text-white hover:underline"
                        onClick={(e) => e.stopPropagation()}>
                        <FileText className="h-4 w-4" />
                        View Resume
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDelete(e, app.id)}
                        className="text-white/40 hover:text-red-500 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Detail Sheet */}
      <Sheet
        open={!!selectedApplication}
        onOpenChange={(open) => !open && setSelectedApplication(null)}>
        <SheetContent className="w-full sm:max-w-xl border-l border-white/10 bg-[#0C0912] text-white">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl text-white">
              Application Details
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              Review application information for {selectedApplication?.name}
            </SheetDescription>
          </SheetHeader>

          {selectedApplication && (
            <ScrollArea className="h-[calc(100vh-120px)] pr-6">
              <div className="space-y-8">
                {/* Header Info */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-white">
                      {selectedApplication.name}
                    </h3>
                    <Badge className="bg-blue-500/20 text-blue-400 border-none">
                      {selectedApplication.role}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(selectedApplication.created_at), "PPP")}
                  </div>
                </div>

                <Separator className="bg-white/10" />

                {/* Contact Info */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                    Contact Information
                  </h4>
                  <div className="grid gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm text-white">
                          {selectedApplication.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                        <Phone className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="text-sm text-white">
                          {selectedApplication.phone_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Letter / Message */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                    Cover Letter / Message
                  </h4>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-gray-300">
                    {selectedApplication.message}
                  </div>
                </div>

                {/* Resume */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                    Attachments
                  </h4>
                  <a
                    href={selectedApplication.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-500/20 text-blue-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Resume.pdf</p>
                      <p className="text-xs text-gray-400">
                        Click to view document
                      </p>
                    </div>
                  </a>
                </div>

                {/* Actions */}
                <div className="pt-4">
                  <Button
                    variant="destructive"
                    className="w-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    onClick={(e) => {
                      handleDelete(e, selectedApplication.id);
                      setSelectedApplication(null); // Close sheet after delete logic inside sheet? Or just rely on delete logic?
                      // Wait, handleDelete expects React.MouseEvent.
                      // And handleDelete calls deleteApplication which updates list.
                    }}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Application
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
