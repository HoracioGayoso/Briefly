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
}

// TODO(etapa 2, RF-12): reemplazar por datos reales desde Supabase
// (listado paginado server-side). Por ahora son datos de ejemplo, igual
// que en el prototipo previo, para poder validar el layout.
export const MOCK_EXPEDIENTES: Expediente[] = [
  {
    id: "EXP-001",
    caratula:
      "Gayoso vs Planiscig: Patentamiento sitio web aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    numeroExpediente: "EXP-001",
    fuero: "Fuero A",
    proceso: "Proc A",
    estado: { label: "Al día", color: "success" },
  },
  {
    id: "EXP-002",
    caratula: "Gayoso vs Planiscig: Patentamiento sitio web",
    numeroExpediente: "EXP-002",
    fuero: "Fuero B",
    proceso: "Proc B",
    estado: { label: "Pendiente", color: "warning" },
  },
  {
    id: "EXP-003",
    caratula: "Gayoso vs Planiscig: Patentamiento sitio web",
    numeroExpediente: "EXP-003",
    fuero: "Fuero C",
    proceso: "Proc C",
    estado: { label: "Urgente", color: "danger" },
  },
  {
    id: "EXP-004",
    caratula: "Gayoso vs Planiscig: Patentamiento sitio web",
    numeroExpediente: "EXP-004",
    fuero: "Fuero D",
    proceso: "Proc D",
    estado: { label: "Inactivo", color: "secondary" },
  },
  {
    id: "EXP-005",
    caratula: "Gayoso vs Planiscig: Patentamiento sitio web",
    numeroExpediente: "EXP-005",
    fuero: "Fuero E",
    proceso: "Proc E",
    estado: { label: "Listo para cobro", color: "info" },
  },
];

export const FUERO_OPTIONS = ["Fuero A", "Fuero B", "Fuero C", "Fuero D", "Fuero E", "Fuero F"];
export const PROCESO_OPTIONS = ["Proc A", "Proc B", "Proc C"];
export const ESTADO_OPTIONS = ["Al día", "Pendiente", "Urgente"];
