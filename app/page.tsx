import type { Metadata } from "next";
import { site, sitePath } from "../lib/site";
import { ContactSection, LocationSection } from "../components/contact-sections";
import { HeroVideo } from "../components/hero-video";
import { Pillars, PracticeCards } from "../components/practice-sections";
import { SiteShell } from "../components/site-shell";

export const metadata: Metadata = { alternates: { canonical: `${site.url}/` } };

export default function HomePage() {
  return (
    <SiteShell current="home">
      <section className="hero" aria-labelledby="titulo">
        <HeroVideo />
        <div className="hero-inner">
          <div className="hero-copy">
            <h1 id="titulo" className="visually-hidden">Una estrategia para cada desafío.</h1>
            <p>Asesoría y defensa jurídica con una mirada estratégica, rigurosa y cercana. Cada caso merece atención, claridad y una estrategia construida con propósito.</p>
            <div className="hero-actions">
              <a className="button" href="#contacto">Conversemos sobre tu caso <span aria-hidden="true">↗</span></a>
              <a className="button hero-secondary" href={sitePath("/areas-legales.html")}>Explorar áreas de trabajo <span aria-hidden="true">↓</span></a>
            </div>
            <Pillars />
          </div>
        </div>
      </section>
      <ContactSection />
      <LocationSection />
      <PracticeCards />
    </SiteShell>
  );
}
