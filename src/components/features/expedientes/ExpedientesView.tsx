"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ExpedientesFilters, type ExpedientesFiltersValue } from "./ExpedientesFilters";
import { ExpedientesTable, type SortKey, type SortDir } from "./ExpedientesTable";
import { Pagination } from "@/components/ui/Pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MOCK_EXPEDIENTES, type Expediente } from "./types";

const EMPTY_FILTERS: ExpedientesFiltersValue = {
  search: "",
  fuero: [],
  proceso: [],
  estado: [],
  archivados: false,
};

const PAGE_SIZES = [10, 25, 50];

function sortValue(e: Expediente, key: SortKey): string {
  return key === "estado" ? e.estado.label : (e[key] as string);
}

interface ExpedientesViewProps {
  /** Topbar de la página (Server Component). Se recibe como prop, en vez de
   * renderizarse aparte en page.tsx, para que quede DENTRO del mismo bloque
   * sticky que los filtros — así ambos se pegan arriba juntos al scrollear,
   * en vez de tener que sincronizar dos sticky independientes por altura. */
  header: ReactNode;
}

/**
 * Vista del listado de expedientes. Client Component que centraliza el estado
 * (filtros, orden, paginación) y aplica el filtrado en vivo sobre los datos.
 * La toolbar y la tabla son presentacionales; acá vive la lógica.
 */
export function ExpedientesView({ header }: ExpedientesViewProps) {
  const [filters, setFilters] = useState<ExpedientesFiltersValue>(EMPTY_FILTERS);
  // Por defecto: ordenado por fecha de creación, del más nuevo al más viejo.
  const [sortKey, setSortKey] = useState<SortKey>("fechaCreacion");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  // Skeleton inicial (simula la carga; en Etapa 2 lo reemplaza el fetch real).
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // Al cambiar filtros/orden/tamaño, volver a la primera página.
  useEffect(() => {
    setPage(1);
  }, [filters, sortKey, sortDir, pageSize]);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return MOCK_EXPEDIENTES.filter((e) => {
      if (!filters.archivados && e.archivado) return false;
      if (filters.fuero.length && !filters.fuero.includes(e.fuero)) return false;
      if (filters.proceso.length && !filters.proceso.includes(e.proceso)) return false;
      if (filters.estado.length && !filters.estado.includes(e.estado.label)) return false;
      if (q && !e.caratula.toLowerCase().includes(q) && !e.numeroExpediente.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort(
      (a, b) => sortValue(a, sortKey).localeCompare(sortValue(b, sortKey), "es", { numeric: true }) * dir
    );
  }, [filtered, sortKey, sortDir]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageRows = sorted.slice(start, start + pageSize);
  const from = total === 0 ? 0 : start + 1;
  const to = Math.min(start + pageSize, total);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <>
      {/* Bloque sticky: Topbar + filtros quedan fijos arriba al scrollear una
         tabla larga (25/50 filas). Como <main> no tiene padding, se pega AL RAS
         (top:0) y su fondo opaco llega de punta a punta, tapando las filas que
         pasan por detrás — sin el hueco por el que antes asomaban. z-20: por
         encima de las filas, por debajo de los menús (portales, z-50). */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-(--color-bg-page) px-4 pt-4 md:px-6 md:pt-6">
        {header}
        <ExpedientesFilters value={filters} onChange={setFilters} />
      </div>

      {/* Sin wrapper overflow-x-auto acá: hacía que la tabla scrollee en
         vertical por su cuenta (CSS promueve overflow-y a auto cuando overflow-x
         es auto), robándole el scroll a <main> y volviendo inútil la paginación.
         Ahora el único que scrollea es <main>, y por eso el bloque de arriba
         puede quedar sticky. */}
      <div className="mx-4 mt-4 mb-4 overflow-hidden rounded-xl border border-white/10 md:mx-6 md:mb-6">
        <ExpedientesTable
          rows={pageRows}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
          loading={loading}
        />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-3 pl-4 pr-6 text-sm">
          <span className="text-(--color-text-secondary)">
            {loading ? "Cargando…" : total === 0 ? "Sin resultados" : `Mostrando ${from}–${to} de ${total}`}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-(--color-text-secondary)">
              <span id="page-size-label">Filas</span>
              <Select value={String(pageSize)} onValueChange={(v) => setPageSize(Number(v))}>
                <SelectTrigger aria-labelledby="page-size-label" className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZES.map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
