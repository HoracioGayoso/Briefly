import * as React from "react";
import { cn } from "@/lib/utils";

/** Textarea (shadcn/ui), mismo estilo que Input pero multilínea. */
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-white/15 bg-(--color-bg-elevated-2) px-3 py-2 text-sm text-(--color-text-primary)",
      "placeholder:text-(--color-text-tertiary) outline-none transition-colors",
      "focus-visible:border-(--color-accent) focus-visible:ring-2 focus-visible:ring-(--color-accent)/40",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
