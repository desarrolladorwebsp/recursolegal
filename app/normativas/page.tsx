import type { Metadata } from "next";
import { ContactPanel, EditorialHeading } from "../../components/editorial";
import { SiteShell } from "../../components/site-shell";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Normativas y aviso legal",
  description: "Alcance de los recursos jurídicos de Recurso Legal y acceso a normativa chilena.",
  alternates: { canonical: `${site.url}/normativas.html` },
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <SiteShell current="legal">
      <section className="editorial-section">
        <div className="wrap">
          <EditorialHeading title="Normativas y aviso legal" intro="Alcance de las publicaciones del estudio y enlaces para consultar legislación chilena." />
          <div className="resource-layout">
            <div className="editorial-prose">
              <p className="editorial-note">Borrador para revisión del estudio antes de publicar.</p>
              <section>
                <h2>Alcance de la información</h2>
                <p>Las guías son de carácter general. La orientación sobre un caso requiere revisar sus circunstancias, antecedentes y plazos. Las publicaciones y ejemplos no garantizan un resultado.</p>
              </section>
              <section>
                <h2>Organismos y normativa</h2>
                <p>Los enlaces a instituciones públicas ayudan a encontrar sus trámites y canales oficiales. Recurso Legal no está afiliado a esos organismos.</p>
                <p><a href="https://www.bcn.cl/leychile/">Consultar LeyChile · Biblioteca del Congreso Nacional</a></p>
              </section>
              <section>
                <h2>Identificación del prestador</h2>
                <p>El aviso definitivo se completará con la identificación del prestador y las condiciones aplicables a la contratación de servicios.</p>
              </section>
            </div>
            <ContactPanel />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
