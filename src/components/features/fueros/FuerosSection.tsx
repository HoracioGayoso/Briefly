"use client";

import { useState } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody } from "@coreui/react";
import { Topbar } from "@/components/layout/Topbar";
import { Fab } from "@/components/ui/Fab";
import { FueroRow } from "./FueroRow";
import { FueroFormModal } from "./FueroFormModal";
import { MOCK_FUEROS, type Fuero } from "./types";

const COLUMNS = [
  { label: "Nombre", width: "60%" },
  { label: "Expedientes asociados", width: "25%" },
  { label: "Acciones", width: "15%" },
];

/**
 * Contenido completo de /fueros (Topbar + tabla + modal de alta/edición). La
 * explicación de qué es un fuero va como tooltip del ícono de info junto al
 * título (prop `titleInfo` de Topbar), no como párrafo aparte. El alta usa el
 * mismo <Fab> que Expedientes (con `onClick` en vez de `href`, porque acá
 * abre una modal sobre el propio listado en vez de navegar a una página
 * nueva) — así el botón de "agregar" se ve y se comporta igual en toda la
 * app, sea cual sea la entidad. Va en un único Client Component porque el
 * Fab y las filas de la tabla comparten el mismo estado de modal.
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
    <>
      <Topbar
        title="Fueros"
        titleInfo="Los fueros clasifican tus expedientes (Civil, Comercial, Laboral, etc.) y se usan como filtro en el listado."
      />

      <div className="briefly-card" style={{ padding: 0, overflow: "hidden" }}>
        <CTable hover responsive style={{ tableLayout: "fixed" }}>
          <CTableHead>
            <CTableRow>
              {COLUMNS.map((col) => (
                <CTableHeaderCell key={col.label} style={{ width: col.width }}>
                  {col.label}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {fueros.map((fuero) => (
              <FueroRow key={fuero.id} {...fuero} onEdit={openEdit} />
            ))}
          </CTableBody>
        </CTable>
      </div>

      <FueroFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialValue={editingFuero?.nombre ?? ""}
      />

      <Fab onClick={openCreate} title="Nuevo fuero" />
    </>
  );
}
