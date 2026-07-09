"use client";

import { Search } from "lucide-react";
import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { FUERO_OPTIONS, PROCESO_OPTIONS, ESTADO_OPTIONS } from "./types";

export interface ExpedientesFiltersValue {
  search: string;
  fuero: string[];
  proceso: string[];
  estado: string[];
  archivados: boolean;
}

interface ExpedientesFiltersProps {
  value: ExpedientesFiltersValue;
  onChange: (next: ExpedientesFiltersValue) => void;
}

/**
 * Toolbar de filtros del listado (RF-13). Componente controlado: el estado vive
 * en ExpedientesView, que aplica el filtrado en vivo (sin botón "Buscar"). Sin
 * la caja pesada ni los prefijos "Label:" del prototipo previo: un buscador
 * prominente + dropdowns compactos, como en un producto real.
 */
export function ExpedientesFilters({ value, onChange }: ExpedientesFiltersProps) {
  const set = <K extends keyof ExpedientesFiltersValue>(key: K, v: ExpedientesFiltersValue[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      {/* Buscador principal (carátula o número) */}
      <div className="flex h-9 min-w-[220px] flex-1 items-center gap-2 rounded-md border border-white/15 bg-(--color-bg-elevated-2) px-3 transition-colors focus-within:border-(--color-accent) focus-within:ring-2 focus-within:ring-(--color-accent)/40">
        <Search className="h-4 w-4 shrink-0 text-(--color-text-tertiary)" />
        <input
          value={value.search}
          onChange={(e) => set("search", e.target.value)}
          placeholder="Buscar por carátula o expediente…"
          aria-label="Buscar expedientes"
          className="min-w-0 flex-1 bg-transparent text-sm text-(--color-text-primary) outline-none placeholder:text-(--color-text-tertiary)"
        />
      </div>

      <MultiSelectDropdown
        label="Fuero"
        options={FUERO_OPTIONS}
        selected={value.fuero}
        onChange={(next) => set("fuero", next)}
        width={150}
      />
      <MultiSelectDropdown
        label="Proceso"
        options={PROCESO_OPTIONS}
        selected={value.proceso}
        onChange={(next) => set("proceso", next)}
        width={150}
      />
      <MultiSelectDropdown
        label="Estado"
        options={ESTADO_OPTIONS}
        selected={value.estado}
        onChange={(next) => set("estado", next)}
        width={160}
      />

      <label className="flex shrink-0 cursor-pointer select-none items-center gap-2 whitespace-nowrap text-sm">
        <Checkbox
          checked={value.archivados}
          onCheckedChange={(checked) => set("archivados", checked === true)}
        />
        Incluir archivados
      </label>
    </div>
  );
}
