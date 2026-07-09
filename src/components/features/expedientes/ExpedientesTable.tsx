"use client";

import { ChevronUp, ChevronDown, ChevronsUpDown, FolderSearch } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ExpedienteRow } from "./ExpedienteRow";
import type { Expediente } from "./types";

export type SortKey = "caratula" | "numeroExpediente" | "fuero" | "proceso" | "estado";
export type SortDir = "asc" | "desc";

interface Column {
  label: string;
  width: string;
  key?: SortKey;
}

const COLUMNS: Column[] = [
  { label: "Carátula", width: "34%", key: "caratula" },
  { label: "Expediente", width: "14%", key: "numeroExpediente" },
  { label: "Fuero", width: "12%", key: "fuero" },
  { label: "Proceso", width: "12%", key: "proceso" },
  { label: "Estado", width: "18%", key: "estado" },
  { label: "Acciones", width: "10%" },
];

interface ExpedientesTableProps {
  rows: Expediente[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  loading?: boolean;
}

export function ExpedientesTable({ rows, sortKey, sortDir, onSort, loading }: ExpedientesTableProps) {
  return (
    <Table style={{ tableLayout: "fixed" }}>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((col) => {
            const active = col.key && sortKey === col.key;
            return (
              <TableHead key={col.label} style={{ width: col.width }}>
                {col.key ? (
                  <button
                    type="button"
                    onClick={() => onSort(col.key!)}
                    className="inline-flex items-center gap-1 uppercase transition-colors hover:text-(--color-text-primary)"
                  >
                    {col.label}
                    {active ? (
                      sortDir === "asc" ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
                    )}
                  </button>
                ) : (
                  col.label
                )}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <TableRow key={`sk-${i}`}>
              {COLUMNS.map((col) => (
                <TableCell key={col.label}>
                  <div className="h-4 animate-pulse rounded bg-white/10" style={{ width: `${col.key ? 70 : 24}%` }} />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={COLUMNS.length}>
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <FolderSearch className="h-8 w-8 text-(--color-text-tertiary)" />
                <p className="text-sm font-medium text-(--color-text-primary)">No se encontraron expedientes</p>
                <p className="text-sm text-(--color-text-secondary)">Probá ajustar los filtros o la búsqueda.</p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          rows.map((expediente) => <ExpedienteRow key={expediente.id} {...expediente} />)
        )}
      </TableBody>
    </Table>
  );
}
