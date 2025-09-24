"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Table } from "@/components/Table";
import { Filters } from "@/components/Filter";
import CIcon from "@coreui/icons-react";
import { cilBell } from "@coreui/icons";

interface Notification {
  id: string;
  text: string;
  seen: boolean;
}

export default function Home() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "n1", text: "Nuevo expediente agregado", seen: false },
    { id: "n2", text: "Expediente #123 actualizado", seen: false },
    { id: "n3", text: "Revisión pendiente de expediente #456", seen: false },
  ]);

  const markAsSeen = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, seen: true } : n))
    );
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col p-8 w-full h-screen">
        {/* Header con título e ícono de notificaciones */}
        <div className="flex items-center justify-between mb-4 relative">
          <h1 className="text-2xl font-bold">Expedientes</h1>

          {/* Contenedor del ícono */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenNotifications(!openNotifications)}
            >
              <CIcon
                icon={cilBell}
                className="text-gray-700"
                style={{ width: "40px", height: "40px" }}
              />
              {notifications.some((n) => !n.seen) && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-lg font-bold 
                rounded-full w-6 h-6 flex items-center justify-center">
                  {notifications.filter((n) => !n.seen).length}
                </span>
              )}
            </button>

            {/* Dropdown de notificaciones */}
            {openNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-white-200 rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <ul className="max-h-48 overflow-y-auto p-0 m-0">
                    {notifications.map((n) => (
                      // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                      <li
                        key={n.id}
                        onClick={() => markAsSeen(n.id)}
                        className="flex items-center px-2 py-1 rounded cursor-pointer mb-2 last:mb-0 transition-colors 
                        duration-200 hover:border border-[#3d99f5] text-white"
                      >
                        {/* Punto al inicio */}
                        <span
                          className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${n.seen ? "bg-white" : "bg-[#3d99f5]"
                            }`}
                        ></span>
                        {n.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <Filters />

        {/* Contenedor que ocupa todo el alto restante */}
        <div className="flex-1 w-full rounded-xl border border-white-200 p-0 shadow-sm flex flex-col">
          <Table />
        </div>
      </main>
    </div>
  );
}
