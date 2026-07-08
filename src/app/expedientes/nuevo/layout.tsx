import type React from "react";

// Página de alta standalone, sin sidebar ni topbar — igual que
// mockups/expediente-nuevo.html (formulario centrado a pantalla completa).
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col overflow-auto">{children}</div>;
}