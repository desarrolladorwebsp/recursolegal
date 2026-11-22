import { practices } from "../lib/content";
import { meetingModes, site } from "../lib/site";
import { AppointmentPreferences } from "./appointment-preferences";
import { ConsultationForm } from "./consultation-form";
import { LineIcon } from "./icons";
import { SectionHeading } from "./section-heading";

const contactMethods = [
  { title: "Correo electrónico", href: `mailto:${site.email}`, value: site.email },
  { title: "Teléfono", href: site.phone.href, value: site.phone.number },
  { title: "WhatsApp", href: site.whatsapp.href, value: site.whatsapp.number },
];

export function ContactSection() {
  return (
    <section className="home-contact" id="contacto" aria-labelledby="contacto-titulo">
      <div className="wrap">
        <SectionHeading id="contacto-titulo" label="Contacto" title="Conversemos sobre tu caso."
          description="Escríbenos o llámanos para coordinar una primera conversación." />
        <div className="contact-layout">
          <div className="contact-options" data-reveal>
            <h3>Canales de contacto</h3>
            <ul className="contact-methods">
              {contactMethods.map(({ title, href, value }) => (
                <li key={title}><a href={href}><strong>{title}</strong><span>{value}</span></a></li>
              ))}
            </ul>
            <a className="contact-location-link" href="#ubicacion">Ubicación y reuniones</a>
          </div>
          <ConsultationForm areas={practices} email={site.email} />
        </div>
      </div>
    </section>
  );
}

function LocationMap() {
  return (
    <article className="location-reference" data-reveal>
      <iframe className="location-map" title="Mapa de la ubicación de referencia en Santiago, Chile"
        src={site.location.embed} width={600} height={400} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
      <div className="location-meta">
        <p><strong>{site.location.address}</strong><span>Ubicación de referencia · Santiago, Chile</span></p>
        <a href={site.location.href}>Ver referencia en Google Maps</a>
      </div>
    </article>
  );
}

function MeetingOptions() {
  return (
    <article className="meeting-card" data-reveal>
      <p className="section-label">Atención personalizada</p>
      <h3>Coordina tu reunión.</h3>
      <p>Cuéntanos qué modalidad prefieres para consultar disponibilidad.</p>
      <fieldset className="meeting-options">
        <legend className="visually-hidden">Modalidad de reunión</legend>
        {meetingModes.map(({ label, icon }) => (
          <label className="meeting-option" key={icon}>
            <input className="visually-hidden" type="radio" name="modalidad" value={label} form="consulta-form" />
            <span><LineIcon name={icon} />{label}</span>
          </label>
        ))}
      </fieldset>
      <AppointmentPreferences />
      <a className="button hero-secondary" href="#contacto">Solicitar reunión <span aria-hidden="true">↗</span></a>
    </article>
  );
}

export function LocationSection() {
  return (
    <section className="home-location" id="ubicacion" aria-labelledby="ubicacion-titulo">
      <div className="wrap">
        <SectionHeading id="ubicacion-titulo" label="Visita · Recurso Legal" title="Encuéntranos en Santiago."
          description="Consulta disponibilidad para una reunión presencial o por videollamada." />
        <div className="location-layout">
          <LocationMap />
          <MeetingOptions />
        </div>
      </div>
    </section>
  );
}
