import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button con el patrón de shadcn/ui (cva). Reemplaza al <CButton> de CoreUI.
 * Los colores se atan a las variables de diseño de la app (--color-accent, etc.)
 * vía la sintaxis de variable CSS de Tailwind v4: bg-(--token).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition duration-150 ease-out active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        accent: "bg-(--color-accent) text-white hover:bg-(--color-accent-hover)",
        outline:
          "border border-white/15 bg-transparent text-(--color-text-primary) hover:bg-(--color-bg-elevated-2)",
        ghost: "bg-transparent text-(--color-text-primary) hover:bg-(--color-bg-elevated-2)",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

export { buttonVariants };
