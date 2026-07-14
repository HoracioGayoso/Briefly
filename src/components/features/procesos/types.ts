export interface Proceso {
  id: string;
  nombre: string;
  fuero: string;
  expedientesAsociados: number;
}

// TODO(etapa 2, RF-10): reemplazar por datos reales desde Supabase (listado +
// alta/edición). Datos de ejemplo, igual que mockups/procesos.html.
export const MOCK_PROCESOS: Proceso[] = [
  { id: "1", nombre: "Proc A — Ordinario", fuero: "Civil", expedientesAsociados: 7 },
  { id: "2", nombre: "Proc B — Sumarísimo", fuero: "Comercial", expedientesAsociados: 4 },
  { id: "3", nombre: "Proc C — Ejecutivo", fuero: "Laboral", expedientesAsociados: 2 },
];
