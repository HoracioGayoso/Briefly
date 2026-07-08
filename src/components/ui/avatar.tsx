import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Avatar simple (círculo con iniciales o imagen). Reemplaza al <CAvatar> de
 * CoreUI. Por defecto usa el acento azul de la app con texto blanco.
 */
export const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-(--color-accent) font-medium text-white select-none",
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";
