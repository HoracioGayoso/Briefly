"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ClienteRow } from "./ClienteRow";
import { ClienteFormModal } from "./ClienteFormModal";
import { MOCK_CLIENTES, type Cliente } from "./types";

const COLUMNS = [
  { label: "Nombre", width: "35%" },
  { label: "Tipo", width: "20%" },
  { label: "Contacto", width: "25%" },
  { label: "Expedientes", width: "10%" },
  { label: "Acciones", width: "10%" },
];

/** Contenido completo de /clientes. Congruente con /fueros y /procesos.
 * TODO(etapa 2): la ficha de detalle por cliente (mockups/clientes.html, tab
 * "Ficha") queda para una iteración futura — por ahora sólo listado + modal
 * de alta/edición. */
export function ClientesSection() {
  const [clientes, setClientes] = useState<Cliente[]>(MOCK_CLIENTES);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);

  const openCreate = () => {
    setEditingCliente(null);
    setModalVisible(true);
  };

  const openEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setModalVisible(true);
  };

  // TODO(etapa 2, RF-10): reemplazar por mutaciones reales contra Supabase.
  const handleSave = (data: Pick<Cliente, "nombre" | "tipo" | "email" | "telefono">) => {
    setClientes((prev) =>
      editingCliente
        ? prev.map((c) => (c.id === editingCliente.id ? { ...c, ...data } : c))
        : [...prev, { id: crypto.randomUUID(), ...data, expedientesAsociados: 0 }],
    );
  };

  return (
    <div className="p-4 md:p-6">
      <Topbar
        title="Clientes"
        actions={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Nuevo cliente
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
            {clientes.map((cliente) => (
              <ClienteRow key={cliente.id} {...cliente} onEdit={openEdit} />
            ))}
          </TableBody>
        </Table>
      </div>

      <ClienteFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialValue={editingCliente ?? undefined}
      />
    </div>
  );
}
