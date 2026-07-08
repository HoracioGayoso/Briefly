import { FuerosSection } from "@/components/features/fueros/FuerosSection";

// Server Component: FuerosSection (client) ya arma su propio Topbar; acá no
// se envuelve con AppShell (ver src/app/(app)/layout.tsx).
export default function FuerosPage() {
  return <FuerosSection />;
}
