"use client";

import { useState } from "react";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell } from "@coreui/icons";

interface Notification {
  id: string;
  text: string;
  seen: boolean;
}

// TODO(etapa 2, RF-27 a RF-29): reemplazar por datos reales vía Supabase
// Realtime. Por ahora son datos de ejemplo, igual que en el prototipo previo.
const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: "n1", text: "Nuevo expediente agregado", seen: false },
  { id: "n2", text: "Expediente EXP-002 actualizado", seen: false },
  { id: "n3", text: "Revisión pendiente de expediente EXP-003", seen: true },
];

export function NotifBell() {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const unseenCount = notifications.filter((n) => !n.seen).length;

  const markAsSeen = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, seen: true } : n)));
  };

  // Sin variant="nav-item": ese variant hace que CDropdownToggle renderice
  // un <a href="#"> en vez de un <button>, lo que rompía la campana
  // (subrayado de link, salto de página al hacer click, etc.).
  return (
    <CDropdown alignment="end">
      <CDropdownToggle caret={false} className="notif-bell-btn" title="Notificaciones">
        <CIcon icon={cilBell} size="xl" />
        {unseenCount > 0 && <span className="notif-badge">{unseenCount}</span>}
      </CDropdownToggle>
      <CDropdownMenu style={{ width: 320 }}>
        <CDropdownHeader>Notificaciones</CDropdownHeader>
        {notifications.map((n) => (
          <CDropdownItem
            key={n.id}
            as="button"
            type="button"
            className="notif-item-text"
            onClick={() => markAsSeen(n.id)}
            active={!n.seen}
          >
            {n.text}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  );
}
