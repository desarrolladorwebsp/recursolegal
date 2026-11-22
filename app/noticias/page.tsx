import type { Metadata } from "next";
import { EditorialHeading, GuideCards } from "../../components/editorial";
import { SiteShell } from "../../components/site-shell";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Noticias jurídicas",
  description: "Guías prácticas de Recurso Legal sobre reclamos, trabajo y derechos del consumidor.",
  alternates: { canonical: `${site.url}/noticias.html` },
};

export default function NewsPage() {
  return (
    <SiteShell current="news">
      <section className="editorial-section">
        <div className="wrap">
          <EditorialHeading title="Noticias jurídicas" intro="Guías para ordenar antecedentes y entender los primeros pasos ante un problema jurídico en Chile." />
          <GuideCards />
        </div>
      </section>
    </SiteShell>
  );
}
