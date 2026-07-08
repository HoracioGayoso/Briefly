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
import type { Expediente } from "./types";

export function ExpedienteRow({ caratula, numeroExpediente, fuero, proceso, estado }: Expediente) {
  return (
    <TableRow className="hover:bg-(--color-accent) hover:text-white">
      <TableCell>
        <span className="truncate-cell" title={caratula}>
          {caratula}
        </span>
      </TableCell>
      <TableCell>{numeroExpediente}</TableCell>
      <TableCell>{fuero}</TableCell>
      <TableCell>{proceso}</TableCell>
      <TableCell>
        <StatusBadge variant={estado.color}>{estado.label}</StatusBadge>
      </TableCell>
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
