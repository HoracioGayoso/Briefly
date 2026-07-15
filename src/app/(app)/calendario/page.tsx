import { CalendarioSection } from "@/components/features/calendario/CalendarioSection";

// Server Component: CalendarioSection (client) ya arma su propio Topbar; acá
// no se envuelve con AppShell (ver src/app/(app)/layout.tsx).
export default function CalendarioPage() {
  return <CalendarioSection />;
}
