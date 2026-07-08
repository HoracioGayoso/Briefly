import type { ReactNode } from "react";
import { Avatar } from "@/components/ui/avatar";
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
export function Topbar({ title, titleInfo, actions, userInitials = "HG" }: TopbarProps) {
  return (
    <div className="app-topbar">
      <div className="flex items-center gap-2.5">
        <h1 className="text-2xl font-bold m-0">{title}</h1>
        {titleInfo && <InfoTooltip content={titleInfo} />}
      </div>
      <div className="app-topbar-actions">
        {actions}
        <NotifBell />
        <Avatar title="Mi perfil" className="h-11 w-11 text-base">
          {userInitials}
        </Avatar>
      </div>
    </div>
  );
}
