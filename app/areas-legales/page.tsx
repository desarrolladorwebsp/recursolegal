import { pageMetadata, seoPages } from "../../lib/seo";
import { InstitutionDirectory } from "../../components/institution-directory";
import { PracticeCards } from "../../components/practice-cards";
import { Subhero } from "../../components/section-heading";
import { SiteShell } from "../../components/site-shell";

export const metadata = pageMetadata(seoPages.practices);

export default function PracticePage() {
  return (
    <SiteShell current="areas">
      <Subhero variant="areas" label="Nuestras áreas" title="Una estrategia para cada desafío." description="Cada asunto requiere análisis, preparación y una respuesta jurídica construida a su medida." />
      <PracticeCards />
      <InstitutionDirectory />
    </SiteShell>
  );
}
