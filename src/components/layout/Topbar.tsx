import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserMenu } from "@/components/layout/UserMenu";
import { NotifBell } from "@/components/ui/NotifBell";
import { InfoTooltip } from "@/components/ui/InfoTooltip";

interface TopbarProps {
  /** Título de la página. Nunca lleva emojis (ver mockups/components.html). */
  title: string;
  /**
   * Texto explicativo opcional de qué es esta pantalla. En vez de un párrafo
   * aparte debajo del Topbar, se muestra como tooltip al hacer hover sobre
   * un ícono de info junto al título (mismo patrón para cualquier página que
   * lo necesite, no sólo Fueros).
   */
  titleInfo?: ReactNode;
  /** Si se pasa, muestra una flecha "volver" a la izquierda del título (ej. en
   * pantallas de detalle/alta que cuelgan de un listado). */
  backHref?: string;
  /** Acciones contextuales opcionales, específicas de la página (botones, etc.). */
  actions?: ReactNode;
  /** Iniciales del usuario logueado para el avatar. */
  userInitials?: string;
}

/**
 * Topbar canónico de Briefly: título → acciones contextuales → campana de
 * notificaciones → avatar. Mismo orden en todas las páginas con sidebar,
 * tengan o no una acción de alta (ver mockups/components.html, sección
 * "Toggler y topbar").
 */
export function Topbar({ title, titleInfo, backHref, actions, userInitials = "HG" }: TopbarProps) {
  return (
    <div className="app-topbar">
      <div className="flex items-center gap-2.5">
        {backHref && (
          <Link
            href={backHref}
            aria-label="Volver"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-(--color-text-secondary) transition-colors hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary)"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        )}
        <h1 className="text-xl font-semibold m-0">{title}</h1>
        {titleInfo && <InfoTooltip content={titleInfo} />}
      </div>
      <div className="app-topbar-actions">
        {actions}
        <NotifBell />
        <UserMenu userInitials={userInitials} />
      </div>
    </div>
  );
}
