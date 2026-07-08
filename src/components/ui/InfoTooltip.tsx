"use client";

import type { ReactNode } from "react";
import { CTooltip } from "@coreui/react";

interface InfoTooltipProps {
  /** Contenido del tooltip. Se fuerza a una sola línea (ver .briefly-tooltip-nowrap). */
  content: ReactNode;
}

/**
 * Ícono redondo de info (fondo azul de acento, "i" blanca) con tooltip al
 * hacer hover. El set cil* de @coreui/icons no tiene una variante "círculo
 * relleno" (cilInfo es sólo el trazo de un cuadrado con una i adentro, sin
 * fondo), así que el círculo se arma con un <span> propio en vez de un
 * ícono de la librería, manteniendo el mismo azul de acento (--color-accent)
 * que el resto de la UI.
 */
export function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <CTooltip content={content} className="briefly-tooltip-nowrap">
      <span tabIndex={0} role="img" aria-label="Información" className="briefly-info-badge">
        i
      </span>
    </CTooltip>
  );
}
