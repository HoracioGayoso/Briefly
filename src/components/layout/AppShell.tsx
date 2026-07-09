import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

/**
 * Shell de layout para toda página autenticada: sidebar + área de contenido.
 * El Topbar de cada página se renderiza dentro de `children`, como primer
 * elemento, porque su título y acciones contextuales son propios de cada
 * página (ver mockups: el topbar vive dentro de <main>, no en el shell).
 *
 * Shell de altura fija (h-screen + overflow-hidden en el contenedor exterior):
 * <main> es el ÚNICO elemento que scrollea de verdad (overflow-y-auto), no la
 * ventana/documento. Es necesario para que cualquier `position: sticky` DENTRO
 * de <main> (ej. el Topbar+filtros de Expedientes) funcione contra un
 * contenedor que efectivamente scrollea.
 *
 * IMPORTANTE: <main> NO es flex-column. Si lo fuera, con altura fija sus hijos
 * (que quieren ser más altos) se encogerían para entrar, y un hijo con
 * overflow-hidden (el contenedor de la tabla) recortaría las filas en vez de
 * dejar que <main> scrollee. Como bloque normal, las secciones toman su altura
 * natural, desbordan <main> y <main> scrollea.
 *
 * <main> tampoco lleva padding: el padding lo pone cada pantalla. Así una
 * pantalla con encabezado sticky (Expedientes) puede pegarlo AL RAS del tope
 * (top:0), sin el hueco que dejaría el padding-top de <main> — hueco por el que
 * las filas asomaban por encima del header pegado al scrollear.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">{children}</main>
    </div>
  );
}
