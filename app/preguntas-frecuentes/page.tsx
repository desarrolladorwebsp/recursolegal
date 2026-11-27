import { pageMetadata, seoPages } from "../../lib/seo";
import { ContactPanel, EditorialHeading } from "../../components/editorial";
import { SiteShell } from "../../components/site-shell";
import { questions } from "../../lib/resources";

export const metadata = pageMetadata(seoPages.faq);

export default function FaqPage() {
  return (
    <SiteShell current="faq">
      <section className="editorial-section">
        <div className="wrap">
          <EditorialHeading label="Antes de consultar" title="Preguntas frecuentes" />
          <div className="resource-layout faq-layout">
            <div className="faq-list">
              {questions.map(({ title, answer }, index) => (
                <details key={title} className="faq-item" name="preguntas" data-reveal>
                  <summary><span>{index + 1}. {title}</span><span className="faq-toggle" aria-hidden="true" /></summary>
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
