import type { EstadoExpedienteColor } from "@/components/features/expedientes/types";

export type EstadoHonorario = "Pendiente" | "Cobrado" | "Sin rendir";

export const ESTADO_HONORARIO_OPTIONS: EstadoHonorario[] = ["Pendiente", "Cobrado", "Sin rendir"];

export const ESTADO_HONORARIO_COLOR: Record<EstadoHonorario, EstadoExpedienteColor> = {
  Pendiente: "warning",
  Cobrado: "success",
  "Sin rendir": "secondary",
};

export interface Honorario {
  id: string;
  /** Referencia display "EXP-001 · Planiscig S.R.L." (etapa 2: FK real). */
  expediente: string;
  concepto: string;
  /** Monto en ARS, sin formatear (se formatea al mostrar). */
  monto: number;
  /** ISO YYYY-MM-DD. */
  fecha: string;
  estado: EstadoHonorario;
}

export function formatMonto(monto: number): string {
  return `$ ${monto.toLocaleString("es-AR")}`;
}

// TODO(etapa 2, RF-10): reemplazar por datos reales desde Supabase, ligados a
// expedientes reales. Datos de ejemplo, igual que mockups/honorarios.html.
export const MOCK_HONORARIOS: Honorario[] = [
  {
    id: "1",
    expediente: "EXP-001 · Planiscig S.R.L.",
    concepto: "Honorarios primera instancia",
    monto: 250000,
    fecha: "2026-06-01",
    estado: "Pendiente",
  },
  {
    id: "2",
    expediente: "EXP-002 · Fernández, María",
    concepto: "Honorarios por acuerdo",
    monto: 1250000,
    fecha: "2026-03-15",
    estado: "Cobrado",
  },
  {
    id: "3",
    expediente: "EXP-003 · Industrias del Sur SA",
    concepto: "Gastos de diligenciamiento",
    monto: 32000,
    fecha: "2026-05-20",
    estado: "Sin rendir",
  },
  {
    id: "4",
    expediente: "EXP-001 · Planiscig S.R.L.",
    concepto: "Honorarios segunda instancia",
    monto: 230000,
    fecha: "2026-06-10",
    estado: "Pendiente",
  },
];
