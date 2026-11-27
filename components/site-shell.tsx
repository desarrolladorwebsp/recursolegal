import type { ReactNode } from "react";
import { navigation, site, sitePath, socials } from "../lib/site";
import { EconomicIndicators } from "./economic-indicators";
import { LineIcon, SocialIcon } from "./icons";
import { SiteEffects } from "./site-effects";

type Route = "home" | "areas" | "about" | "faq" | "news" | "legal";

function Brand({ current = false, footer = false }: { current?: boolean; footer?: boolean }) {
  return (
    <a className="brand" href={sitePath("/")} aria-label="Recurso Legal, inicio" aria-current={current ? "page" : undefined}>
      <img
        src={sitePath("/assets/marca-oscura.webp")}
        width={960}
        height={160}
        alt="Recurso Legal · Estudio Jurídico"
        loading={footer ? "lazy" : "eager"}
      />
    </a>
  );
}

function HeaderLinks({ current, className }: { current: Route; className?: string }) {
  return (
    <nav className={className} aria-label="Navegación principal">
      {navigation.map(({ id, label, href }) => (
        <a key={id} className={id === "contact" ? "nav-contact" : undefined} href={sitePath(href)} aria-current={id === current ? "page" : undefined}>
          {label}{id === "contact" ? <span aria-hidden="true">↗</span> : null}
        </a>
      ))}
    </nav>
  );
}

function Header({ current }: { current: Route }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Brand current={current === "home"} />
        <HeaderLinks current={current} className="desktop-navigation" />
        <details className="site-menu">
          <summary>Menú <span aria-hidden="true" /></summary>
          <HeaderLinks current={current} />
        </details>
      </div>
    </header>
  );
}

function SocialRail() {
  return (
    <nav className="social-rail" aria-label="Accesos rápidos a redes sociales">
      {socials.map(({ href, name }) => (
        <a key={name} href={href} aria-label={name} target="_blank" rel="noopener noreferrer">
          <SocialIcon name={name} />
        </a>
      ))}
      <a href={site.whatsapp.href} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
        <LineIcon name="whatsapp" />
      </a>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-inner">
          <div className="footer-brand">
            <Brand footer />
            <p>Asesoría y defensa jurídica con una mirada estratégica, rigurosa y cercana.</p>
            <nav className="footer-social" aria-label="Redes sociales">
              {socials.map(({ href, name }) => (
                <a key={name} href={href} aria-label={name}><SocialIcon name={name} /></a>
              ))}
            </nav>
          </div>
          <nav aria-label="Explora el sitio">
            <h2>Explora el sitio</h2>
            <ul className="footer-links">
              {navigation.map(({ id, href, label }) => (
                <li key={id}><a href={sitePath(href)}>{label}</a></li>
              ))}
              <li><a href={sitePath("/#ubicacion")}>Ubicación y reuniones</a></li>
            </ul>
          </nav>
          <nav aria-label="Información legal">
            <h2>Información legal</h2>
            <ul className="footer-links footer-policy-links">
              <li><a href={sitePath("/privacidad.html")}>Política de privacidad</a></li>
              <li><a href={sitePath("/normativas.html")}>Normativas y aviso legal</a></li>
            </ul>
          </nav>
          <EconomicIndicators />
        </div>
        <section className="footer-contact" aria-labelledby="contacto-pie">
          <h2 id="contacto-pie">Contacto y oficinas</h2>
          <ul className="footer-links">
            <li><a href={site.location.href}>{site.location.address}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a href={site.phone.href}>Teléfono <span>{site.phone.number}</span></a></li>
            <li><a href={site.whatsapp.href}>WhatsApp <span>{site.whatsapp.number}</span></a></li>
          </ul>
          <p>Atención presencial y virtual en Chile, previa coordinación.</p>
        </section>
        <div className="footer-legal">
          <p>© 2026 Recurso Legal. Todos los derechos reservados.</p>
          <a className="footer-credit" href="https://smartpro.cl/">
            <img src={sitePath("/assets/logo-smartpro-white-letters.webp")} width={256} height={85} alt="SmartPro" loading="lazy" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function MobileContact() {
  return (
    <nav className="mobile-contact" aria-label="Contacto rápido">
      <a href={site.whatsapp.href}><LineIcon name="whatsapp" />WhatsApp</a>
      <a href={site.phone.href}><LineIcon name="phone" />Llamar</a>
    </nav>
  );
}

export function SiteShell({ current, children }: { current: Route; children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#contenido">Ir al contenido</a>
      <Header current={current} />
      <SocialRail />
      <main id="contenido" tabIndex={-1}>{children}</main>
      <Footer />
      <MobileContact />
      <SiteEffects />
    </>
  );
}
