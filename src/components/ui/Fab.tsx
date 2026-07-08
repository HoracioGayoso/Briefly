"use client";

// CIcon usa hooks internamente (useState), por eso este componente necesita
// ser un Client Component: si se renderiza CIcon directo desde un Server
// Component (como era antes, importado en expedientes/page.tsx) Next tira
// "useState only works in Client Components". Se resuelve el ícono acá
// adentro para que el resto de la página pueda seguir siendo Server.
import Link from "next/link";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";

interface FabProps {
  /** Navega a una página aparte de alta (ej. Expedientes → /expedientes/nuevo). */
  href?: string;
  /** Abre una modal de alta en la propia pantalla (ej. Fueros, Procesos). */
  onClick?: () => void;
  title: string;
  /** Ícono de @coreui/icons (array cil*). Por defecto "+". */
  icon?: string[];
}

/**
 * Botón flotante de alta (fixed, abajo a la derecha). Patrón único para
 * "agregar elemento" en toda la app — ver mockups/components.html. Es el
 * MISMO componente para las dos variantes de alta que existen hoy: navegar a
 * una página propia (`href`) o abrir una modal sobre el listado (`onClick`),
 * para no repetir un botón rectangular distinto en el Topbar de cada
 * pantalla (ver mockups/fueros.html y mockups/procesos.html, que ya usan
 * este mismo FAB con `data-modal-open` en vez de `href`).
 */
// Sólo la clase .fab: combinarla con .btn/.btn-info de CoreUI hacía que su
// border-radius/padding ganara la cascada y el botón dejara de verse
// circular. .fab ya trae su propio color de fondo (ver globals.css).
export function Fab({ href, onClick, title, icon = cilPlus }: FabProps) {
  const iconEl = <CIcon icon={icon} size="xl" style={{ color: "white" }} />;

  if (href) {
    return (
      <Link href={href} className="fab" title={title} aria-label={title}>
        {iconEl}
      </Link>
    );
  }

  return (
    <button type="button" className="fab" title={title} aria-label={title} onClick={onClick}>
      {iconEl}
    </button>
  );
}
