"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MOCK_EXPEDIENTES } from "@/components/features/expedientes/types";
import { ESTADO_HONORARIO_OPTIONS, type EstadoHonorario, type Honorario } from "./types";

type HonorarioFormData = Pick<Honorario, "expediente" | "concepto" | "monto" | "estado">;

interface HonorarioFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: HonorarioFormData) => void;
  initialValue?: HonorarioFormData;
}

const EMPTY: HonorarioFormData = { expediente: "", concepto: "", monto: 0, estado: "Pendiente" };

const EXPEDIENTE_OPTIONS = MOCK_EXPEDIENTES.map((e) => `${e.numeroExpediente} · ${e.caratula}`);

// Máscara de moneda ARS: miles con "." y decimales con "," (formato es-AR),
// se va aplicando mientras se escribe. Se separa por la ÚLTIMA coma tipeada
// (no por parseFloat) para poder formatear la parte entera con separadores
// EN VIVO sin perder la coma/dígitos decimales todavía "en progreso" (si se
// reformateara todo el string de una, escribir "1000," colapsaría la coma
// recién tipeada antes de poder cargar el decimal).
function maskMonto(raw: string): { display: string; value: number } {
  const [intPart = "", decPart] = raw.replace(/\./g, "").split(",");
  const intDigits = intPart.replace(/\D/g, "");
  const intFormatted = intDigits ? Number(intDigits).toLocaleString("es-AR") : "";
  const display = decPart !== undefined ? `${intFormatted},${decPart.replace(/\D/g, "").slice(0, 2)}` : intFormatted;
  const value = Number(`${intDigits || 0}.${decPart?.replace(/\D/g, "") || 0}`);
  return { display, value };
}
function formatMontoInput(n: number): string {
  return n ? n.toLocaleString("es-AR", { maximumFractionDigits: 2 }) : "";
}

/** Modal de alta/edición de honorarios (mismo patrón que Fueros/Procesos/Clientes). */
export function HonorarioFormModal({ visible, onClose, onSave, initialValue }: HonorarioFormModalProps) {
  const [form, setForm] = useState<HonorarioFormData>(initialValue ?? EMPTY);
  const [montoDisplay, setMontoDisplay] = useState(formatMontoInput(initialValue?.monto ?? 0));
  const isEdit = !!initialValue?.concepto;

  useEffect(() => {
    if (visible) {
      setForm(initialValue ?? EMPTY);
      setMontoDisplay(formatMontoInput(initialValue?.monto ?? 0));
    }
  }, [visible, initialValue]);

  const set = <K extends keyof HonorarioFormData>(key: K, value: HonorarioFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const concepto = form.concepto.trim();
    if (!concepto || !form.expediente) return;
    onSave({ ...form, concepto });
    onClose();
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar honorario / gasto" : "Registrar honorario / gasto"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="honorario-expediente">Expediente</Label>
            {isEdit ? (
              // Al editar, el expediente es de sólo lectura: no tiene sentido
              // reasignar un honorario ya registrado a otro expediente.
              <p
                id="honorario-expediente"
                className="flex h-9 w-full items-center truncate rounded-md border border-white/15 bg-(--color-bg-elevated-2) px-3 text-sm text-(--color-text-secondary)"
              >
                {form.expediente}
              </p>
            ) : (
              <Select value={form.expediente} onValueChange={(v) => set("expediente", v)}>
                <SelectTrigger id="honorario-expediente">
                  <SelectValue placeholder="Seleccionar…" />
                </SelectTrigger>
                <SelectContent>
                  {EXPEDIENTE_OPTIONS.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="honorario-concepto">Concepto</Label>
            <Input
              id="honorario-concepto"
              autoFocus
              placeholder="Ej: Honorarios primera instancia"
              value={form.concepto}
              onChange={(e) => set("concepto", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="honorario-monto">Monto (ARS)</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-(--color-text-tertiary)">
                $
              </span>
              <Input
                id="honorario-monto"
                inputMode="decimal"
                placeholder="0"
                className="tabular-nums"
                style={{ paddingLeft: "2.25rem" }}
                value={montoDisplay}
                onChange={(e) => {
                  // La máscara se aplica en cada tecla (no sólo al perder el
                  // foco): separa por la última coma tipeada para no perderla
                  // mientras se cargan los decimales (ver maskMonto).
                  const { display, value } = maskMonto(e.target.value.replace(/[^\d.,]/g, ""));
                  setMontoDisplay(display);
                  set("monto", value);
                }}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="honorario-estado">Estado</Label>
            <Select value={form.estado} onValueChange={(v) => set("estado", v as EstadoHonorario)}>
              <SelectTrigger id="honorario-estado">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ESTADO_HONORARIO_OPTIONS.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
