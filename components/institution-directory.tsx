"use client";

import { useRef, useState } from "react";
import { institutions } from "../lib/institutions";
import { sitePath } from "../lib/site";

const initialCount = 4;
const consultationUrl = sitePath("/?area=institucional#contacto");

function InstitutionItem({ name, category, description, background, href }: (typeof institutions)[number]) {
  return (
    <details className="institution-item">
      <summary>
        <span className="institution-name">{name}</span>
        <span className="institution-category">{category}</span>
        <span className="faq-toggle" aria-hidden="true" />
      </summary>
      <div className="institution-panel">
        <p>{description}</p>
        <p><strong>Antecedentes útiles:</strong> {background}</p>
        <div className="institution-actions">
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Sitio oficial de ${name}`}>
            Sitio oficial <span aria-hidden="true">↗</span>
          </a>
          <a href={consultationUrl}>Consultar con RECURSO LEGAL <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </details>
  );
}

export function InstitutionDirectory() {
  const trigger = useRef<HTMLButtonElement>(null);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const visibleInstitutions = showAll ? institutions : institutions.slice(0, initialCount);

  function closeQuestion() {
    setQuestionVisible(false);
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <section className="institution-section" id="instituciones" aria-labelledby="instituciones-titulo">
      <div className="wrap" id="institucional">
        <div className="directory-intro" data-reveal>
          <p className="section-label">RECURSO LEGAL · Defensa de tus derechos</p>
          <h2 id="instituciones-titulo">¿Sabías que estamos <span>cambiando la forma de defender tus derechos?</span></h2>
          <p className="institution-lead">Somos expertos en asesoría y defensa jurídica frente a instituciones públicas, privadas y organismos fiscalizadores.</p>
        </div>
        <button
          ref={trigger}
          className="institution-statement"
          type="button"
          aria-expanded={questionVisible}
          aria-controls="instituciones-pregunta"
          onClick={() => setQuestionVisible((visible) => !visible)}
        >
          <span>Transformamos tus reclamos en <strong>acciones legales concretas</strong> para que tus derechos sean escuchados, respetados y protegidos.</span>
          <strong>Explorar instituciones <span aria-hidden="true">↗</span></strong>
        </button>
        <aside className="institution-question" id="instituciones-pregunta" aria-labelledby="instituciones-pregunta-titulo" hidden={!questionVisible}>
          <h3 id="instituciones-pregunta-titulo">¿Quieres denunciar a alguna de estas instituciones?</h3>
          <button type="button" aria-label="Cerrar pregunta" onClick={closeQuestion} onKeyDown={(event) => {
            if (event.key === "Escape") closeQuestion();
          }}>×</button>
        </aside>
        <div className="institution-bridge">
          <p>Lo que antes parecía una pérdida de tiempo puede convertirse en una oportunidad real para exigir el respeto de tus derechos, con una estrategia jurídica y las vías legales disponibles para cada caso.</p>
          <a className="button" href={consultationUrl}>Contáctanos ahora <span aria-hidden="true">↗</span></a>
        </div>
        <div className="institution-list-heading" data-reveal>
          <h3>¿Ante qué instituciones podemos orientarte?</h3>
          <p>Explora los organismos y sus competencias. Selecciona uno para conocer las materias que atiende, los antecedentes útiles y sus canales oficiales.</p>
        </div>
        <div className="institution-list" id="instituciones-listado">
          {visibleInstitutions.map((institution) => <InstitutionItem key={institution.name} {...institution} />)}
        </div>
        <button className="button institution-more" type="button" aria-expanded={showAll} aria-controls="instituciones-listado" onClick={() => setShowAll((visible) => !visible)}>
          {showAll ? "Ver menos instituciones −" : `Ver más instituciones (${institutions.length - initialCount}) +`}
        </button>
        <p className="institution-note">Orientación general: no todas estas instituciones son tribunales ni todas las gestiones constituyen acciones judiciales. Las vías, requisitos y plazos dependen del caso. Esta sección no implica afiliación ni representación de los organismos mencionados.</p>
      </div>
    </section>
  );
}
