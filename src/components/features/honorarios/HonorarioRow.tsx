"use client";

import { Pencil } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ESTADO_HONORARIO_COLOR, formatMonto, type Honorario } from "./types";

function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

interface HonorarioRowProps extends Honorario {
  onEdit: (honorario: Honorario) => void;
}

export function HonorarioRow({ id, expediente, concepto, monto, fecha, estado, onEdit }: HonorarioRowProps) {
  return (
    <TableRow className="group hover:bg-(--color-accent) hover:text-white">
      <TableCell>
        <span className="truncate-cell">{expediente}</span>
      </TableCell>
      <TableCell>
        <span className="truncate-cell">{concepto}</span>
      </TableCell>
      <TableCell className="tabular-nums">{formatMonto(monto)}</TableCell>
      <TableCell className="tabular-nums whitespace-nowrap">{formatFecha(fecha)}</TableCell>
      <TableCell>
        <StatusBadge variant={ESTADO_HONORARIO_COLOR[estado]}>{estado}</StatusBadge>
      </TableCell>
      <TableCell>
        <button
          type="button"
          title="Editar honorario"
          aria-label="Editar honorario"
          onClick={() => onEdit({ id, expediente, concepto, monto, fecha, estado })}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors outline-none hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary) group-hover:text-white"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
