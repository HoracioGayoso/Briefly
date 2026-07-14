"use client";

import { Pencil } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { iniciales, type Cliente } from "./types";

interface ClienteRowProps extends Cliente {
  onEdit: (cliente: Cliente) => void;
}

export function ClienteRow({ id, nombre, tipo, email, telefono, expedientesAsociados, onEdit }: ClienteRowProps) {
  return (
    <TableRow className="group hover:bg-(--color-accent) hover:text-white">
      <TableCell>
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7 shrink-0 text-xs">{iniciales(nombre)}</Avatar>
          <span className="truncate-cell">{nombre}</span>
        </div>
      </TableCell>
      <TableCell>{tipo}</TableCell>
      <TableCell>
        <span className="truncate-cell">{email}</span>
      </TableCell>
      <TableCell className="tabular-nums">{expedientesAsociados}</TableCell>
      <TableCell>
        <button
          type="button"
          title="Editar cliente"
          aria-label="Editar cliente"
          onClick={() => onEdit({ id, nombre, tipo, email, telefono, expedientesAsociados })}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors outline-none hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary) group-hover:text-white"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
