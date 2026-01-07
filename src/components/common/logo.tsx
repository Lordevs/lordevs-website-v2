import { NavLink } from "react-router";
import { ROUTES } from "@/constants/routes";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({
  href = ROUTES.HOME,
  containerClassName,
  className,
}: {
  href?: string;
  containerClassName?: string;
  className?: string;
}) {
  return (
    <NavLink
      to={href}
      className={cn("flex items-center justify-center", containerClassName)}>
      <div className={cn("relative h-10 w-48", className)}>
        <img
          src="/logo.svg"
          alt={siteConfig.name}
          className="h-full w-full object-cover"
        />
      </div>
    </NavLink>
  );
}
