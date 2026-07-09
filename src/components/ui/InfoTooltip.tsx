"use client";

import type { ReactNode } from "react";
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface InfoTooltipProps {
  /** Contenido del tooltip. Se muestra a la derecha del ícono. */
  content: ReactNode;
}

/**
 * Ícono redondo de info (fondo azul de acento, "i" blanca) con tooltip a la
 * derecha al hacer hover/focus. Migrado de <CTooltip> de CoreUI a la primitiva
 * Tooltip (shadcn/Radix). El círculo se arma con un <span> propio porque el set
 * cil* no tiene una variante "círculo relleno".
 */
export function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <TooltipRoot>
        <TooltipTrigger asChild>
          <span tabIndex={0} role="img" aria-label="Información" className="briefly-info-badge">
            i
          </span>
        </TooltipTrigger>
        <TooltipContent side="right">{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
