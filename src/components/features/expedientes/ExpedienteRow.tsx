"use client";

import { CBadge, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CTableRow, CTableDataCell } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilOptions, cilFindInPage, cilPen, cilStorage } from "@coreui/icons";
import type { Expediente } from "./types";

export function ExpedienteRow({ caratula, numeroExpediente, fuero, proceso, estado }: Expediente) {
  return (
    <CTableRow>
      <CTableDataCell className="align-middle">
        <span className="truncate-cell" title={caratula}>
          {caratula}
        </span>
      </CTableDataCell>
      <CTableDataCell className="align-middle">{numeroExpediente}</CTableDataCell>
      <CTableDataCell className="align-middle">{fuero}</CTableDataCell>
      <CTableDataCell className="align-middle">{proceso}</CTableDataCell>
      <CTableDataCell className="align-middle">
        <CBadge color={estado.color} style={{ minWidth: 110 }}>
          {estado.label}
        </CBadge>
      </CTableDataCell>
      <CTableDataCell className="align-middle">
        <CDropdown alignment="end">
          <CDropdownToggle variant="ghost" caret={false} title="Acciones">
            <CIcon icon={cilOptions} />
          </CDropdownToggle>
          <CDropdownMenu>
            {/* TODO(etapa 2): habilitar navegación a /expedientes/[id] cuando exista el detalle (RF-08/09). */}
            <CDropdownItem className="d-flex align-items-center gap-2">
              <CIcon icon={cilFindInPage} size="sm" />
              Ver expediente
            </CDropdownItem>
            <CDropdownItem className="d-flex align-items-center gap-2">
              <CIcon icon={cilPen} size="sm" />
              Cambiar estado
            </CDropdownItem>
            <CDropdownItem className="d-flex align-items-center gap-2">
              <CIcon icon={cilStorage} size="sm" />
              Archivar
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CTableDataCell>
    </CTableRow>
  );
}
