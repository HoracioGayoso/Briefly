"use client";

import { useState } from "react";
import { CFormCheck, CFormInput, CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";
import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { FUERO_OPTIONS, PROCESO_OPTIONS, ESTADO_OPTIONS } from "./types";

export interface ExpedientesFiltersValue {
  archivados: boolean;
  fuero: string[];
  proceso: string[];
  estado: string[];
  caratula: string;
  numeroExpediente: string;
}

const EMPTY_FILTERS: ExpedientesFiltersValue = {
  archivados: false,
  fuero: [],
  proceso: [],
  estado: [],
  caratula: "",
  numeroExpediente: "",
};

interface ExpedientesFiltersProps {
  onSearch?: (filters: ExpedientesFiltersValue) => void;
}

/**
 * Filtros combinables del listado de expedientes (RF-13). Por ahora sólo
 * mantiene el estado local y expone `onSearch`; la Etapa 2 lo conecta a la
 * query real contra Supabase.
 */
export function ExpedientesFilters({ onSearch }: ExpedientesFiltersProps) {
  const [filters, setFilters] = useState<ExpedientesFiltersValue>(EMPTY_FILTERS);

  const update = <K extends keyof ExpedientesFiltersValue>(key: K, value: ExpedientesFiltersValue[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="briefly-card flex flex-wrap items-center gap-4 mb-4">
      <CFormCheck
        id="archivados"
        label="Archivados"
        checked={filters.archivados}
        onChange={(e) => update("archivados", e.target.checked)}
      />

      <MultiSelectDropdown
        label="Fuero"
        options={FUERO_OPTIONS}
        selected={filters.fuero}
        onChange={(next) => update("fuero", next)}
      />
      <MultiSelectDropdown
        label="Proceso"
        options={PROCESO_OPTIONS}
        selected={filters.proceso}
        onChange={(next) => update("proceso", next)}
      />
      <MultiSelectDropdown
        label="Estado"
        options={ESTADO_OPTIONS}
        selected={filters.estado}
        onChange={(next) => update("estado", next)}
      />

      <div className="flex items-center gap-2 flex-1" style={{ minWidth: 180 }}>
        <span className="text-sm whitespace-nowrap">Carátula:</span>
        <CFormInput
          value={filters.caratula}
          onChange={(e) => update("caratula", e.target.value)}
          placeholder="Buscar por carátula..."
        />
      </div>

      <div className="flex items-center gap-2 flex-1" style={{ minWidth: 180 }}>
        <span className="text-sm whitespace-nowrap">Nro Expediente:</span>
        <CFormInput
          value={filters.numeroExpediente}
          onChange={(e) => update("numeroExpediente", e.target.value)}
          placeholder="EXP-000"
        />
      </div>

      <CButton color="info" className="text-white d-flex align-items-center gap-2" onClick={() => onSearch?.(filters)}>
        Buscar
        <CIcon icon={cilSearch} size="sm" />
      </CButton>
    </div>
  );
}
