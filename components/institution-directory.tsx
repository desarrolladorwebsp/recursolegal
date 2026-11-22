import { sitePath } from "../lib/site";
import { institutionGroups } from "../lib/resources";

export function InstitutionDirectory() {
  return (
    <section className="institution-section" id="instituciones" aria-labelledby="instituciones-titulo">
      <div className="wrap">
        <div className="directory-intro" data-reveal>
          <p className="editorial-category">Defensa institucional</p>
          <h2 id="instituciones-titulo">¿Ante qué instituciones podemos orientarte?</h2>
          <p>Encuentra el organismo según la materia de tu consulta y accede a su sitio oficial.</p>
        </div>
        <div className="institution-grid">
          {institutionGroups.map(({ title, items }) => (
            <section className="institution-group" key={title} data-reveal>
              <h3>{title}</h3>
              <ul>
                {items.map(({ name, topic, href }) => (
                  <li key={name}>
                    <p><strong>{name}</strong><span>{topic}</span></p>
                    <a href={href} aria-label={`Sitio oficial de ${name}`}>↗</a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <a className="button institution-cta" href={sitePath("/index.html?area=institucional#contacto")}>
          Consultar sobre defensa institucional <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
