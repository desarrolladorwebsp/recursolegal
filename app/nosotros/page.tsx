import { pageMetadata, seoPages } from "../../lib/seo";
import { DefenseStory, GoogleReviews } from "../../components/defense-story";
import { TeamCards } from "../../components/practice-sections";
import { Subhero } from "../../components/section-heading";
import { SiteShell } from "../../components/site-shell";

export const metadata = pageMetadata(seoPages.about);

export default function AboutPage() {
  const isPreview = Boolean(process.env.NEXT_PUBLIC_RECURSO_BASE_PATH);

  return (
    <SiteShell current="about">
      <Subhero variant="about" label="Recurso Legal" title="Soluciones jurídicas cercanas, oportunas y de calidad" description="Recurso Legal es un estudio jurídico con un enfoque estratégico, riguroso y cercano. Escuchamos las circunstancias de cada caso para orientar los pasos a seguir." />
      {isPreview && <TeamCards />}
      <DefenseStory />
      {isPreview && <GoogleReviews />}
    </SiteShell>
  );
}
