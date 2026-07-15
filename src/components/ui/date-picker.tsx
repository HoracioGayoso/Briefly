"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  id?: string;
  name?: string;
  /** Valor inicial en ISO (YYYY-MM-DD). */
  defaultValue?: string;
  placeholder?: string;
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromISO(iso?: string): Date | undefined {
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  return y && m && d ? new Date(y, m - 1, d) : undefined;
}

function formatDisplay(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}/${m}/${date.getFullYear()}`;
}

/**
 * Selector de fecha con calendario propio (Radix Popover + react-day-picker),
 * en vez de <input type="date">: el picker nativo lo dibuja el SO/navegador y
 * no sigue el tema oscuro del sitio (mismo problema que tenía el <select>
 * nativo — ver select.tsx). Se estiliza 100% con clases de Tailwind vía el
 * prop `classNames` de react-day-picker, sin importar su CSS por defecto: así
 * se evita el problema de cascada de CSS sin capa que ya tuvimos con CoreUI.
 * El popover reusa `.briefly-menu` (mismo fondo/borde/animación que los demás
 * desplegables) y un <input type="hidden"> serializa la fecha para FormData.
 */
export function DatePicker({ id, name, defaultValue, placeholder = "Seleccionar fecha…" }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(() => fromISO(defaultValue));
  const [open, setOpen] = React.useState(false);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-white/15 bg-(--color-bg-elevated-2) px-3 text-sm outline-none transition-colors cursor-pointer",
            "focus-visible:border-(--color-accent) focus-visible:ring-2 focus-visible:ring-(--color-accent)/40",
            date ? "text-(--color-text-primary)" : "text-(--color-text-tertiary)"
          )}
        >
          {date ? formatDisplay(date) : placeholder}
          <CalendarDays className="h-4 w-4 shrink-0 text-(--color-text-tertiary)" />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="briefly-menu z-50 rounded-md border border-white/10 bg-(--color-bg-elevated) p-3 text-(--color-text-primary) shadow-(--shadow-md)"
        >
          <DayPicker
            mode="single"
            locale={es}
            showOutsideDays
            selected={date}
            defaultMonth={date}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
            }}
            components={{
              // Chevron propio (lucide) en vez del ícono por defecto de
              // react-day-picker: mismo lenguaje de íconos que el resto del
              // sitio, se veía desprolijo/desalineado con el label del mes.
              Chevron: ({ orientation }) =>
                orientation === "left" ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                ),
            }}
            classNames={{
              months: "flex flex-col",
              month: "space-y-2",
              month_caption: "relative flex h-8 items-center justify-center",
              caption_label: "text-sm font-medium",
              nav: "absolute inset-x-0 top-0 flex items-center justify-between",
              button_previous:
                "inline-flex h-7 w-7 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary) disabled:pointer-events-none disabled:opacity-30",
              button_next:
                "inline-flex h-7 w-7 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary) disabled:pointer-events-none disabled:opacity-30",
              month_grid: "w-full border-collapse mt-1",
              weekdays: "flex",
              weekday: "w-9 text-center text-xs font-normal text-(--color-text-tertiary)",
              week: "flex mt-1",
              day: "p-0 text-center align-middle",
              day_button:
                "flex h-9 w-9 items-center justify-center rounded-md text-sm font-normal text-(--color-text-primary) transition-colors hover:bg-(--color-bg-elevated-2) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)/40 cursor-pointer",
              selected: "[&_button]:bg-(--color-accent) [&_button]:text-white [&_button]:hover:bg-(--color-accent)",
              today: "[&_button]:font-semibold [&_button]:ring-1 [&_button]:ring-inset [&_button]:ring-(--color-accent)/50",
              outside: "[&_button]:text-(--color-text-tertiary) [&_button]:opacity-50",
              disabled: "[&_button]:opacity-30 [&_button]:pointer-events-none",
              hidden: "invisible",
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>

      <input type="hidden" name={name} value={date ? toISO(date) : ""} />
    </PopoverPrimitive.Root>
  );
}
