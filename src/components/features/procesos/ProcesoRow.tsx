"use client";

import { Pencil } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import type { Proceso } from "./types";

interface ProcesoRowProps extends Proceso {
  onEdit: (proceso: Proceso) => void;
}

export function ProcesoRow({ id, nombre, fuero, expedientesAsociados, onEdit }: ProcesoRowProps) {
  return (
    <TableRow className="group hover:bg-(--color-accent) hover:text-white">
      <TableCell>{nombre}</TableCell>
      <TableCell>{fuero}</TableCell>
      <TableCell className="tabular-nums">{expedientesAsociados}</TableCell>
      <TableCell>
        <button
          type="button"
          title="Editar proceso"
          aria-label="Editar proceso"
          onClick={() => onEdit({ id, nombre, fuero, expedientesAsociados })}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors outline-none hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary) group-hover:text-white"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
