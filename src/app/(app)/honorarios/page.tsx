import { HonorariosSection } from "@/components/features/honorarios/HonorariosSection";

// Server Component: HonorariosSection (client) ya arma su propio Topbar; acá
// no se envuelve con AppShell (ver src/app/(app)/layout.tsx).
export default function HonorariosPage() {
  return <HonorariosSection />;
}
