import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

/**
 * Shell de layout para toda página autenticada: sidebar + área de contenido.
 * El Topbar de cada página se renderiza dentro de `children`, como primer
 * elemento, porque su título y acciones contextuales son propios de cada
 * página (ver mockups: el topbar vive dentro de <main>, no en el shell).
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 md:p-6 w-full min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
