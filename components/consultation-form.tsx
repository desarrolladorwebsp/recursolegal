"use client";

import { useEffect, useRef, type SubmitEvent } from "react";
import { contactDraftUrl } from "../lib/contact-draft";

export function ConsultationForm({ areas, email }: { areas: readonly { id: string; title: string }[]; email: string }) {
  const fieldsRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    const fieldset = fieldsRef.current;
    if (!fieldset) return;

    fieldset.disabled = false;
    const queryArea = new URLSearchParams(window.location.search).get("area");
    const area = areas.find(({ id, title }) => id === queryArea || title === queryArea);
    const selector = fieldset.querySelector("select");
    if (area && selector) selector.value = area.title;
  }, [areas]);

  function prepareDraft(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = contactDraftUrl(email, new FormData(event.currentTarget));
  }

  return (
    <form className="consultation-card" id="consulta-form" onSubmit={prepareDraft} data-reveal>
      <p className="section-label">Consulta inicial</p>
      <h3>Empecemos por escucharte.</h3>
      <p id="form-nota">Al continuar se abrirá un borrador en tu aplicación de correo.</p>
      <fieldset ref={fieldsRef} className="contact-fields" disabled aria-describedby="form-nota">
        <legend className="visually-hidden">Campos del formulario de consulta</legend>
        <label className="contact-field">
          Área de consulta
          <select name="area" defaultValue="" required>
            <option value="" disabled>Selecciona un área legal</option>
            {areas.map(({ id, title }) => <option key={id}>{title}</option>)}
            <option>No estoy seguro/a</option>
          </select>
        </label>
        <label className="contact-field">Nombre <input type="text" name="nombre" autoComplete="name" maxLength={100} placeholder="Tu nombre" required /></label>
        <label className="contact-field">Correo electrónico <input type="email" name="correo" autoComplete="email" maxLength={200} placeholder="nombre@correo.cl" required /></label>
        <label className="contact-field">Teléfono (opcional) <input type="tel" name="telefono" autoComplete="tel" maxLength={40} placeholder="+56 9 0000 0000" /></label>
        <label className="contact-field">Mensaje (opcional) <textarea name="mensaje" rows={3} maxLength={800} placeholder="Cuéntanos cómo prefieres que te contactemos." /></label>
        <button className="button" type="submit">Preparar consulta <span aria-hidden="true">↗</span></button>
      </fieldset>
    </form>
  );
}
