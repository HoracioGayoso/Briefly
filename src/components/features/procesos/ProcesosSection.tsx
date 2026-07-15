"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProcesoRow } from "./ProcesoRow";
import { ProcesoFormModal } from "./ProcesoFormModal";
import { MOCK_PROCESOS, type Proceso } from "./types";

const COLUMNS = [
  { label: "Nombre", width: "40%" },
  { label: "Fuero asociado", width: "30%" },
  { label: "Expedientes", width: "20%" },
  { label: "Acciones", width: "10%" },
];

/** Contenido completo de /procesos. Congruente con /fueros y /expedientes:
 * mismas primitivas Table/Dialog/Select, botón de alta en el Topbar. */
export function ProcesosSection() {
  const [procesos, setProcesos] = useState<Proceso[]>(MOCK_PROCESOS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProceso, setEditingProceso] = useState<Proceso | null>(null);

  const openCreate = () => {
    setEditingProceso(null);
    setModalVisible(true);
  };

  const openEdit = (proceso: Proceso) => {
    setEditingProceso(proceso);
    setModalVisible(true);
  };

  // TODO(etapa 2, RF-10): reemplazar por mutaciones reales contra Supabase.
  const handleSave = ({ nombre, fuero }: { nombre: string; fuero: string }) => {
    setProcesos((prev) =>
      editingProceso
        ? prev.map((p) => (p.id === editingProceso.id ? { ...p, nombre, fuero } : p))
        : [...prev, { id: crypto.randomUUID(), nombre, fuero, expedientesAsociados: 0 }],
    );
  };

  return (
    <div className="p-4 md:p-6">
      <Topbar
        title="Procesos"
        titleInfo="Los tipos de proceso (Ordinario, Ejecutivo, Sumarísimo, etc.) se asocian a un fuero y se usan como filtro en el listado de expedientes."
        actions={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo proceso
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
            {procesos.map((proceso) => (
              <ProcesoRow key={proceso.id} {...proceso} onEdit={openEdit} />
            ))}
          </TableBody>
        </Table>
      </div>

      <ProcesoFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialValue={editingProceso ?? undefined}
      />
    </div>
  );
}
