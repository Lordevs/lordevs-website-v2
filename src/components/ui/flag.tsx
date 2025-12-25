import "flag-icons/css/flag-icons.min.css";
import * as React from "react";
import { cn } from "@/lib/utils";
import { type FlagCode, type FlagData, flagsData } from "./flags-data";

interface FlagProps extends React.HTMLAttributes<HTMLDivElement> {
  code: FlagCode;
  showName?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  fallback?: React.ReactNode;
}

/**
 * Flag component that renders country flag icons using flag-icons library
 *
 * Usage:
 * - Basic: <Flag code="US" />
 * - With name: <Flag code="US" showName />
 * - Different sizes: <Flag code="US" size="xl" />
 * - Extra large: <Flag code="US" size="2xl" />
 * - With fallback: <Flag code="UNKNOWN" fallback={<div>🏳️</div>} />
 */
const Flag = React.forwardRef<HTMLDivElement, FlagProps>(
  (
    { code, showName = false, size = "md", fallback, className, ...props },
    ref
  ) => {
    const flagData = flagsData.find((flag) => flag.code === code);

    if (!flagData) {
      return fallback ? <>{fallback}</> : null;
    }

    const sizeClasses = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8",
      "2xl": "w-10 h-10",
    };

    const textSizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
      "2xl": "text-xl",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}>
        <span
          className={cn(
            `fi fi-${code.toLowerCase()} rounded-sm shadow-sm`,
            sizeClasses[size]
          )}
          title={flagData.name}
        />
        {showName && (
          <span className={cn("font-medium", textSizeClasses[size])}>
            {flagData.name}
          </span>
        )}
      </div>
    );
  }
);

Flag.displayName = "Flag";

export { Flag, type FlagCode, type FlagData };
export default Flag;
