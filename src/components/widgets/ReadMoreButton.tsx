import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface ReadMoreButtonProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ReadMoreButton({
  href,
  className,
  children = "Read more",
}: ReadMoreButtonProps) {
  return (
    <Link
      to={href}
      className={cn(
        "inline-flex items-center gap-2 text-[#41A2F8] transition-colors hover:text-[#00B2FF]",
        className
      )}>
      <span className="text-base font-medium">{children}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
