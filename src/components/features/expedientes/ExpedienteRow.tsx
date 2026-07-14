"use client";

import { MoreVertical, FileSearch, Pencil, Archive } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Expediente } from "./types";

// ISO (YYYY-MM-DD) → DD/MM/AAAA sin pasar por Date (evita corrimientos por zona
// horaria).
function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function ExpedienteRow({
  caratula,
  numeroExpediente,
  fuero,
  proceso,
  estado,
  fechaCreacion,
  archivado,
}: Expediente) {
  return (
    <TableRow
      className={cn(
        "group hover:bg-(--color-accent) hover:text-white",
        // Fila atenuada + ícono junto a la carátula: dos señales que se
        // detectan tanto al escanear la tabla entera como leyendo una sola
        // columna. No se usa color (el Estado ya lo usa con otro sentido).
        archivado && "text-(--color-text-secondary)"
      )}
    >
      <TableCell>
        <span className="flex min-w-0 items-center gap-1.5">
          {archivado && (
            <Archive
              // group-hover: el ícono tiene su propio color fijo (no hereda del
              // <tr>), así que sin esto quedaría gris apagado sobre el fondo
              // azul de hover — bajo contraste. Pasa a blanco igual que el
              // resto del texto de la fila.
              className="h-3.5 w-3.5 shrink-0 text-(--color-text-tertiary) group-hover:text-white"
              aria-hidden="true"
            />
          )}
          <span
            className="truncate-cell uppercase"
            title={archivado ? `${caratula} (archivado)` : caratula}
          >
            {caratula}
          </span>
        </span>
      </TableCell>
      <TableCell className="tabular-nums">{numeroExpediente}</TableCell>
      <TableCell>
        <span className="truncate-cell" title={fuero}>
          {fuero}
        </span>
      </TableCell>
      <TableCell>
        <span className="truncate-cell" title={proceso}>
          {proceso}
        </span>
      </TableCell>
      <TableCell>
        <StatusBadge variant={estado.color}>{estado.label}</StatusBadge>
      </TableCell>
      <TableCell className="tabular-nums whitespace-nowrap">{formatFecha(fechaCreacion)}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger
            title="Acciones"
            aria-label="Acciones"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors outline-none hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary) data-[state=open]:bg-(--color-bg-elevated-2)"
          >
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* TODO(etapa 2): habilitar navegación a /expedientes/[id] cuando exista el detalle (RF-08/09). */}
            <DropdownMenuItem>
              <FileSearch className="h-4 w-4" />
              Ver expediente
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="h-4 w-4" />
              Cambiar estado
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="h-4 w-4" />
              Archivar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
