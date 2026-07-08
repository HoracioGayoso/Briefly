import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

/**
 * Layout compartido por toda página con sidebar (Expedientes, Fueros, y las
 * que se agreguen). Al vivir en un layout de grupo de rutas (no en cada
 * page.tsx) React NO desmonta <Sidebar> al navegar entre rutas del grupo,
 * así su estado local (fijado/expandido por hover) se mantiene. Antes cada
 * page.tsx envolvía su propio contenido con <AppShell>, lo que remontaba el
 * sidebar en cada navegación y reseteaba el pin a su valor inicial.
 *
 * Rutas sin sidebar (ej. /expedientes/nuevo, login, registro) viven fuera de
 * este grupo — el nombre entre paréntesis no agrega segmento a la URL.
 */
export default function AppGroupLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
