import type { EstadoExpedienteColor } from "@/components/features/expedientes/types";

/** Paleta acotada a los 5 colores semánticos que ya usa toda la app
 * (StatusBadge) — así un tipo de evento creado por el usuario se ve
 * consistente con el resto de Briefly, en vez de sumar colores sueltos. */
export const COLOR_OPTIONS: { value: EstadoExpedienteColor; label: string }[] = [
  { value: "danger", label: "Rojo" },
  { value: "warning", label: "Amarillo" },
  { value: "success", label: "Verde" },
  { value: "info", label: "Celeste" },
  { value: "secondary", label: "Gris" },
];

/** Color sólido por variante, para el círculo de preview estilo Google Calendar
 * (StatusBadge usa "soft tints"; acá necesitamos el color plano). */
export const COLOR_DOT_CLASS: Record<EstadoExpedienteColor, string> = {
  danger: "bg-rose-500",
  warning: "bg-amber-500",
  success: "bg-emerald-500",
  info: "bg-sky-500",
  secondary: "bg-slate-400",
};

export interface TipoEvento {
  id: string;
  nombre: string;
  color: EstadoExpedienteColor;
}

/** Tipos por defecto, editables/eliminables por el usuario (ver
 * TiposEventoModal) — no son fijos como antes. */
export const DEFAULT_TIPOS_EVENTO: TipoEvento[] = [
  { id: "vencimiento", nombre: "Vencimiento procesal", color: "danger" },
  { id: "audiencia", nombre: "Audiencia", color: "warning" },
  { id: "tarea", nombre: "Tarea propia", color: "success" },
];

/**
 * Espejo del modelo real (ver Briefly_Arquitectura_Backend_v2.docx, entidad
 * "Vencimiento" y RF-33/RF-40): estado pendiente/cumplido, y googleEventId
 * como puente con el evento espejo en Google Calendar cuando el abogado
 * conectó su cuenta (login con Google = mismo consentimiento OAuth para
 * Calendar/Gmail, sync bidireccional vía webhook). Acá `googleEventId` sólo
 * se modela (queda null en todos los mocks); la sync real es etapa 2.
 */
export interface Vencimiento {
  id: string;
  descripcion: string;
  /** Referencia display "EXP-001 · Carátula" (etapa 2: FK real), vacío = sin expediente asociado. */
  expediente: string;
  /** ISO YYYY-MM-DD. */
  fecha: string;
  /** FK a TipoEvento.id (tipos definidos por el usuario, ver DEFAULT_TIPOS_EVENTO). */
  tipoId: string;
  estado: "pendiente" | "cumplido";
  notificar: boolean;
  /** Id del evento espejo en Google Calendar; null = no sincronizado (etapa 2, RF-40). */
  googleEventId: string | null;
}

function hoyMasDias(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

// TODO(etapa 2, RF-10/RF-33): reemplazar por datos reales desde Supabase.
// Datos de ejemplo relativos a "hoy" (no fechas fijas) para que el mes actual
// y "Próximos 7 días" siempre tengan contenido, igual que mockups/calendario.html.
export const MOCK_VENCIMIENTOS: Vencimiento[] = [
  {
    id: "1",
    descripcion: "Contestar demanda",
    expediente: "EXP-003 · Rodríguez SA c/ AFIP s/ Repetición",
    fecha: hoyMasDias(0),
    tipoId: "vencimiento",
    estado: "pendiente",
    notificar: true,
    googleEventId: null,
  },
  {
    id: "2",
    descripcion: "Audiencia conciliatoria",
    expediente: "EXP-002 · Fernández, María c/ Obra Social s/ Amparo",
    fecha: hoyMasDias(4),
    tipoId: "audiencia",
    estado: "pendiente",
    notificar: false,
    googleEventId: null,
  },
  {
    id: "3",
    descripcion: "Vencimiento traslado",
    expediente: "EXP-005 · López, Carlos c/ Empleador SRL s/ Despido",
    fecha: hoyMasDias(6),
    tipoId: "vencimiento",
    estado: "pendiente",
    notificar: true,
    googleEventId: null,
  },
  {
    id: "4",
    descripcion: "Entrega de informe a cliente",
    expediente: "",
    fecha: hoyMasDias(12),
    tipoId: "tarea",
    estado: "pendiente",
    notificar: false,
    googleEventId: null,
  },
];
