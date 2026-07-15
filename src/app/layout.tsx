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
    // h-full + overflow-hidden en html/body: garantiza que NUNCA aparezca un
    // scroll a nivel documento (independiente de <main>, que es el único
    // contenedor pensado para scrollear — ver AppShell). Sin esto, un
    // desborde mínimo del documento podía sumar un segundo scrollbar del
    // navegador pegado al de <main> ("doble scroll" reportado).
    <html lang="es" data-coreui-theme="dark" className="h-full overflow-hidden">
      <body className={`${inter.variable} antialiased h-full overflow-hidden`}>{children}</body>
    </html>
  );
}
