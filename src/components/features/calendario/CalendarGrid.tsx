"use client";

import { StatusBadge } from "@/components/ui/StatusBadge";
import type { EstadoExpedienteColor } from "@/components/features/expedientes/types";
import type { Vencimiento } from "./types";

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Grilla del mes (Lunes a Domingo), con la cantidad de filas justa (5 o 6)
 * según el mes — no siempre 6 fijas. Los días de meses vecinos se muestran
 * atenuados, igual que mockups/calendario.html. */
function getMonthCells(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const firstWeekday = (first.getDay() + 6) % 7; // Lunes=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const start = new Date(year, month, 1 - firstWeekday);
  return Array.from({ length: totalCells }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
}

interface CalendarGridProps {
  year: number;
  /** 0-indexado (0 = enero). */
  month: number;
  vencimientos: Vencimiento[];
  /** tipoId -> color, para pintar cada evento (ver TiposEventoModal). */
  colorPorTipoId: Record<string, EstadoExpedienteColor>;
}

export function CalendarGrid({ year, month, vencimientos, colorPorTipoId }: CalendarGridProps) {
  const cells = getMonthCells(year, month);
  const todayISO = toISO(new Date());
  const porFecha = new Map<string, Vencimiento[]>();
  for (const e of vencimientos) {
    porFecha.set(e.fecha, [...(porFecha.get(e.fecha) ?? []), e]);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="grid grid-cols-7 border-b border-white/10">
        {DIAS_SEMANA.map((d) => (
          <div
            key={d}
            className="px-2 py-2 text-center text-xs font-semibold uppercase text-(--color-text-secondary)"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          const iso = toISO(date);
          const isCurrentMonth = date.getMonth() === month;
          const isToday = iso === todayISO;
          const dayEventos = porFecha.get(iso) ?? [];
          return (
            <div
              key={i}
              className="min-h-[92px] border-b border-r border-white/5 p-1.5 last:border-r-0 [&:nth-child(7n)]:border-r-0"
            >
              <span
                className={
                  isToday
                    ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-accent) text-xs font-semibold text-white"
                    : isCurrentMonth
                      ? "text-xs text-(--color-text-primary)"
                      : "text-xs text-(--color-text-tertiary)"
                }
              >
                {date.getDate()}
              </span>
              <div className="mt-1 space-y-1">
                {dayEventos.map((e) => (
                  <StatusBadge
                    key={e.id}
                    variant={colorPorTipoId[e.tipoId] ?? "secondary"}
                    className="block w-full truncate rounded px-1.5 py-0.5 text-left text-[10px]"
                    title={e.descripcion}
                  >
                    {e.descripcion}
                  </StatusBadge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
