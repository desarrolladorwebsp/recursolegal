import { pageMetadata, seoPages } from "../../lib/seo";
import { EditorialHeading, GuideCards } from "../../components/editorial";
import { SiteShell } from "../../components/site-shell";
import { sitePath } from "../../lib/site";

export const metadata = pageMetadata(seoPages.news);

export default function NewsPage() {
  return (
    <SiteShell current="news">
      <section className="editorial-section">
        <div className="wrap">
          <EditorialHeading label="Blog / Recurso Legal" title={<>Blog de noticias <span>jurídicas.</span></>}
            intro="Guías para ordenar antecedentes y entender los primeros pasos ante un problema jurídico en Chile.">
            <a className="button" href={sitePath("/#contacto")}>Contáctanos ahora <span aria-hidden="true">↗</span></a>
          </EditorialHeading>
          <GuideCards />
        </div>
      </section>
    </SiteShell>
  );
}
