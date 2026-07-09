import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Helper estándar del ecosistema shadcn/ui: combina clases condicionales
 * (clsx) y resuelve conflictos de utilidades de Tailwind (tailwind-merge),
 * de modo que la última clase gana. Ej: cn("px-2", cond && "px-4") -> "px-4".
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
