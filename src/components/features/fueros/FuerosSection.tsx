"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FueroRow } from "./FueroRow";
import { FueroFormModal } from "./FueroFormModal";
import { MOCK_FUEROS, type Fuero } from "./types";

const COLUMNS = [
  { label: "Nombre", width: "60%" },
  { label: "Expedientes asociados", width: "25%" },
  { label: "Acciones", width: "15%" },
];

/**
 * Contenido completo de /fueros (Topbar + tabla + modal de alta/edición).
 * Congruente con /expedientes: mismas primitivas Table, mismo botón de alta en
 * el Topbar (en vez del FAB flotante del prototipo original — ver la migración
 * de Expedientes: un botón "+ Nuevo X" en el header lee más a producto que un
 * FAB de mobile). El alta abre una modal sobre el propio listado (no navega a
 * una página nueva, a diferencia de expedientes/nuevo).
 */
export function FuerosSection() {
  const [fueros, setFueros] = useState<Fuero[]>(MOCK_FUEROS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFuero, setEditingFuero] = useState<Fuero | null>(null);

  const openCreate = () => {
    setEditingFuero(null);
    setModalVisible(true);
  };

  const openEdit = (fuero: Fuero) => {
    setEditingFuero(fuero);
    setModalVisible(true);
  };

  // TODO(etapa 2, RF-10): reemplazar por mutaciones reales contra Supabase.
  const handleSave = (nombre: string) => {
    setFueros((prev) =>
      editingFuero
        ? prev.map((f) => (f.id === editingFuero.id ? { ...f, nombre } : f))
        : [...prev, { id: crypto.randomUUID(), nombre, expedientesAsociados: 0 }],
    );
  };

  return (
    <div className="p-4 md:p-6">
      <Topbar
        title="Fueros"
        titleInfo="Los fueros clasifican tus expedientes (Civil, Comercial, Laboral, etc.) y se usan como filtro en el listado."
        actions={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo fuero
          </Button>
        }
      />

      <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
        <Table style={{ tableLayout: "fixed" }}>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableHead key={col.label} style={{ width: col.width }}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fueros.map((fuero) => (
              <FueroRow key={fuero.id} {...fuero} onEdit={openEdit} />
            ))}
          </TableBody>
        </Table>
      </div>

      <FueroFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialValue={editingFuero?.nombre ?? ""}
      />
    </div>
  );
}
