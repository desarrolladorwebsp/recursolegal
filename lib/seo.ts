import type { Metadata } from "next";
import { site, socials } from "./site";

const siteName = "Recurso Legal";
export const homeTitle = "Estudio jurídico en Santiago";
export const isPreview = Boolean(process.env.NEXT_PUBLIC_RECURSO_BASE_PATH);

type SeoPage = {
  path: `/${string}`;
  title: string;
  description: string;
  index?: boolean;
  type?: "website" | "article";
};

export const seoPages = {
  home: {
    path: "/",
    title: homeTitle,
    description: "Estudio jurídico en Santiago de Chile. Recurso Legal ofrece asesoría y defensa jurídica a personas, empresas e instituciones.",
  },
  practices: {
    path: "/areas-legales.html",
    title: "Áreas legales",
    description: "Conoce las siete áreas de asesoría y defensa jurídica de Recurso Legal, de derecho laboral y familia a empresas y defensa institucional.",
  },
  about: {
    path: "/nosotros.html",
    title: "Nosotros",
    description: "Conoce el enfoque de asesoría y defensa jurídica de Recurso Legal, estudio jurídico en Santiago de Chile.",
  },
  faq: {
    path: "/preguntas-frecuentes.html",
    title: "Preguntas frecuentes",
    description: "Resuelve dudas sobre la primera consulta, las reuniones y los honorarios del estudio jurídico Recurso Legal.",
  },
  news: {
    path: "/noticias.html",
    title: "Noticias jurídicas",
    description: "Guías prácticas de Recurso Legal sobre reclamos, trabajo y derechos del consumidor en Chile.",
  },
  privacy: {
    path: "/privacidad.html",
    title: "Política de privacidad",
    description: "Cómo funcionan los canales de contacto y servicios externos de Recurso Legal.",
    index: false,
  },
  legal: {
    path: "/normativas.html",
    title: "Normativas y aviso legal",
    description: "Alcance de los recursos jurídicos de Recurso Legal y acceso a normativa chilena.",
    index: false,
  },
} satisfies Record<string, SeoPage>;

export function absoluteUrl(path: `/${string}`) {
  return new URL(path, site.url).href;
}

export function guidePath(slug: string): `/noticias/${string}.html` {
  return `/noticias/${slug}.html`;
}

const socialImage = {
  url: absoluteUrl("/assets/recurso-legal-social.jpg"),
  width: 1200,
  height: 630,
  alt: "Recurso Legal · Estudio Jurídico",
};

export function pageMetadata({ path, title, description, type = "website", index = true }: SeoPage): Metadata {
  const canonical = absoluteUrl(path);
  const displayTitle = `${title} | ${siteName}`;

  return {
    title: path === "/" ? { absolute: displayTitle } : title,
    description,
    alternates: { canonical },
    ...(!index && !isPreview ? { robots: { index: false, follow: true } } : {}),
    openGraph: { type, title: displayTitle, description, url: canonical, siteName, locale: "es_CL", images: [socialImage] },
    twitter: { card: "summary_large_image", title: displayTitle, description, images: [{ url: socialImage.url, alt: socialImage.alt }] },
  };
}

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": absoluteUrl("/#estudio"),
      name: siteName,
      url: absoluteUrl("/"),
      description: seoPages.home.description,
      logo: absoluteUrl("/assets/marca-oscura.webp"),
      image: socialImage.url,
      email: site.email,
      telephone: site.phone.href.slice(4),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.location.streetAddress,
        addressLocality: site.location.city,
        addressCountry: "CL",
      },
      sameAs: socials.map(({ href }) => href),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#sitio"),
      name: siteName,
      url: absoluteUrl("/"),
      inLanguage: "es-CL",
      publisher: { "@id": absoluteUrl("/#estudio") },
    },
  ],
};
