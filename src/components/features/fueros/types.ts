export interface Fuero {
  id: string;
  nombre: string;
  expedientesAsociados: number;
}

// TODO(etapa 2, RF-10): reemplazar por datos reales desde Supabase (listado +
// alta/edición). Por ahora son datos de ejemplo, igual que en el prototipo
// previo (mockups/fueros.html), para poder validar el layout.
export const MOCK_FUEROS: Fuero[] = [
  { id: "1", nombre: "Fuero A — Civil", expedientesAsociados: 12 },
  { id: "2", nombre: "Fuero B — Comercial", expedientesAsociados: 8 },
  { id: "3", nombre: "Fuero C — Laboral", expedientesAsociados: 5 },
  { id: "4", nombre: "Fuero D — Familia", expedientesAsociados: 3 },
  { id: "5", nombre: "Fuero E — Contencioso Administrativo", expedientesAsociados: 1 },
];
