"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

/**
 * Checkbox con el patrón de shadcn/ui (sobre la primitiva de Radix). Reemplaza
 * al <CFormCheck> de CoreUI. El check es un SVG inline para no sumar una
 * librería de íconos sólo por esto.
 */
export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // El color (fondo/borde base y estado checked) se resuelve en globals.css
      // (.briefly-checkbox), NO con utilidades de Tailwind de color/fondo/borde:
      // en este proyecto las utilidades de Tailwind (bg-transparent, border-*) le
      // ganan a las reglas .briefly-* y pisaban el azul del estado checked. Acá
      // solo dejamos layout + focus ring (que no compiten con globals).
      "briefly-checkbox peer h-4 w-4 shrink-0 rounded-[4px] outline-none",
      "focus-visible:ring-2 focus-visible:ring-(--color-accent)/40",
      "disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="h-3 w-3">
        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";
