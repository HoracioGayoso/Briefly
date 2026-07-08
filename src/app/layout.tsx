import type { Metadata } from "next";
import { Inter } from "next/font/google";
// CoreUI primero, globals.css (Tailwind + tokens/overrides propios) después,
// para que nuestras clases (.fab, .briefly-card, .notif-bell-btn, etc.)
// puedan ganarle en cascada a las de CoreUI cuando compiten por la misma
// propiedad (ej. .btn y .card fuerzan su propio border-radius/flex-direction).
import "@coreui/coreui/dist/css/coreui.min.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Briefly",
  description: "Gestión de casos legales para abogados y estudios jurídicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-coreui-theme="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
