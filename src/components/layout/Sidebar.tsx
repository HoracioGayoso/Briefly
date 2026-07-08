"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilFolder,
  cilHome,
  cilCalendar,
  cilPeople,
  cilDollar,
  cilBalanceScale,
  cilPlaylistAdd,
  cilCreditCard,
  cilChevronDoubleLeft,
  cilChevronDoubleRight,
} from "@coreui/icons";

interface NavItem {
  href: string;
  label: string;
  icon: string[];
}

// Mismos 8 ítems y mismo orden que mockups/*.html (sidebar-nav).
const NAV_ITEMS: NavItem[] = [
  { href: "/expedientes", label: "Expedientes", icon: cilFolder },
  { href: "/dashboard", label: "Dashboard", icon: cilHome },
  { href: "/calendario", label: "Calendario", icon: cilCalendar },
  { href: "/clientes", label: "Clientes", icon: cilPeople },
  { href: "/honorarios", label: "Honorarios", icon: cilDollar },
  { href: "/fueros", label: "Fueros", icon: cilBalanceScale },
  { href: "/procesos", label: "Procesos", icon: cilPlaylistAdd },
  { href: "/suscripcion", label: "Suscripción", icon: cilCreditCard },
];

export function Sidebar() {
  // Dos estados independientes controlan el ancho, de forma 100% determinista
  // (sin depender del prop `unfoldable` de CoreUI ni de sus reglas dentro de
  // @media, que sólo colapsaban ≥992px y dejaban el texto cortado por debajo):
  //   - pinned:  el usuario fijó el menú con el botón de abajo. Fijado ⇒
  //     siempre expandido y el contenido se corre a su derecha (reserva 16rem).
  //   - hovered: el mouse está sobre el panel. Sin fijar, la posición natural
  //     es angosta (4rem, sólo íconos); al hacer hover se expande COMO OVERLAY
  //     sobre el contenido (el slot sigue midiendo 4rem, así el contenido no
  //     salta cada vez que uno roza la barra).
  // expanded = pinned || hovered  → decide el ancho (íconos+texto vs sólo
  // íconos) y, como el slot también se ensancha con expanded, el contenido se
  // desplaza a la derecha (push) tanto al fijar como al hacer hover.
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  const expanded = pinned || hovered;

  return (
    <div className={`briefly-sidebar-slot${expanded ? " is-expanded" : ""}`}>
      <CSidebar
        className={`briefly-sidebar border-end ${expanded ? "is-expanded" : "is-collapsed"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CSidebarHeader className="border-bottom">
          <CSidebarBrand className="text-base font-semibold tracking-wide">
            {expanded ? "Briefly" : "B"}
          </CSidebarBrand>
        </CSidebarHeader>

        <CSidebarNav>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.href) ?? false;
            return (
              <CNavItem key={item.href}>
                <CNavLink as={Link} href={item.href} active={isActive} title={item.label}>
                  <CIcon icon={item.icon} customClassName="nav-icon" />
                  {/* El label se oculta con `display:none` en modo angosto
                      (clase .is-collapsed en el panel), así el texto desaparece
                      limpio en vez de quedar recortado por overflow. */}
                  <span className="nav-label">{item.label}</span>
                </CNavLink>
              </CNavItem>
            );
          })}
        </CSidebarNav>

        <CSidebarHeader className="border-top">
          <button
            type="button"
            className="briefly-sidebar-toggle"
            onClick={() => setPinned((prev) => !prev)}
            title={pinned ? "Desfijar menú" : "Fijar menú expandido"}
            aria-label={pinned ? "Desfijar menú" : "Fijar menú expandido"}
            aria-pressed={pinned}
          >
            <CIcon icon={pinned ? cilChevronDoubleLeft : cilChevronDoubleRight} size="sm" />
          </button>
        </CSidebarHeader>
      </CSidebar>
    </div>
  );
}
