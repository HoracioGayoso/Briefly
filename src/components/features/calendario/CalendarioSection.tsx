"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, CalendarCheck, Tags } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CalendarGrid } from "./CalendarGrid";
import { VencimientoFormModal } from "./VencimientoFormModal";
import { TiposEventoModal } from "./TiposEventoModal";
import { MOCK_VENCIMIENTOS, DEFAULT_TIPOS_EVENTO, type Vencimiento, type TipoEvento } from "./types";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function formatFechaCorta(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

/** Contenido completo de /calendario (RF-33). Botón "Conectar Google
 * Calendar" deshabilitado con tag "Soon" (RF-40: la sync real requiere OAuth
 * contra Google, etapa 2 — ver Briefly_Arquitectura_Backend_v2.docx, 6.1 y
 * 6.4) — mismo patrón que "Apariencia" en el menú de usuario. Los tipos de
 * evento son editables por el usuario (ver TiposEventoModal), no un enum fijo. */
export function CalendarioSection() {
  const hoy = new Date();
  const [year, setYear] = useState(hoy.getFullYear());
  const [month, setMonth] = useState(hoy.getMonth());
  const [vencimientos, setVencimientos] = useState<Vencimiento[]>(MOCK_VENCIMIENTOS);
  const [tipos, setTipos] = useState<TipoEvento[]>(DEFAULT_TIPOS_EVENTO);
  const [modalVisible, setModalVisible] = useState(false);
  const [tiposModalVisible, setTiposModalVisible] = useState(false);

  const colorPorTipoId = useMemo(
    () => Object.fromEntries(tipos.map((t) => [t.id, t.color])),
    [tipos]
  );

  const cambiarMes = (delta: number) => {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  const proximos7 = useMemo(() => {
    const desde = new Date();
    desde.setHours(0, 0, 0, 0);
    const hasta = new Date(desde);
    hasta.setDate(hasta.getDate() + 7);
    return vencimientos
      .filter((v) => {
        const f = new Date(v.fecha + "T00:00:00");
        return f >= desde && f <= hasta;
      })
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }, [vencimientos]);

  const todayISO = hoy.toISOString().slice(0, 10);

  // TODO(etapa 2, RF-10): reemplazar por mutación real contra Supabase +
  // creación del evento espejo en Google Calendar si hay cuenta conectada.
  const handleSave = (data: Omit<Vencimiento, "id" | "estado" | "googleEventId">) => {
    setVencimientos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...data, estado: "pendiente", googleEventId: null },
    ]);
  };

  const handleAddTipo = (tipo: Omit<TipoEvento, "id">) => {
    setTipos((prev) => [...prev, { id: crypto.randomUUID(), ...tipo }]);
  };

  const handleRemoveTipo = (id: string) => {
    setTipos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-4 md:p-6">
      <Topbar
        title="Calendario de vencimientos"
        actions={
          <>
            <Button
              variant="outline"
              disabled
              title="Sincronización con Google Calendar (RF-40) — próximamente"
              className="gap-2"
            >
              <CalendarCheck className="h-4 w-4" />
              Conectar Google Calendar
              <span className="rounded-full bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-medium text-sky-300">
                Soon
              </span>
            </Button>
            <Button variant="outline" onClick={() => setTiposModalVisible(true)}>
              <Tags className="h-4 w-4" />
              Tipos de evento
            </Button>
            <Button onClick={() => setModalVisible(true)}>
              <Plus className="h-4 w-4" />
              Nuevo evento
            </Button>
          </>
        }
      />

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Mes anterior"
            onClick={() => cambiarMes(-1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary)"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-base font-semibold text-(--color-text-primary)">
            {MESES[month]} {year}
          </span>
          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => cambiarMes(1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary)"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tipos.map((t) => (
            <StatusBadge key={t.id} variant={t.color}>
              {t.nombre}
            </StatusBadge>
          ))}
        </div>
      </div>

      <CalendarGrid year={year} month={month} vencimientos={vencimientos} colorPorTipoId={colorPorTipoId} />

      <div className="mt-4 rounded-xl border border-white/10 p-4">
        <h2 className="text-sm font-semibold text-(--color-text-primary)">Próximos 7 días</h2>
        {proximos7.length === 0 ? (
          <p className="mt-3 text-sm text-(--color-text-tertiary)">Sin vencimientos en los próximos 7 días.</p>
        ) : (
          <ul className="mt-2 divide-y divide-white/5">
            {proximos7.map((v) => (
              <li key={v.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="truncate text-(--color-text-primary)">
                  {v.descripcion}
                  {v.expediente && (
                    <span className="text-(--color-text-secondary)"> — {v.expediente.split(" · ")[0]}</span>
                  )}
                </span>
                <StatusBadge variant={v.fecha === todayISO ? "danger" : "warning"}>
                  {v.fecha === todayISO ? "Hoy" : formatFechaCorta(v.fecha)}
                </StatusBadge>
              </li>
            ))}
          </ul>
        )}
      </div>

      <VencimientoFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        tipos={tipos}
      />
      <TiposEventoModal
        visible={tiposModalVisible}
        onClose={() => setTiposModalVisible(false)}
        tipos={tipos}
        onAdd={handleAddTipo}
        onRemove={handleRemoveTipo}
      />
    </div>
  );
}
