"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="notif-bell-btn" title="Notificaciones" aria-label="Notificaciones">
        <Bell className="h-6 w-6" />
        {unseenCount > 0 && <span className="notif-badge">{unseenCount}</span>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        {notifications.map((n) => (
          <DropdownMenuItem
            key={n.id}
            onSelect={(e) => {
              e.preventDefault();
              markAsSeen(n.id);
            }}
            className="items-start whitespace-normal"
          >
            {/* Punto de acento = no leída; hueco transparente = leída (mantiene alineación) */}
            <span
              className={cn(
                "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                n.seen ? "bg-transparent" : "bg-(--color-accent)"
              )}
            />
            <span className={cn(n.seen && "text-(--color-text-secondary)")}>{n.text}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
