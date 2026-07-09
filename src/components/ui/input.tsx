import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input con el patrón de shadcn/ui. Reemplaza al <CFormInput> de CoreUI.
 * Superficie y borde atados a las variables de diseño de la app.
 */
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-white/15 bg-(--color-bg-elevated-2) px-3 py-1 text-sm text-(--color-text-primary)",
        "placeholder:text-(--color-text-tertiary) outline-none transition-colors",
        "focus-visible:border-(--color-accent) focus-visible:ring-2 focus-visible:ring-(--color-accent)/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
