import { team } from "../lib/content";

const pillars = ["Rigor jurídico", "Estrategia", "Acompañamiento"];

export function Pillars() {
  return (
    <ul className="hero-values" aria-label="Nuestro enfoque" role="list">
      {pillars.map((title) => <li key={title}>{title}</li>)}
    </ul>
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
