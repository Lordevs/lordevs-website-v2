import { AdminHeader } from "@/components/admin/navigation";
import NewsForm from "@/components/admin/news/news-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddNewsPage() {
  return (
    <div className="h-full flex flex-col">
      <AdminHeader title="Add New Article" />
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            <NewsForm />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
