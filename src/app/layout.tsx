import type { Metadata } from "next";
import { Inter } from "next/font/google";
// CoreUI ahora se importa DENTRO de globals.css con `layer(coreui)` (capa de
// baja prioridad), no acá, así las utilidades de Tailwind le ganan en la cascada.
// Nuestras clases .briefly-* siguen sin capa, por lo que también le ganan.
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
