"use client";

import { CTableRow, CTableDataCell, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";
import type { Fuero } from "./types";

interface FueroRowProps extends Fuero {
  onEdit: (fuero: Fuero) => void;
}

export function FueroRow({ id, nombre, expedientesAsociados, onEdit }: FueroRowProps) {
  return (
    <CTableRow>
      <CTableDataCell className="align-middle">{nombre}</CTableDataCell>
      <CTableDataCell className="align-middle">{expedientesAsociados}</CTableDataCell>
      <CTableDataCell className="align-middle">
        <CButton
          variant="ghost"
          size="sm"
          title="Editar fuero"
          aria-label="Editar fuero"
          onClick={() => onEdit({ id, nombre, expedientesAsociados })}
        >
          <CIcon icon={cilPen} size="sm" />
        </CButton>
      </CTableDataCell>
    </CTableRow>
  );
}
