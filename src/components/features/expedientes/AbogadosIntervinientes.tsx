"use client";

import { useState } from "react";
import { Search, Trash2, UserPlus } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const PERMISO_OPTIONS = ["Lectura", "Edición", "Administrador"];
const PERMISO_DEFAULT = "Edición";

// TODO(etapa 2): reemplazar por los colegas reales del estudio (sección
// "Amigos"). Por ahora es una lista de ejemplo para el autocompletado.
const AMIGOS = [
  "Dra. Laura Giménez",
  "Dr. Martín Ferreyra",
  "Dra. Sofía Ruiz",
  "Dr. Pablo Sosa",
  "Dra. Carla Méndez",
  "Dr. Nicolás Vega",
  "Dra. Julieta Ibáñez",
];

interface Interviniente {
  nombre: string;
  permiso: string;
}

/**
 * Buscador de abogados intervinientes con autocompletado. Al elegir uno se
 * agrega a una lista debajo, cada uno con su nivel de permiso y un botón para
 * quitarlo. Las opciones salen (a futuro) de la sección "Amigos"; hoy son mock.
 * El estado se serializa en un input hidden para que lo tome el submit del form.
 */
export function AbogadosIntervinientes() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [selected, setSelected] = useState<Interviniente[]>([]);

  const disponibles = AMIGOS.filter(
    (a) => !selected.some((s) => s.nombre === a) && a.toLowerCase().includes(query.trim().toLowerCase())
  );

  const add = (nombre: string) => {
    if (!nombre || selected.some((s) => s.nombre === nombre)) return;
    setSelected((prev) => [...prev, { nombre, permiso: PERMISO_DEFAULT }]);
    setQuery("");
    setOpen(false);
    setHighlight(0);
  };
  const remove = (nombre: string) => setSelected((prev) => prev.filter((s) => s.nombre !== nombre));
  const setPermiso = (nombre: string, permiso: string) =>
    setSelected((prev) => prev.map((s) => (s.nombre === nombre ? { ...s, permiso } : s)));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, disponibles.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      add(disponibles[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-2">
      {/* Buscador con autocompletado */}
      <div className="relative shrink-0">
        <div className="flex h-9 items-center gap-2 rounded-md border border-white/15 bg-(--color-bg-elevated-2) px-3 transition-colors focus-within:border-(--color-accent) focus-within:ring-2 focus-within:ring-(--color-accent)/40">
          <Search className="h-4 w-4 shrink-0 text-(--color-text-tertiary)" />
          <input
            id="intervinientes-search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setHighlight(0);
            }}
            onFocus={() => setOpen(true)}
            // onClick además de onFocus: tras elegir una opción (mousedown +
            // preventDefault no le saca el foco al input a propósito), un
            // click posterior en el input YA enfocado no dispara onFocus de
            // nuevo (sólo se dispara en la transición sin-foco→foco), así que
            // el desplegable no se reabría hasta perder y recuperar el foco.
            onClick={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={onKeyDown}
            placeholder="Buscar abogado por nombre…"
            aria-label="Buscar abogado interviniente"
            className="min-w-0 flex-1 bg-transparent text-sm text-(--color-text-primary) outline-none placeholder:text-(--color-text-tertiary)"
          />
        </div>

        {/* briefly-menu / briefly-menu-item + data-state/data-highlighted: mismas
           clases y mismo mecanismo que DropdownMenu (globals.css), aunque este
           autocompletado no es Radix — así el look, la animación de apertura y
           el highlight quedan idénticos a los demás desplegables de la app. */}
        {open && (disponibles.length > 0 || query.trim()) && (
          <div
            data-state="open"
            className="briefly-menu absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-white/10 bg-(--color-bg-elevated) p-1 shadow-(--shadow-md)"
          >
            {disponibles.length > 0 ? (
              disponibles.map((a, i) => (
                <button
                  key={a}
                  type="button"
                  // onMouseDown (no onClick): dispara antes que el blur del input,
                  // así el click se registra sin que el dropdown se cierre primero.
                  onMouseDown={(e) => {
                    e.preventDefault();
                    add(a);
                  }}
                  onMouseEnter={() => setHighlight(i)}
                  data-highlighted={i === highlight ? "" : undefined}
                  className={cn(
                    "briefly-menu-item flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors",
                    i !== highlight && "text-(--color-text-primary)"
                  )}
                >
                  <UserPlus className="h-4 w-4 shrink-0 opacity-70" />
                  {a}
                </button>
              ))
            ) : (
              <p className="px-2 py-1.5 text-sm text-(--color-text-secondary)">Sin resultados</p>
            )}
          </div>
        )}
      </div>

      {/* Caja congruente con la tabla de Expedientes (borde + header uppercase),
         siempre presente: así el espacio no queda vacío cuando no hay nadie
         agregado todavía (se muestra un estado vacío adentro). */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-white/10">
        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-3 py-2 text-xs font-semibold uppercase text-(--color-text-secondary)">
          <span className="flex-1">Abogado</span>
          <span className="w-40 shrink-0">Permiso</span>
          <span className="w-8 shrink-0" />
        </div>
        {selected.length > 0 ? (
          <ul className="flex-1 overflow-y-auto">
            {selected.map((s, i) => (
              <li
                key={s.nombre}
                className={cn("flex items-center gap-3 px-3 py-2", i > 0 && "border-t border-white/10")}
              >
                <span className="flex-1 truncate text-sm text-(--color-text-primary)">{s.nombre}</span>
                <div className="w-40 shrink-0">
                  <Select value={s.permiso} onValueChange={(v) => setPermiso(s.nombre, v)}>
                    <SelectTrigger aria-label={`Permiso de ${s.nombre}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PERMISO_OPTIONS.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button
                  type="button"
                  onClick={() => remove(s.nombre)}
                  aria-label={`Quitar a ${s.nombre}`}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-(--color-text-tertiary) transition-colors hover:bg-(--color-danger)/15 hover:text-(--color-danger)"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-3 py-6 text-center text-sm text-(--color-text-tertiary)">
            Ningún abogado agregado todavía
          </p>
        )}
      </div>

      {/* Se serializa para el submit del form (mock; ver TODO etapa 2). */}
      <input type="hidden" name="intervinientes" value={JSON.stringify(selected)} />
    </div>
  );
}
