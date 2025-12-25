import * as React from "react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";
interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName | string;
  fallback?: React.ReactNode;
  src?: string; // For custom uploaded icons
  alt?: string;
}

/**
 * Icon component that can render both Lucide icons and custom images
 *
 * Usage:
 * - For Lucide icons: <Icon name="home" className="h-4 w-4" />
 * - For custom images: <Icon name="custom" src="/path/to/image.png" alt="Custom icon" />
 * - With fallback: <Icon name="unknown" fallback={<div>?</div>} />
 */
const Icon = React.forwardRef<React.ComponentRef<LucideIcon>, IconProps>(
  ({ name, fallback, src, alt, className, size = 16, ...props }, ref) => {
    try {
      // If src is provided, render as image (for custom uploaded icons)
      if (src) {
        return (
          <img
            src={src}
            alt={alt || `${name} icon`}
            width={typeof size === "number" ? size : 16}
            height={typeof size === "number" ? size : 16}
            className={cn("h-4 w-4", className)}
          />
        );
      }

      // If the name is a valid IconName, render the dynamic icon
      if (name && typeof name === "string") {
        return (
          <DynamicIcon
            name={name as IconName}
            className={className}
            size={size}
            {...props}
            ref={ref}
          />
        );
      }

      // If no name provided, render fallback or nothing
      return fallback ? <>{fallback}</> : null;
    } catch (error) {
      // If icon fails to load, render fallback or nothing
      console.warn(`Failed to load icon: ${name}`, error);
      return fallback ? <>{fallback}</> : null;
    }
  }
);

Icon.displayName = "Icon";

export { Icon, type IconName };
export default Icon;
