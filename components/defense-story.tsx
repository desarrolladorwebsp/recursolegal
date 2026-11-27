"use client";

import { useState } from "react";
import { sitePath } from "../lib/site";
import { defenseSteps } from "../lib/resources";
import styles from "./defense-story.module.css";

export function DefenseStory() {
  const [active, setActive] = useState(0);
  const step = defenseSteps[active];
  const isLast = active === defenseSteps.length - 1;
  const indexLabel = String(active + 1).padStart(2, "0");

  function advance() {
    if (isLast) {
      window.location.assign(sitePath("/#contacto"));
    } else {
      setActive(active + 1);
    }
  }

  return (
    <section id="experiencia" className={styles.experience} aria-labelledby="defensa-titulo" data-reveal>
      <header className={styles.header}>
        <h2 id="defensa-titulo">Una defensa, desde dentro</h2>
        <p>Simulación audiovisual · Caso ficticio</p>
      </header>
      <div className={styles.stage}>
        {defenseSteps.map(({ phase }, index) => (
          <img
            key={phase}
            className={styles.scene}
            data-active={index === active}
            src={sitePath(`/assets/defensa/etapa-${index + 1}.webp`)}
            width={1600}
            height={840}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))}
        <span className={styles.stageLabel} aria-hidden="true">{step.label}</span>
        <span className={styles.stageIndex} aria-hidden="true">{indexLabel} / {String(defenseSteps.length).padStart(2, "0")}</span>
        {active === 0 && (
          // The first approved frame includes an arrow on its right edge.
          <button className={styles.stageNext} type="button" aria-label="Siguiente etapa en la imagen"
            tabIndex={-1} onClick={advance} />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.progress} role="group" aria-label="Elegir etapa">
          {defenseSteps.map(({ phase }, index) => (
            <button
              key={phase}
              type="button"
              aria-label={`Etapa ${index + 1}: ${phase}`}
              aria-pressed={index === active}
              aria-controls="defensa-etapa"
              data-completed={index <= active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <div className={styles.layout}>
          <div id="defensa-etapa" aria-live="polite" aria-atomic="true">
            <div className={styles.copy} key={step.phase}>
              <p className={styles.kicker}>Etapa {indexLabel} · {step.phase}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
          <div className={styles.controls}>
            <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)}
              aria-label="Etapa anterior">←</button>
            <button type="button" className={styles.next} onClick={advance}>
              {isLast ? "Continuar al contacto ↓" : "Continuar →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
