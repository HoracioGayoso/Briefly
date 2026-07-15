"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TIPO_CLIENTE_OPTIONS, type Cliente, type TipoCliente } from "./types";

type ClienteFormData = Pick<Cliente, "nombre" | "tipo" | "email" | "telefono">;

interface ClienteFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: ClienteFormData) => void;
  initialValue?: ClienteFormData;
}

const EMPTY: ClienteFormData = { nombre: "", tipo: "Persona física", email: "", telefono: "" };

/** Modal de alta/edición de clientes (mismo patrón que Fueros/Procesos). */
export function ClienteFormModal({ visible, onClose, onSave, initialValue }: ClienteFormModalProps) {
  const [form, setForm] = useState<ClienteFormData>(initialValue ?? EMPTY);
  const isEdit = !!initialValue?.nombre;

  useEffect(() => {
    if (visible) setForm(initialValue ?? EMPTY);
  }, [visible, initialValue]);

  const set = <K extends keyof ClienteFormData>(key: K, value: ClienteFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const nombre = form.nombre.trim();
    if (!nombre) return;
    onSave({ ...form, nombre });
    onClose();
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar cliente" : "Nuevo cliente"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cliente-tipo">Tipo</Label>
            <Select value={form.tipo} onValueChange={(v) => set("tipo", v as TipoCliente)}>
              <SelectTrigger id="cliente-tipo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIPO_CLIENTE_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cliente-nombre">Nombre / Razón social</Label>
            <Input
              id="cliente-nombre"
              autoFocus
              value={form.nombre}
              onChange={(e) => set("nombre", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cliente-email">Email</Label>
            <Input
              id="cliente-email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cliente-telefono">Teléfono</Label>
            <Input
              id="cliente-telefono"
              type="tel"
              value={form.telefono}
              onChange={(e) => set("telefono", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar cliente</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
