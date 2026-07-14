"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FueroFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (nombre: string) => void;
  /** Nombre existente cuando se edita un fuero; vacío/undefined = alta. */
  initialValue?: string;
}

/**
 * Modal única para alta y edición de fueros (mismo patrón que
 * mockups/fueros.html: un solo campo "Nombre del fuero"). Se reutiliza desde
 * el botón "Nuevo fuero" del Topbar y desde el ícono de editar de cada fila.
 */
export function FueroFormModal({ visible, onClose, onSave, initialValue = "" }: FueroFormModalProps) {
  const [nombre, setNombre] = useState(initialValue);
  const isEdit = initialValue.trim().length > 0;

  // Resetea el campo cada vez que se abre, con el valor a editar (o vacío en alta).
  useEffect(() => {
    if (visible) setNombre(initialValue);
  }, [visible, initialValue]);

  const handleSave = () => {
    const trimmed = nombre.trim();
    if (!trimmed) return;
    onSave(trimmed);
    onClose();
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar fuero" : "Nuevo fuero"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-1.5">
          <Label htmlFor="fuero-nombre">Nombre del fuero</Label>
          <Input
            id="fuero-nombre"
            autoFocus
            placeholder="Ej: Civil"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar fuero</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
