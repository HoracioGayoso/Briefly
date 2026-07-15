"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MOCK_EXPEDIENTES } from "@/components/features/expedientes/types";
import type { TipoEvento, Vencimiento } from "./types";

type VencimientoFormData = Pick<Vencimiento, "descripcion" | "expediente" | "fecha" | "tipoId" | "notificar">;

interface VencimientoFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: VencimientoFormData) => void;
  tipos: TipoEvento[];
}

const EXPEDIENTE_OPTIONS = MOCK_EXPEDIENTES.map((e) => `${e.numeroExpediente} · ${e.caratula}`);

function emptyForm(tipos: TipoEvento[]): VencimientoFormData {
  return { descripcion: "", expediente: "", fecha: "", tipoId: tipos[0]?.id ?? "", notificar: false };
}

/** Modal de alta de evento de calendario (RF-33). Sólo alta por ahora, sin
 * edición (mockups/calendario.html tampoco la contempla sobre los eventos
 * del calendario). El Tipo sale de la lista editable por el usuario (ver
 * TiposEventoModal), no de un enum fijo. */
export function VencimientoFormModal({ visible, onClose, onSave, tipos }: VencimientoFormModalProps) {
  const [form, setForm] = useState<VencimientoFormData>(() => emptyForm(tipos));

  useEffect(() => {
    if (visible) setForm(emptyForm(tipos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const set = <K extends keyof VencimientoFormData>(key: K, value: VencimientoFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const descripcion = form.descripcion.trim();
    if (!descripcion || !form.fecha || !form.tipoId) return;
    onSave({ ...form, descripcion });
    onClose();
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo evento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="vencimiento-descripcion">Descripción</Label>
            <Input
              id="vencimiento-descripcion"
              autoFocus
              placeholder="Ej: Contestar demanda"
              value={form.descripcion}
              onChange={(e) => set("descripcion", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vencimiento-expediente">Expediente asociado</Label>
            <Select value={form.expediente} onValueChange={(v) => set("expediente", v)}>
              <SelectTrigger id="vencimiento-expediente">
                <SelectValue placeholder="Sin expediente asociado" />
              </SelectTrigger>
              <SelectContent>
                {EXPEDIENTE_OPTIONS.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vencimiento-fecha">Fecha</Label>
            <DatePicker
              id="vencimiento-fecha"
              defaultValue={form.fecha}
              placeholder="Seleccionar fecha…"
              onSelect={(iso) => set("fecha", iso)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="vencimiento-tipo">Tipo</Label>
            <Select value={form.tipoId} onValueChange={(v) => set("tipoId", v)}>
              <SelectTrigger id="vencimiento-tipo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tipos.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <label className="flex cursor-pointer select-none items-center gap-2 text-sm">
            <Checkbox checked={form.notificar} onCheckedChange={(c) => set("notificar", c === true)} />
            Notificarme 2 días antes
          </label>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
