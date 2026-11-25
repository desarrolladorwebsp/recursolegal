import type { ReactNode } from "react";
import { navigation, site, sitePath, socials } from "../lib/site";
import { EconomicIndicators } from "./economic-indicators";
import { LineIcon, SocialIcon } from "./icons";
import { SiteEffects } from "./site-effects";

type Route = "home" | "areas" | "about" | "faq" | "news" | "legal";

function Brand({ current = false, footer = false }: { current?: boolean; footer?: boolean }) {
  return (
    <a className="brand" href={sitePath("/index.html")} aria-label="Recurso Legal, inicio" aria-current={current ? "page" : undefined}>
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

function Footer({ showConsultation }: { showConsultation: boolean }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-inner">
          <div className="footer-brand">
            <Brand footer />
            <p>Asesoría y defensa jurídica con una mirada estratégica, rigurosa y cercana.</p>
            {showConsultation ? <a className="button" href={sitePath("/index.html#contacto")}>Conversemos sobre tu caso</a> : null}
          </div>
          <div className="footer-contact">
            <h2>Contacto</h2>
            <ul className="footer-links">
              <li><a href={site.location.href}>{site.location.address}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.phone.href}>Teléfono <span>{site.phone.number}</span></a></li>
              <li><a href={site.whatsapp.href}>WhatsApp <span>{site.whatsapp.number}</span></a></li>
            </ul>
          </div>
          <nav aria-label="Explora el sitio">
            <h2>Explora el sitio</h2>
            <ul className="footer-links">
              {navigation.filter(({ id }) => id !== "contact").map(({ id, href, label }) => (
                <li key={id}><a href={sitePath(href)}>{label}</a></li>
              ))}
              <li><a href={sitePath("/index.html#ubicacion")}>Ubicación y reuniones</a></li>
            </ul>
          </nav>
          <EconomicIndicators />
        </div>
        <div className="footer-resources">
          <nav aria-label="Información legal">
            <a href={sitePath("/privacidad.html")}>Política de privacidad</a>
            <a href={sitePath("/normativas.html")}>Normativas y aviso legal</a>
          </nav>
          <nav aria-label="Redes sociales">
            {socials.map(({ href, name }) => (
              <a key={name} href={href} aria-label={name}><SocialIcon name={name} /></a>
            ))}
          </nav>
        </div>
        <div className="footer-legal">
          <p>© 2026 Recurso Legal. Todos los derechos reservados.</p>
          <a className="footer-credit" href="https://smartpro.cl/">
            <span>Creado por <span className="footer-credit-domain">smartpro.cl</span></span>
            <img src={sitePath("/assets/logo-smartpro-white-letters.webp")} width={256} height={85} alt="" loading="lazy" />
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
      <Footer showConsultation={current !== "home"} />
      <MobileContact />
      <SiteEffects />
    </>
  );
}
