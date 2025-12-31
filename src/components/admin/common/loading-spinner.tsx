import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: "blue" | "white" | "gray";
}

const sizeConfig = {
  sm: "h-6 w-6",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

const colorConfig = {
  blue: "border-t-blue-400",
  white: "border-t-white",
  gray: "border-t-gray-400",
};

/**
 * Reusable loading spinner component with consistent styling
 * Used across admin pages for loading states
 */
export default function LoadingSpinner({
  size = "md",
  className,
  color = "blue",
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex justify-center py-12", className)}>
      <div className="relative">
        <div
          className={cn(
            "animate-spin rounded-full border-4 border-transparent",
            sizeConfig[size],
            colorConfig[color]
          )}
        />
        <div
          className={cn(
            "absolute inset-0 animate-ping rounded-full opacity-20",
            sizeConfig[size],
            color === "blue" && "bg-blue-400/20",
            color === "white" && "bg-white/20",
            color === "gray" && "bg-gray-400/20"
          )}
        />
      </div>
    </div>
  );
}
