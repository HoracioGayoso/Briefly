export type TipoCliente = "Persona física" | "Persona jurídica";

export const TIPO_CLIENTE_OPTIONS: TipoCliente[] = ["Persona física", "Persona jurídica"];

export interface Cliente {
  id: string;
  nombre: string;
  tipo: TipoCliente;
  email: string;
  telefono: string;
  expedientesAsociados: number;
}

function iniciales(nombre: string): string {
  const partes = nombre.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase();
}

export { iniciales };

// TODO(etapa 2, RF-10): reemplazar por datos reales desde Supabase. Datos de
// ejemplo, igual que mockups/clientes.html. La ficha de detalle (tab "Ficha"
// en el mock) queda para una iteración futura — acá sólo listado + alta/edición.
export const MOCK_CLIENTES: Cliente[] = [
  {
    id: "1",
    nombre: "Planiscig S.R.L.",
    tipo: "Persona jurídica",
    email: "contacto@planiscig.com",
    telefono: "+54 11 4444-5555",
    expedientesAsociados: 1,
  },
  {
    id: "2",
    nombre: "María Fernández",
    tipo: "Persona física",
    email: "maria.fernandez@mail.com",
    telefono: "+54 11 5555-1234",
    expedientesAsociados: 2,
  },
  {
    id: "3",
    nombre: "Industrias del Sur SA",
    tipo: "Persona jurídica",
    email: "legales@indsur.com",
    telefono: "+54 341 400-1000",
    expedientesAsociados: 3,
  },
];
