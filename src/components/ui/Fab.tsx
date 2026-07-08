import Link from "next/link";
import { Plus, type LucideIcon } from "lucide-react";

interface FabProps {
  /** Navega a una página aparte de alta (ej. Expedientes → /expedientes/nuevo). */
  href?: string;
  /** Abre una modal de alta en la propia pantalla (ej. Fueros, Procesos). */
  onClick?: () => void;
  title: string;
  /** Ícono de lucide-react. Por defecto "+". */
  icon?: LucideIcon;
}

/**
 * Botón flotante de alta (fixed, abajo a la derecha). Patrón único para
 * "agregar elemento" en toda la app — ver mockups/components.html. Es el
 * MISMO componente para las dos variantes de alta que existen hoy: navegar a
 * una página propia (`href`) o abrir una modal sobre el listado (`onClick`).
 */
// Sólo la clase .fab: combinarla con .btn/.btn-info de CoreUI hacía que su
// border-radius/padding ganara la cascada y el botón dejara de verse circular.
// .fab ya trae su propio color de fondo y color de texto blanco (ver globals.css).
export function Fab({ href, onClick, title, icon: Icon = Plus }: FabProps) {
  const iconEl = <Icon className="h-6 w-6" />;

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
