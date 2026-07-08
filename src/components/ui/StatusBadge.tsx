import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { EstadoExpedienteColor } from "@/components/features/expedientes/types";

/**
 * Badge de estado con el patrón de shadcn/ui (cva + cn), pensado como
 * reemplazo del <CBadge> de CoreUI. En vez de los colores planos y saturados
 * de Bootstrap usa "soft tints" (fondo translúcido + texto claro + borde
 * sutil), que leen más moderno sobre el fondo oscuro de la app.
 *
 * Las variantes usan las mismas claves que EstadoExpedienteColor
 * ("success" | "warning" | ...) para que el swap desde CBadge sea 1:1:
 * <CBadge color={estado.color}> -> <StatusBadge variant={estado.color}>.
 */
const statusBadge = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        success: "border-emerald-500/25 bg-emerald-500/15 text-emerald-300",
        warning: "border-amber-500/25 bg-amber-500/15 text-amber-300",
        danger: "border-rose-500/25 bg-rose-500/15 text-rose-300",
        secondary: "border-slate-400/25 bg-slate-400/10 text-slate-300",
        info: "border-sky-500/25 bg-sky-500/15 text-sky-300",
      } satisfies Record<EstadoExpedienteColor, string>,
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadge> {}

export function StatusBadge({ variant, className, ...props }: StatusBadgeProps) {
  return <span className={cn(statusBadge({ variant }), className)} {...props} />;
}
