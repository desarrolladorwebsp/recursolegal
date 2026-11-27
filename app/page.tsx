import { homeStructuredData, isPreview, pageMetadata, seoPages } from "../lib/seo";
import { sitePath } from "../lib/site";
import { ContactSection, LocationSection } from "../components/contact-sections";
import { HeroVideo } from "../components/hero-video";
import { Pillars } from "../components/practice-sections";
import { SiteShell } from "../components/site-shell";

export const metadata = pageMetadata(seoPages.home);

export default function HomePage() {
  return (
    <SiteShell current="home">
      {!isPreview && <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
      }} />}
      <section className="hero" aria-labelledby="titulo">
        <img className="hero-poster" src={sitePath("/assets/portada.webp")} width={1214} height={758} alt="" fetchPriority="high" />
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
    </SiteShell>
  );
}
