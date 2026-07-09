"use client";

import { User, Bell, KeyRound, Monitor, Palette, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  userName?: string;
  userEmail?: string;
  userInitials?: string;
}

/**
 * Menú del usuario (avatar del Topbar). En vez de un "Configuración" genérico
 * que agruparía muy pocas opciones, cada preferencia va como ítem propio
 * (Notificaciones, Cambiar contraseña, Sesiones activas). Apariencia todavía
 * no está implementada: aparece deshabilitada con un tag "Soon".
 * TODO(etapa 2): cablear las acciones reales (perfil, notificaciones, cambio
 * de contraseña, sesiones activas, logout — todo contra Supabase Auth).
 */
export function UserMenu({
  userName = "Horacio Gayoso",
  userEmail = "horaciogayoso9@gmail.com",
  userInitials = "HG",
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Menú de usuario"
        className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)/40"
      >
        <Avatar title="Mi cuenta" className="h-11 w-11 cursor-pointer text-base">
          {userInitials}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="px-2 py-1.5">
          <p className="truncate text-sm font-medium text-(--color-text-primary)">{userName}</p>
          <p className="truncate text-xs text-(--color-text-secondary)">{userEmail}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User className="h-4 w-4" />
          Editar perfil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="h-4 w-4" />
          Notificaciones
        </DropdownMenuItem>
        <DropdownMenuItem>
          <KeyRound className="h-4 w-4" />
          Cambiar contraseña
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Monitor className="h-4 w-4" />
          Sesiones activas
        </DropdownMenuItem>
        <DropdownMenuItem disabled className="justify-between">
          <span className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Apariencia
          </span>
          <span className="rounded-full bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-medium text-sky-300">
            Soon
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="briefly-menu-item-danger">
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
