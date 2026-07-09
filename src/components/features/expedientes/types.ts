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
  archivado?: boolean;
}

export const FUERO_OPTIONS = ["Fuero A", "Fuero B", "Fuero C", "Fuero D", "Fuero E", "Fuero F"];
export const PROCESO_OPTIONS = ["Proc A", "Proc B", "Proc C"];
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
    archivado: i % 7 === 6,
  };
});
