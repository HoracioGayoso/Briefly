"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HonorarioRow } from "./HonorarioRow";
import { HonorarioFormModal } from "./HonorarioFormModal";
import { MOCK_HONORARIOS, formatMonto, type Honorario } from "./types";

const COLUMNS = [
  { label: "Expediente / Cliente", width: "30%" },
  { label: "Concepto", width: "20%" },
  { label: "Monto", width: "15%" },
  { label: "Fecha", width: "13%" },
  { label: "Estado", width: "12%" },
  { label: "Acciones", width: "10%" },
];

function StatCard({ label, value, tone }: { label: string; value: string; tone?: "success" }) {
  return (
    <div className="rounded-xl border border-white/10 p-4">
      <p className={tone === "success" ? "text-2xl font-semibold text-emerald-400" : "text-2xl font-semibold text-(--color-text-primary)"}>
        {value}
      </p>
      <p className="mt-1 text-sm text-(--color-text-secondary)">{label}</p>
    </div>
  );
}

/** Contenido completo de /honorarios. Congruente con Fueros/Procesos/Clientes,
 * con 3 stat cards arriba (mockups/honorarios.html) resumiendo pendiente de
 * cobro, cobrado en el año y gastos sin rendir. */
export function HonorariosSection() {
  const [honorarios, setHonorarios] = useState<Honorario[]>(MOCK_HONORARIOS);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Honorario | null>(null);

  const stats = useMemo(() => {
    const pendiente = honorarios.filter((h) => h.estado === "Pendiente").reduce((s, h) => s + h.monto, 0);
    const cobrado = honorarios.filter((h) => h.estado === "Cobrado").reduce((s, h) => s + h.monto, 0);
    const sinRendir = honorarios.filter((h) => h.estado === "Sin rendir").reduce((s, h) => s + h.monto, 0);
    return { pendiente, cobrado, sinRendir };
  }, [honorarios]);

  const openCreate = () => {
    setEditing(null);
    setModalVisible(true);
  };

  const openEdit = (h: Honorario) => {
    setEditing(h);
    setModalVisible(true);
  };

  // TODO(etapa 2, RF-10): reemplazar por mutaciones reales contra Supabase.
  const handleSave = (data: Pick<Honorario, "expediente" | "concepto" | "monto" | "estado">) => {
    setHonorarios((prev) =>
      editing
        ? prev.map((h) => (h.id === editing.id ? { ...h, ...data } : h))
        : [
            ...prev,
            { id: crypto.randomUUID(), ...data, fecha: new Date().toISOString().slice(0, 10) },
          ],
    );
  };

  return (
    <div className="p-4 md:p-6">
      <Topbar
        title="Honorarios y facturación"
        actions={
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Registrar honorario
          </Button>
        }
      />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Pendiente de cobro" value={formatMonto(stats.pendiente)} />
        <StatCard label="Cobrado este año" value={formatMonto(stats.cobrado)} tone="success" />
        <StatCard label="Gastos sin rendir" value={formatMonto(stats.sinRendir)} />
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
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
            {honorarios.map((h) => (
              <HonorarioRow key={h.id} {...h} onEdit={openEdit} />
            ))}
          </TableBody>
        </Table>
      </div>

      <HonorarioFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialValue={editing ?? undefined}
      />
    </div>
  );
}
