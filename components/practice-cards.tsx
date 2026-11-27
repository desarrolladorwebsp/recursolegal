"use client";

import { useRef } from "react";
import { practices } from "../lib/content";
import { practiceDetails, type PracticeDetails } from "../lib/practice-details";
import { sitePath } from "../lib/site";
import styles from "./practice-cards.module.css";

function PracticeCard({ id, title, details }: { id: string; title: string; details: PracticeDetails }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogId = `especialidades-${id}`;
  const titleId = `${dialogId}-titulo`;
  const summaryId = `${dialogId}-resumen`;
  const query = new URLSearchParams({ area: id });
  const consultationUrl = sitePath(`/?${query}#contacto`);

  return (
    <li data-reveal>
      <article className={styles.card} id={id}>
        <div className={styles.heading}>
          <h2>{title}</h2>
          <p>{details.summary}</p>
        </div>
        <div className={styles.detail}>
          <p>{details.introduction}</p>
          <button
            ref={triggerRef}
            className={styles.trigger}
            type="button"
            aria-label={`${title} — ver especialidades`}
            aria-haspopup="dialog"
            aria-controls={dialogId}
            onClick={() => {
              const dialog = dialogRef.current;
              if (!dialog || dialog.open) return;
              dialog.showModal();
              dialog.scrollTop = 0;
            }}
          >
            Explorar especialidades <span aria-hidden="true">→</span>
          </button>
        </div>
      </article>
      <dialog
        ref={dialogRef}
        className={styles.modal}
        id={dialogId}
        aria-labelledby={titleId}
        aria-describedby={summaryId}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onClose={() => triggerRef.current?.focus({ preventScroll: true })}
      >
        <div className={styles.shell}>
          <button className={styles.close} type="button" aria-label="Cerrar ventana" onClick={() => dialogRef.current?.close()}>
            ×
          </button>
          <div className={styles.brand}>
            <img src={sitePath("/assets/marca-oscura.webp")} width={960} height={160} alt="Recurso Legal" />
          </div>
          <h2 id={titleId}>{title}</h2>
          <p id={summaryId}>{details.summary}</p>
          <hr />
          <div className={styles.columns}>
            <div>
              <h3>Sobre la materia</h3>
              <p>{details.about}</p>
              <h3>Temas habituales de consulta</h3>
              <ul className={styles.topics} role="list">
                {details.topics.map((topic) => (
                  <li key={topic}>
                    <a href={sitePath(`/?${new URLSearchParams({ area: id, tema: topic })}#contacto`)}>
                      {topic} <span aria-hidden="true">›</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.reasons}>
                <h3>¿Cómo podemos ayudarte?</h3>
                <ul role="list">
                  {details.reasons.map((reason) => <li key={reason}><span aria-hidden="true">✓</span>{reason}</li>)}
                </ul>
              </div>
              <a className={styles.contact} href={consultationUrl}>
                Consultar por {title} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </li>
  );
}

export function PracticeCards() {
  return (
    <div className={styles.wrap}>
      <ul className={styles.grid} role="list">
        {practices.map(({ id, title }) => id === "institucional" ? null : (
          <PracticeCard key={id} id={id} title={title} details={practiceDetails[id]} />
        ))}
      </ul>
    </div>
  );
}
