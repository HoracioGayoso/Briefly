import { Topbar } from "@/components/layout/Topbar";
import { ExpedientesFilters } from "@/components/features/expedientes/ExpedientesFilters";
import { ExpedientesTable } from "@/components/features/expedientes/ExpedientesTable";
import { Fab } from "@/components/ui/Fab";

// Server Component: el sidebar ya no se envuelve acá (ver src/app/(app)/layout.tsx),
// así no se remonta al navegar entre páginas del grupo.
export default function ExpedientesPage() {
  return (
    <>
      <Topbar
        title="Expedientes"
        titleInfo="Administrá tus casos legales: cargá, filtrá y seguí el estado de cada expediente."
      />
      <ExpedientesFilters />
      <ExpedientesTable />
      <Fab href="/expedientes/nuevo" title="Nuevo expediente" />
    </>
  );
}
