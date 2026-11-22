import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function config(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      devIndicators: false,
      async rewrites() {
        return [
          { source: "/index.html", destination: "/" },
          { source: "/areas-legales.html", destination: "/areas-legales" },
          { source: "/nosotros.html", destination: "/nosotros" },
          { source: "/preguntas-frecuentes.html", destination: "/preguntas-frecuentes" },
          { source: "/noticias.html", destination: "/noticias" },
          { source: "/noticias/:slug.html", destination: "/noticias/:slug" },
          { source: "/privacidad.html", destination: "/privacidad" },
          { source: "/normativas.html", destination: "/normativas" },
        ];
      },
    };
  }

  const previewPath = process.env.RECURSO_LEGAL_PREVIEW_PATH;

  return previewPath
    ? {
        output: "export",
        trailingSlash: false,
        basePath: previewPath,
        distDir: "out-preview-site",
        env: { NEXT_PUBLIC_RECURSO_BASE_PATH: previewPath },
      }
    : { output: "export", trailingSlash: false };
}
