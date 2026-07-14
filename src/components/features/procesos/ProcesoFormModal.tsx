"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FUERO_OPTIONS } from "@/components/features/expedientes/types";
import type { Proceso } from "./types";

interface ProcesoFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { nombre: string; fuero: string }) => void;
  /** Proceso existente cuando se edita; undefined = alta. */
  initialValue?: Pick<Proceso, "nombre" | "fuero">;
}

/**
 * Modal de alta/edición de procesos (mismo patrón que FueroFormModal): nombre
 * + fuero asociado (mismas opciones que el filtro de Expedientes, única
 * fuente de verdad).
 */
export function ProcesoFormModal({ visible, onClose, onSave, initialValue }: ProcesoFormModalProps) {
  const [nombre, setNombre] = useState(initialValue?.nombre ?? "");
  const [fuero, setFuero] = useState(initialValue?.fuero ?? "");
  const isEdit = !!initialValue?.nombre;

  useEffect(() => {
    if (visible) {
      setNombre(initialValue?.nombre ?? "");
      setFuero(initialValue?.fuero ?? "");
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    const trimmed = nombre.trim();
    if (!trimmed || !fuero) return;
    onSave({ nombre: trimmed, fuero });
    onClose();
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar proceso" : "Nuevo proceso"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="proceso-nombre">Nombre del proceso</Label>
            <Input
              id="proceso-nombre"
              autoFocus
              placeholder="Ej: Ordinario"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proceso-fuero">Fuero asociado</Label>
            <Select value={fuero} onValueChange={setFuero}>
              <SelectTrigger id="proceso-fuero">
                <SelectValue placeholder="Seleccionar…" />
              </SelectTrigger>
              <SelectContent>
                {FUERO_OPTIONS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
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
          <Button onClick={handleSave}>Guardar proceso</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
