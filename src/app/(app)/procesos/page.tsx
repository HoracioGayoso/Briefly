import { ProcesosSection } from "@/components/features/procesos/ProcesosSection";

// Server Component: ProcesosSection (client) ya arma su propio Topbar; acá no
// se envuelve con AppShell (ver src/app/(app)/layout.tsx).
export default function ProcesosPage() {
  return <ProcesosSection />;
}
