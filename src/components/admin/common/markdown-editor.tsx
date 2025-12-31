import MDEditor from "@uiw/react-md-editor";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  className,
}: MarkdownEditorProps) {
  return (
    <div
      className={cn(
        "rounded-md overflow-hidden border border-white/20",
        className
      )}
      data-color-mode="dark">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={500}
        preview="live"
        className="bg-white/5! border-none! text-white"
        textareaProps={{
          placeholder: "Type your markdown content here...",
        }}
      />
    </div>
  );
}
