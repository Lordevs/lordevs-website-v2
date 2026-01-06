import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  haveBoxShadow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      haveBoxShadow = true,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    if (variant === "gradient") {
      return (
        <Comp
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          style={{
            background:
              "radial-gradient(77.04% 53.57% at 50.59% 91.07%, #00B2FF 0%, #1E72FC 100%)",
            boxShadow: haveBoxShadow
              ? `
              0px 4.48px 8.95px 0px rgba(255, 255, 255, 0.25) inset,
              0px 0px 38.9px 0px #1E72FC,
              0px 4px 58.6px 0px rgba(30, 114, 252, 0.25)
            `
              : undefined,
          }}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
