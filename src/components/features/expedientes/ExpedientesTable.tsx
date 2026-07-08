"use client";

import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { ExpedienteRow } from "./ExpedienteRow";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_EXPEDIENTES } from "./types";

const COLUMNS = [
  { label: "Carátula", width: "30%" },
  { label: "Expediente", width: "14%" },
  { label: "Fuero", width: "12%" },
  { label: "Proceso", width: "12%" },
  { label: "Estado", width: "20%" },
  { label: "Acciones", width: "12%" },
];

export function ExpedientesTable() {
  const [page, setPage] = useState(1);

  return (
    <div className="briefly-card flex flex-col flex-1" style={{ padding: 0, overflow: "hidden" }}>
      <div className="flex-1 overflow-y-auto">
        <Table style={{ tableLayout: "fixed" }}>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableHead key={col.label} style={{ width: col.width }}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_EXPEDIENTES.map((expediente) => (
              <ExpedienteRow key={expediente.id} {...expediente} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center py-3">
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
    </div>
  );
}
