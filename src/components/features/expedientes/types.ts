export type EstadoExpedienteColor = "success" | "warning" | "danger" | "secondary" | "info";

export interface EstadoExpediente {
  label: string;
  color: EstadoExpedienteColor;
}

export interface Expediente {
  id: string;
  caratula: string;
  numeroExpediente: string;
  fuero: string;
  proceso: string;
  estado: EstadoExpediente;
  /** Fecha de creación en ISO (YYYY-MM-DD). Ordenable; por defecto se ordena
   * del más nuevo al más viejo. */
  fechaCreacion: string;
  archivado?: boolean;
}

export const FUERO_OPTIONS = [
  "Civil",
  "Comercial",
  "Laboral",
  "Familia",
  "Penal",
  "Contencioso administrativo",
];
export const PROCESO_OPTIONS = ["Ordinario", "Ejecutivo", "Sumarísimo"];
export const ESTADO_OPTIONS = ["Al día", "Pendiente", "Urgente", "Inactivo", "Listo para cobro"];

const ESTADOS: EstadoExpediente[] = [
  { label: "Al día", color: "success" },
  { label: "Pendiente", color: "warning" },
  { label: "Urgente", color: "danger" },
  { label: "Inactivo", color: "secondary" },
  { label: "Listo para cobro", color: "info" },
];

const CARATULAS = [
  "Gayoso c/ Planiscig s/ Daños y perjuicios",
  "Fernández, María c/ Obra Social s/ Amparo",
  "Rodríguez SA c/ AFIP s/ Repetición",
  "Sucesión de Juan Pérez",
  "López, Carlos c/ Empleador SRL s/ Despido",
  "Consorcio Av. Rivadavia 1234 c/ García s/ Ejecución de expensas",
  "Martínez, Ana s/ Divorcio",
  "Industrias del Sur SA c/ Proveedora Norte SA s/ Ordinario",
  "Gómez, Pedro c/ Aseguradora s/ Cumplimiento de contrato",
  "Torres, Lucía c/ Municipalidad s/ Contencioso administrativo",
];

// Fechas de creación de ejemplo: distintas y en desorden respecto del número de
// expediente (para que ordenar por fecha se note). ISO YYYY-MM-DD.
const BASE = Date.UTC(2025, 4, 28); // 28 may 2025
function fechaAt(i: number): string {
  const days = i * 4 + ((i * 13) % 9);
  return new Date(BASE - days * 86_400_000).toISOString().slice(0, 10);
}

// TODO(etapa 2, RF-12): reemplazar por datos reales desde Supabase (listado
// paginado server-side). Se generan ~24 registros de ejemplo para que la
// paginación, el orden y el contador tengan sentido en el prototipo.
export const MOCK_EXPEDIENTES: Expediente[] = Array.from({ length: 24 }, (_, i) => {
  const n = i + 1;
  return {
    id: `EXP-${String(n).padStart(3, "0")}`,
    caratula: CARATULAS[i % CARATULAS.length],
    numeroExpediente: `EXP-${String(n).padStart(3, "0")}`,
    fuero: FUERO_OPTIONS[i % FUERO_OPTIONS.length],
    proceso: PROCESO_OPTIONS[i % PROCESO_OPTIONS.length],
    estado: ESTADOS[i % ESTADOS.length],
    fechaCreacion: fechaAt(i),
    archivado: i % 7 === 6,
  };
});
