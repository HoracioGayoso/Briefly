"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { COLOR_OPTIONS, COLOR_DOT_CLASS, type TipoEvento } from "./types";
import type { EstadoExpedienteColor } from "@/components/features/expedientes/types";

interface TiposEventoModalProps {
  visible: boolean;
  onClose: () => void;
  tipos: TipoEvento[];
  onAdd: (tipo: Omit<TipoEvento, "id">) => void;
  onRemove: (id: string) => void;
}

function ColorDot({ color, className }: { color: EstadoExpedienteColor; className?: string }) {
  return <span className={cn("inline-block h-3.5 w-3.5 shrink-0 rounded-full", COLOR_DOT_CLASS[color], className)} />;
}

/**
 * Gestión de tipos de evento del calendario: el usuario puede crear los
 * suyos propios y elegirles color (acotado a la paleta semántica de la app,
 * ver COLOR_OPTIONS), no sólo usar los 3 por defecto. El color se elige con
 * un círculo de preview (estilo Google Calendar) en vez de sólo texto. El
 * cierre del modal es únicamente vía la X del header (Dialog ya la trae) —
 * no duplicamos con un botón "Cerrar" en el footer.
 */
export function TiposEventoModal({ visible, onClose, tipos, onAdd, onRemove }: TiposEventoModalProps) {
  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState<EstadoExpedienteColor>("info");

  const handleAdd = () => {
    const trimmed = nombre.trim();
    if (!trimmed) return;
    onAdd({ nombre: trimmed, color });
    setNombre("");
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tipos de evento</DialogTitle>
        </DialogHeader>

        <ul className="m-0 max-h-56 w-full list-none space-y-2 overflow-y-auto p-0 [scrollbar-gutter:stable]">
          {tipos.map((t) => (
            <li key={t.id} className="flex w-full items-center gap-3 rounded-md border border-white/10 px-3 py-2">
              <StatusBadge variant={t.color} className="shrink-0">
                {t.nombre}
              </StatusBadge>
              <span className="flex-1" />
              <button
                type="button"
                onClick={() => onRemove(t.id)}
                aria-label={`Eliminar tipo ${t.nombre}`}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-(--color-text-tertiary) transition-colors hover:bg-(--color-danger)/15 hover:text-(--color-danger)"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-end gap-2 border-t border-white/10 pt-4">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="tipo-evento-nombre">Nuevo tipo</Label>
            <Input
              id="tipo-evento-nombre"
              placeholder="Ej: Reunión con cliente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div className="w-32 space-y-1.5">
            <Label htmlFor="tipo-evento-color">Color</Label>
            <Select value={color} onValueChange={(v) => setColor(v as EstadoExpedienteColor)}>
              <SelectTrigger id="tipo-evento-color">
                <span className="flex items-center gap-2">
                  <ColorDot color={color} />
                </span>
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <span className="flex items-center gap-2">
                      <ColorDot color={c.value} />
                      {c.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAdd}>Agregar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
