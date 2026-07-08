"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
    // Una sola línea (sin flex-wrap): los dos inputs son elásticos (flex-1 +
    // min-w-0) y absorben el espacio sobrante, así el resto de los controles
    // entran sin saltar de renglón. Orden pedido: Carátula, Nro Expediente,
    // Fuero, Proceso, Estado, Archivados, Buscar.
    <div className="briefly-card flex items-center gap-3 mb-4 overflow-x-auto">
      <div className="flex items-center gap-2 flex-[2] min-w-0">
        <span className="text-sm whitespace-nowrap">Carátula:</span>
        <Input
          value={filters.caratula}
          onChange={(e) => update("caratula", e.target.value)}
          placeholder="Buscar por carátula..."
          className="min-w-[130px]"
        />
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-sm whitespace-nowrap">Nro Expediente:</span>
        <Input
          value={filters.numeroExpediente}
          onChange={(e) => update("numeroExpediente", e.target.value)}
          placeholder="EXP-000"
          className="min-w-[100px]"
        />
      </div>

      <MultiSelectDropdown
        label="Fuero"
        options={FUERO_OPTIONS}
        selected={filters.fuero}
        onChange={(next) => update("fuero", next)}
        width={150}
      />
      <MultiSelectDropdown
        label="Proceso"
        options={PROCESO_OPTIONS}
        selected={filters.proceso}
        onChange={(next) => update("proceso", next)}
        width={150}
      />
      <MultiSelectDropdown
        label="Estado"
        options={ESTADO_OPTIONS}
        selected={filters.estado}
        onChange={(next) => update("estado", next)}
        width={150}
      />

      <label
        htmlFor="archivados"
        className="flex items-center gap-2 text-sm cursor-pointer select-none whitespace-nowrap shrink-0"
      >
        <Checkbox
          id="archivados"
          checked={filters.archivados}
          onCheckedChange={(checked) => update("archivados", checked === true)}
        />
        Archivados
      </label>

      <Button onClick={() => onSearch?.(filters)} className="shrink-0">
        Buscar
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
