"use client";

import { useState } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody } from "@coreui/react";
import { ExpedienteRow } from "./ExpedienteRow";
import { Pagination } from "@/components/ui/Pagination";
import { MOCK_EXPEDIENTES } from "./types";

const COLUMNS = [
  { label: "Carátula", width: "38%" },
  { label: "Expediente", width: "14%" },
  { label: "Fuero", width: "13%" },
  { label: "Proceso", width: "13%" },
  { label: "Estado", width: "15%" },
  { label: "Acciones", width: "7%" },
];

export function ExpedientesTable() {
  const [page, setPage] = useState(1);

  return (
    <div className="briefly-card flex flex-col flex-1" style={{ padding: 0, overflow: "hidden" }}>
      <div className="flex-1 overflow-y-auto">
        <CTable hover responsive style={{ tableLayout: "fixed" }}>
          <CTableHead>
            <CTableRow>
              {COLUMNS.map((col) => (
                <CTableHeaderCell key={col.label} style={{ width: col.width }}>
                  {col.label}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {MOCK_EXPEDIENTES.map((expediente) => (
              <ExpedienteRow key={expediente.id} {...expediente} />
            ))}
          </CTableBody>
        </CTable>
      </div>

      <div className="d-flex justify-content-center py-3">
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
    </div>
  );
}
