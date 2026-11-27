"use client";

import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { contactDraftUrl, consultationFields, otherConsultationArea } from "../lib/contact-draft";
import { isPracticeTopic } from "../lib/practice-details";
import { LineIcon } from "./icons";

const statusMessages: Record<number, string> = {
  400: "Revisa los datos de tu consulta e inténtalo de nuevo.",
  404: "Puedes preparar la consulta en tu aplicación de correo.",
  405: "Puedes preparar la consulta en tu aplicación de correo.",
  413: "Acorta tu mensaje e inténtalo de nuevo.",
  429: "Espera unos minutos antes de volver a intentarlo.",
  503: "El envío desde la web no está disponible por ahora. Puedes preparar un correo.",
};
const unconfirmedMessage = "No pudimos confirmar el envío. Intenta nuevamente con los mismos datos.";

export function ConsultationForm({ areas, email }: { areas: readonly { id: string; title: string }[]; email: string }) {
  const fieldsRef = useRef<HTMLFieldSetElement>(null);
  const confirmationRef = useRef<HTMLDialogElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const requestRef = useRef<{ payload: string; id: string } | null>(null);
  const sending = useRef(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fieldset = fieldsRef.current;
    if (!fieldset) return;

    fieldset.disabled = false;
    const query = new URLSearchParams(window.location.search);
    const queryArea = query.get("area");
    const area = areas.find(({ id, title }) => id === queryArea || title === queryArea);
    const selector = fieldset.querySelector("select");
    if (area && selector) selector.value = area.title;

    const topic = query.get("tema");
    const messageField = fieldset.querySelector("textarea");
    if (area && topic && messageField && !messageField.value && isPracticeTopic(area.id, topic)) {
      messageField.value = `Me gustaría recibir orientación sobre: ${topic}.`;
    }
  }, [areas]);

  async function sendConsultation(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(consultationFields.map(([key]) => [key, data.get(key) ?? ""]));
    const payload = JSON.stringify(values);

    sending.current = true;
    setPending(true);
    setMessage("");
    try {
      if (requestRef.current?.payload !== payload) {
        requestRef.current = { payload, id: crypto.randomUUID() };
      }
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, requestId: requestRef.current.id, website: data.get("website") ?? "" }),
        signal: AbortSignal.timeout(15_000),
      });

      if (response.ok && (await response.json()).code === "accepted") {
        form.reset();
        requestRef.current = null;
        confirmationRef.current?.showModal();
        setMessage("Tu solicitud fue recibida.");
      } else {
        setMessage(statusMessages[response.status] ?? unconfirmedMessage);
      }
    } catch {
      setMessage(unconfirmedMessage);
    } finally {
      setPending(false);
      sending.current = false;
    }
  }

  return (
    <form className="consultation-card" id="consulta-form" onSubmit={sendConsultation} data-reveal>
      <p className="section-label">Consulta inicial</p>
      <h3>Empecemos por escucharte.</h3>
      <p id="form-nota">Envíanos un resumen para coordinar una primera conversación. Evita incluir datos sensibles.</p>
      <fieldset ref={fieldsRef} className="contact-fields" disabled aria-busy={pending} aria-describedby="form-nota">
        <legend className="visually-hidden">Campos del formulario de consulta</legend>
        <label className="contact-field">
          Área de consulta
          <select name="area" defaultValue="" required>
            <option value="" disabled>Selecciona un área legal</option>
            {areas.map(({ id, title }) => <option key={id}>{title}</option>)}
            <option>{otherConsultationArea}</option>
          </select>
        </label>
        <label className="contact-field">Nombre <input type="text" name="nombre" autoComplete="name" maxLength={100} placeholder="Tu nombre" required /></label>
        <label className="contact-field">Correo electrónico <input type="email" name="correo" autoComplete="email" maxLength={200} placeholder="nombre@correo.cl" required /></label>
        <label className="contact-field">Teléfono (opcional) <input type="tel" name="telefono" autoComplete="tel" maxLength={40} placeholder="+56 9 0000 0000" /></label>
        <label className="contact-field">Mensaje (opcional) <textarea name="mensaje" rows={3} maxLength={800} placeholder="Cuéntanos cómo prefieres que te contactemos." /></label>
        <div hidden>
          <input type="text" name="website" aria-label="Deja este campo vacío" tabIndex={-1} autoComplete="off" />
        </div>
        <button ref={submitRef} className="button" type="submit" disabled={pending}>{pending ? "Enviando…" : "Enviar consulta"} <span aria-hidden="true">↗</span></button>
        <button className="contact-draft-button" type="button" disabled={pending} onClick={() => {
          const form = fieldsRef.current?.form;
          if (form?.reportValidity()) window.location.href = contactDraftUrl(email, new FormData(form));
        }}>Preparar un borrador en mi correo</button>
      </fieldset>
      <p className="contact-form-status" role="status">{message}</p>
      <dialog
        ref={confirmationRef}
        className="consultation-confirmation"
        aria-labelledby="consulta-confirmacion-titulo"
        aria-describedby="consulta-confirmacion-texto"
        onClose={() => submitRef.current?.focus({ preventScroll: true })}
      >
        <span className="consultation-confirmation-icon"><LineIcon name="check" /></span>
        <h2 id="consulta-confirmacion-titulo">Gracias. Hemos recibido tu solicitud.</h2>
        <p id="consulta-confirmacion-texto">Muy pronto, un ejecutivo se pondrá en contacto contigo.</p>
        <button className="button" type="button" onClick={() => confirmationRef.current?.close()}>Entendido</button>
      </dialog>
    </form>
  );
}
