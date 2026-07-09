import Link from "next/link";
import { Plus } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { ExpedientesView } from "@/components/features/expedientes/ExpedientesView";
import { buttonVariants } from "@/components/ui/button";

// Server Component: el sidebar ya no se envuelve acá (ver src/app/(app)/layout.tsx),
// así no se remonta al navegar entre páginas del grupo.
export default function ExpedientesPage() {
  return (
    <ExpedientesView
      header={
        <Topbar
          title="Expedientes"
          actions={
            <Link href="/expedientes/nuevo" className={buttonVariants()}>
              <Plus className="h-4 w-4" />
              Nuevo expediente
            </Link>
          }
        />
      }
    />
  );
}
