import type { Metadata } from "next";
import { site } from "../../lib/site";
import { DefenseStory, GoogleReviews } from "../../components/defense-story";
import { TeamCards } from "../../components/practice-sections";
import { Subhero } from "../../components/section-heading";
import { SiteShell } from "../../components/site-shell";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce el enfoque de asesoría y defensa jurídica de Recurso Legal.",
  alternates: { canonical: `${site.url}/nosotros.html` },
};

export default function AboutPage() {
  return (
    <SiteShell current="about">
      <Subhero variant="about" label="Recurso Legal" title="Soluciones jurídicas cercanas, oportunas y de calidad" description="Recurso Legal es un estudio jurídico con un enfoque estratégico, riguroso y cercano. Escuchamos las circunstancias de cada caso para orientar los pasos a seguir." />
      <TeamCards />
      <DefenseStory />
      <GoogleReviews />
    </SiteShell>
  );
}
