import { practices, team } from "../lib/content";
import { LineIcon, type LineName } from "./icons";

const pillars: readonly { title: string; icon: LineName }[] = [
  { title: "Rigor jurídico", icon: "scales" },
  { title: "Estrategia", icon: "compass" },
  { title: "Acompañamiento", icon: "conversation" },
];

export function PracticeCards({ detailed = false }: { detailed?: boolean }) {
  const grid = (
    <div className="wrap">
      {detailed ? null : <h2 id="areas">Áreas legales</h2>}
      <ul className={`practice-grid ${detailed ? "detail-grid" : "home-practice-grid"}`} role="list">
        {practices.map(({ id, title, description }, index) => (
          <li key={id} data-reveal>
            {detailed ? (
              <article className="detail-card" id={id} tabIndex={-1}>
                <h2>{title}</h2>
                <p>{description}</p>
                <a className="text-action" href={`/index.html?area=${id}#contacto`}>Consultar por esta área <span aria-hidden="true">↗</span></a>
              </article>
            ) : (
              <a className="practice-link" href={`areas-legales.html#${id}`}>
                <span className="practice-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="practice-arrow" aria-hidden="true">↗</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return detailed
    ? <div className="practice-section">{grid}</div>
    : <section className="practice-section" aria-labelledby="areas">{grid}</section>;
}

export function Pillars() {
  return (
    <section className="pillars" aria-label="Nuestro enfoque">
      <div className="wrap">
        <ul className="pillar-grid" role="list">
          {pillars.map(({ title, icon }) => (
            <li key={title} data-reveal><LineIcon name={icon} /><h2>{title}</h2></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TeamCards() {
  return (
    <section className="practice-section" aria-labelledby="equipo">
      <div className="wrap">
        <div className="team-heading" data-reveal>
          <h2 id="equipo">Equipo</h2>
          <p>Perfiles ficticios de referencia para esta versión.</p>
        </div>
        <ul className="practice-grid team-grid">
          {team.map(({ name, role, description }) => (
            <li key={name} data-reveal>
              <article className="detail-card">
                <h3>{name}</h3>
                <p className="role">{role}</p>
                <p>{description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
