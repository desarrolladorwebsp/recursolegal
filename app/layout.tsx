import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { homeTitle, isPreview, seoPages } from "../lib/seo";
import { site, sitePath } from "../lib/site";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${homeTitle} | Recurso Legal`, template: "%s | Recurso Legal" },
  description: seoPages.home.description,
  icons: {
    icon: [
      { url: sitePath("/assets/recurso-legal-icon.png"), type: "image/png", sizes: "180x180" },
      { url: sitePath("/favicon.ico"), type: "image/x-icon", sizes: "any" },
    ],
    apple: { url: sitePath("/assets/recurso-legal-icon.png"), sizes: "180x180" },
  },
  robots: isPreview
    ? { index: false, follow: false, noarchive: true }
    : undefined,
};

export const viewport: Viewport = { themeColor: site.themeColor };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es-CL"><body>{children}</body></html>;
}
