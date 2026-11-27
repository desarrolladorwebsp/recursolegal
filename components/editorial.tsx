import type { ReactNode } from "react";
import { site, sitePath } from "../lib/site";

export function EditorialHeading({ title, intro, label, children }: { title: ReactNode; intro?: string; label?: string; children?: ReactNode }) {
  return (
    <header className="editorial-heading">
      <div>
        {label ? <p className="section-label">{label}</p> : null}
        <h1>{title}</h1>
        {intro ? <p>{intro}</p> : null}
      </div>
      {children}
    </header>
  );
}

export function ContactPanel() {
  return (
    <aside className="resource-contact">
      <h2>Conversemos sobre tu caso.</h2>
      <ul className="resource-contact-links">
        <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
        <li><a href={site.phone.href}>{site.phone.number}</a></li>
      </ul>
      <a className="button hero-secondary" href={sitePath("/#contacto")}>Contactar al estudio <span aria-hidden="true">↗</span></a>
    </aside>
  );
}
