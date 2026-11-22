import type { Metadata } from "next";
import { site } from "../../lib/site";
import { InstitutionDirectory } from "../../components/institution-directory";
import { PracticeCards } from "../../components/practice-sections";
import { Subhero } from "../../components/section-heading";
import { SiteShell } from "../../components/site-shell";

export const metadata: Metadata = {
  title: "Áreas legales",
  description: "Conoce las siete áreas de asesoría y defensa jurídica de Recurso Legal.",
  alternates: { canonical: `${site.url}/areas-legales.html` },
};

export default function PracticePage() {
  return (
    <SiteShell current="areas">
      <Subhero variant="areas" title="Áreas legales" description="Asesoría y defensa jurídica para personas, empresas e instituciones." />
      <PracticeCards detailed />
      <InstitutionDirectory />
    </SiteShell>
  );
}
