"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Folder,
  Gauge,
  Calendar,
  Users,
  DollarSign,
  Scale,
  ListPlus,
  Building2,
  CreditCard,
  ChevronsLeft,
  ChevronsRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Mismos 8 ítems y mismo orden que mockups/*.html (sidebar-nav).
// Dashboard usa un medidor (Gauge), que representa mejor un tablero que una casa.
const NAV_ITEMS: NavItem[] = [
  { href: "/expedientes", label: "Expedientes", icon: Folder },
  { href: "/dashboard", label: "Dashboard", icon: Gauge },
  { href: "/calendario", label: "Calendario", icon: Calendar },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/honorarios", label: "Honorarios", icon: DollarSign },
  { href: "/fueros", label: "Fueros", icon: Scale },
  { href: "/procesos", label: "Procesos", icon: ListPlus },
  // TODO: falta pantalla de Estudio (datos del despacho, equipo). Por ahora
  // sólo el link, como el resto de los ítems aún no implementados.
  { href: "/estudio", label: "Estudio", icon: Building2 },
  { href: "/suscripcion", label: "Suscripción", icon: CreditCard },
];

/**
 * Sidebar colapsable, migrada de los componentes CSidebar* de CoreUI a markup
 * plano + Tailwind. La lógica de ancho (hover/fijado) es la misma de antes y se
 * apoya en las clases estructurales .briefly-sidebar-slot / .briefly-sidebar
 * (definidas en globals.css):
 *   - pinned:  el usuario fijó el menú con el botón de abajo (siempre expandido).
 *   - hovered: el mouse está sobre el panel.
 * expanded = pinned || hovered decide el ancho; el SLOT también se ensancha, así
 * el contenido se DESPLAZA a la derecha (push) en vez de quedar tapado.
 */
export function Sidebar() {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  const expanded = pinned || hovered;

  return (
    <div className={`briefly-sidebar-slot${expanded ? " is-expanded" : ""}`}>
      <aside
        className={cn(
          "briefly-sidebar flex flex-col border-r border-white/10 bg-(--color-bg-page)",
          expanded ? "is-expanded" : "is-collapsed"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Marca */}
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b border-white/10",
            expanded ? "px-4" : "justify-center px-2"
          )}
        >
          <span className="text-base font-semibold tracking-wide text-(--color-text-primary)">
            {expanded ? "Briefly" : "B"}
          </span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-hidden py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.href) ?? false;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "mx-2 my-0.5 flex items-center rounded-md py-2.5 text-sm no-underline transition-colors",
                  expanded ? "gap-3 px-3" : "justify-center px-0",
                  isActive
                    ? "bg-(--color-accent) text-white"
                    : "text-(--color-text-secondary) hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary)"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {expanded && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle de fijado */}
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-t border-white/10",
            expanded ? "justify-end px-3" : "justify-center px-2"
          )}
        >
          <button
            type="button"
            className="briefly-sidebar-toggle"
            onClick={() => setPinned((prev) => !prev)}
            title={pinned ? "Desfijar menú" : "Fijar menú expandido"}
            aria-label={pinned ? "Desfijar menú" : "Fijar menú expandido"}
            aria-pressed={pinned}
          >
            {pinned ? <ChevronsLeft className="h-4 w-4" /> : <ChevronsRight className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </div>
  );
}
