import type { Metadata } from "next";
import { ContactPanel, EditorialHeading } from "../../components/editorial";
import { SiteShell } from "../../components/site-shell";
import { questions } from "../../lib/resources";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Primera consulta, reuniones virtuales y honorarios de Recurso Legal.",
  alternates: { canonical: `${site.url}/preguntas-frecuentes.html` },
};

export default function FaqPage() {
  return (
    <SiteShell current="faq">
      <section className="editorial-section">
        <div className="wrap">
          <EditorialHeading label="Antes de consultar" title="Preguntas frecuentes." />
          <div className="resource-layout faq-layout">
            <div className="faq-list">
              {questions.map(({ title, answer }) => (
                <details key={title} className="faq-item" name="preguntas" data-reveal>
                  <summary><span>{title}</span><span className="faq-toggle" aria-hidden="true" /></summary>
                  <p className="faq-answer">{answer}</p>
                </details>
              ))}
            </div>
            <ContactPanel />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
