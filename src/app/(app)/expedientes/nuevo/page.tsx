import Link from "next/link";
import { Topbar } from "@/components/layout/Topbar";
import { NuevoExpedienteForm } from "@/components/features/expedientes/NuevoExpedienteForm";
import { Button, buttonVariants } from "@/components/ui/button";

// Alta de expediente dentro del layout (sidebar + topbar), colgando del
// listado. <main> no pone padding (ver AppShell): lo pone la página.
// Cancelar/Guardar viven en el Topbar (misma posición que "Nuevo expediente"
// en el listado); Guardar usa el atributo `form` para enviar el <form> aunque
// esté fuera de él en el DOM.
export default function NuevoExpedientePage() {
  return (
    <div className="p-4 md:p-6">
      <Topbar
        title="Nuevo expediente"
        actions={
          <>
            <Link href="/expedientes" className={buttonVariants({ variant: "outline" })}>
              Cancelar
            </Link>
            <Button type="submit" form="nuevo-expediente-form">
              Guardar expediente
            </Button>
          </>
        }
      />
      <NuevoExpedienteForm />
    </div>
  );
}
