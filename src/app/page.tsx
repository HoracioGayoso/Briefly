import { redirect } from "next/navigation";

// La app todavía no tiene un dashboard (etapa 2, RF-36); mientras tanto la
// raíz entra directo al listado de expedientes.
export default function RootPage() {
  redirect("/expedientes");
}
