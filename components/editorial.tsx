import type { ReactNode } from "react";
import { guides } from "../lib/resources";
import { site } from "../lib/site";

export function EditorialHeading({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <header className="editorial-heading">
      <h1>{title}</h1>
      <p>{intro}</p>
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
      <a className="button hero-secondary" href="/index.html#contacto">Contactar al estudio <span aria-hidden="true">↗</span></a>
    </aside>
  );
}

export function GuideCards() {
  const [featured, ...rest] = guides;
  return (
    <div className="guides-layout">
      <article className="guide-feature" data-reveal>
        <a href={`/noticias/${featured.slug}.html`} className="guide-link">
          <div className="guide-image">
            <img src="/assets/arquitectura.webp" width="1250" height="833" alt="" loading="lazy" />
          </div>
          <p className="editorial-category">{featured.category}</p>
          <h2>{featured.title}</h2>
          <p>{featured.summary}</p>
          <span className="editorial-read">Leer guía <span aria-hidden="true">↗</span></span>
        </a>
      </article>
      <div className="guide-side">
        {rest.map((guide) => (
          <article className="guide-brief" key={guide.slug} data-reveal>
            <a className="guide-link" href={`/noticias/${guide.slug}.html`}>
              <p className="editorial-category">{guide.category}</p>
              <h2>{guide.title}</h2>
              <p>{guide.summary}</p>
              <span className="editorial-read">Leer guía <span aria-hidden="true">↗</span></span>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
