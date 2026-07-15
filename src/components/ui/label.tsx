import * as React from "react";
import { cn } from "@/lib/utils";

/** Label de formulario (shadcn/ui). Se asocia al control con htmlFor. */
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium text-(--color-text-secondary)", className)}
      {...props}
    />
  )
);
Label.displayName = "Label";
