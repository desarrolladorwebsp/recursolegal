import type { ReactNode } from "react";
import { guides } from "../lib/resources";
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
      <a className="button hero-secondary" href={sitePath("/index.html#contacto")}>Contactar al estudio <span aria-hidden="true">↗</span></a>
    </aside>
  );
}

export function GuideCards() {
  return (
    <div className="guides-layout">
      {guides.map(({ slug, category, title, summary }) => (
        <article className="guide-card" key={slug} data-reveal>
          <a className="guide-link" href={sitePath(`/noticias/${slug}.html`)}>
            <div className="guide-meta">
              <p className="editorial-category">{category}</p>
              <span>Guía práctica</span>
            </div>
            <h2>{title}</h2>
            <p>{summary}</p>
            <span className="editorial-read">Leer guía <span aria-hidden="true">↗</span></span>
          </a>
        </article>
      ))}
    </div>
  );
}
