import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "../lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Estudio jurídico | Recurso Legal", template: "%s | Recurso Legal" },
  description: "Recurso Legal ofrece asesoría y defensa jurídica para personas, empresas e instituciones.",
  robots: process.env.NEXT_PUBLIC_RECURSO_BASE_PATH
    ? { index: false, follow: false, noarchive: true }
    : undefined,
};

export const viewport: Viewport = { themeColor: site.themeColor };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es-CL"><body>{children}</body></html>;
}
