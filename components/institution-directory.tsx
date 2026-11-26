import { sitePath } from "../lib/site";
import { institutionGroups } from "../lib/resources";

export function InstitutionDirectory() {
  return (
    <section className="institution-section" id="instituciones" aria-labelledby="instituciones-titulo">
      <div className="wrap">
        <div className="directory-intro" data-reveal>
          <p className="section-label">Defensa institucional</p>
          <h2 id="instituciones-titulo">¿Ante qué instituciones <span>podemos orientarte?</span></h2>
        </div>
        <details className="institution-directory">
          <summary className="institution-statement">
            <span>Encuentra el organismo según la materia de tu consulta y accede a su sitio oficial.</span>
            <strong>Explorar instituciones <span aria-hidden="true">↗</span></strong>
          </summary>
          <div className="institution-grid">
            {institutionGroups.map(({ title, items }) => (
              <details className="institution-group" key={title} data-reveal>
                <summary>{title}<span className="faq-toggle" aria-hidden="true" /></summary>
                <ul>
                  {items.map(({ name, topic, href }) => (
                    <li key={name}>
                      <p><strong>{name}</strong><span>{topic}</span></p>
                      <a href={href} aria-label={`Sitio oficial de ${name}`}>↗</a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </details>
        <a className="button institution-cta" href={sitePath("/?area=institucional#contacto")}>
          Consultar sobre defensa institucional <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
