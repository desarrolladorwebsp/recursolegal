"use client";

import { useState } from "react";
import { sitePath } from "../lib/site";
import { defenseSteps } from "../lib/resources";

export function DefenseStory() {
  const [active, setActive] = useState(0);
  const step = defenseSteps[active];

  return (
    <section className="defense-story" aria-labelledby="defensa-titulo">
      <div className="wrap">
        <div className="story-heading" data-reveal>
          <p className="section-label">Caso ficticio</p>
          <h2 id="defensa-titulo">Una defensa, desde dentro.</h2>
          <p>Sigue cinco etapas de un caso ilustrativo, desde la primera conversación hasta los próximos pasos.</p>
        </div>
        <ol className="story-steps" aria-label="Etapas de la defensa">
          {defenseSteps.map(({ short }, index) => (
            <li key={short}>
              <button type="button" aria-pressed={index === active} aria-controls="defensa-etapa"
                onClick={() => setActive(index)}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{short}
              </button>
            </li>
          ))}
        </ol>
        <div className="story-panel" id="defensa-etapa" data-reveal>
          <div className="story-image">
            <img src={sitePath("/assets/sala.webp")} width="928" height="758" alt="" loading="lazy" />
          </div>
          <div className="story-content" aria-live="polite" aria-atomic="true">
            <div className="story-copy" key={step.short}>
              <p className="section-label">Etapa {active + 1} de {defenseSteps.length}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            <div className="story-controls">
              <button type="button" disabled={active === 0} onClick={() => setActive((value) => value - 1)}
                aria-label="Etapa anterior">←</button>
              <button type="button" disabled={active === defenseSteps.length - 1}
                onClick={() => setActive((value) => value + 1)} aria-label="Siguiente etapa">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GoogleReviews() {
  return (
    <section className="reviews-section" aria-labelledby="resenas-titulo">
      <div className="wrap">
        <div className="reviews-panel" data-reveal>
          <div><h2 id="resenas-titulo">Reseñas de Google</h2>
            <p>Las opiniones verificadas se mostrarán cuando se vincule el perfil oficial del estudio.</p>
          </div>
          <a className="text-action" href={sitePath("/index.html#contacto")}>Contactar al estudio <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
