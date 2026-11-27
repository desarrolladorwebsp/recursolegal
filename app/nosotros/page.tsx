import { pageMetadata, seoPages } from "../../lib/seo";
import { sitePath } from "../../lib/site";
import { DefenseStory } from "../../components/defense-story";
import { SiteShell } from "../../components/site-shell";
import styles from "./about.module.css";

export const metadata = pageMetadata(seoPages.about);

const values = [
  { title: "Excelencia profesional", description: "Rigurosidad y calidad en cada servicio." },
  { title: "Accesibilidad", description: "Acercamos el Derecho a las personas y empresas." },
  { title: "Confianza y confidencialidad", description: "Proporcionamos un espacio seguro para abordar las necesidades de nuestros clientes." },
  { title: "Oportunidad", description: "Buscamos entregar respuestas y soluciones en tiempos adecuados." },
  { title: "Empatía y cercanía", description: "Comprendemos las circunstancias particulares de cada cliente." },
  { title: "Ética y transparencia", description: "Actuamos con responsabilidad, honestidad y claridad." },
  { title: "Compromiso", description: "Acompañamos a nuestros clientes durante cada etapa de sus asuntos jurídicos." },
];

function ContactLink() {
  return (
    <a className={`button ${styles.contactButton}`} href={sitePath("/#contacto")}>
      Conversemos sobre tu caso <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function AboutPage() {
  return (
    <SiteShell current="about">
      <section className={`${styles.container} ${styles.intro}`} aria-labelledby="nosotros-titulo">
        <p className={`section-label ${styles.eyebrow}`}>Recurso Legal</p>
        <h1 id="nosotros-titulo">Soluciones jurídicas cercanas, oportunas y de calidad</h1>
        <h2>Quiénes somos</h2>
        <p>Recurso Legal es un estudio jurídico fundado por abogados formados en destacadas universidades de Chile, comprometidos con brindar asesoría y representación jurídica de excelencia a personas y empresas.</p>
        <p>Contamos con presencia en las comunas de Santiago y Ñuñoa, ofreciendo servicios en distintas áreas del Derecho, mediante un modelo de atención presencial y virtual que nos permite llegar a clientes de todo el territorio nacional.</p>
        <div className={styles.grid}>
          <article className={styles.card}>
            <h2>Nuestra misión</h2>
            <p>Brindar servicios jurídicos de calidad, oportunos y de fácil acceso, generando un espacio seguro, confidencial y de confianza, donde cada cliente pueda encontrar orientación, acompañamiento y soluciones efectivas a sus necesidades legales.</p>
          </article>
          <article className={styles.card}>
            <h2>Nuestra visión</h2>
            <p>Consolidarnos como un estudio jurídico reconocido a nivel nacional por su excelencia profesional, cercanía, compromiso y capacidad de facilitar el acceso a servicios jurídicos, independientemente de la ubicación geográfica de nuestros clientes.</p>
          </article>
        </div>
        <h2>Nuestros valores</h2>
        <div className={styles.grid}>
          {values.map(({ title, description }) => (
            <article className={styles.card} key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <article className={styles.proposition}>
          <h2>Nuestra propuesta de valor</h2>
          <p>Combinamos formación jurídica, atención personalizada y herramientas tecnológicas para ofrecer soluciones legales accesibles, sin barreras geográficas y adaptadas a las necesidades de cada persona y empresa en Chile.</p>
          <ContactLink />
        </article>
      </section>
      <div className={styles.container}><DefenseStory /></div>
      <div className={`${styles.lowerContainer} ${styles.followUp}`}>
        <ContactLink />
      </div>
      <section className={`${styles.lowerContainer} ${styles.sectionSpacing}`} id="resenas" aria-labelledby="resenas-titulo" data-reveal>
        <p className={`section-label ${styles.eyebrow}`}>Confianza y experiencia</p>
        <h2 className={styles.reviewsTitle} id="resenas-titulo">Reseñas de Google</h2>
        <div className={styles.reviewsPanel}>
          <strong>Opiniones de nuestros clientes</strong>
          <p>Las reseñas verificadas de Google se mostrarán aquí cuando se vincule el perfil oficial del estudio. No se publican valoraciones ficticias.</p>
        </div>
      </section>
    </SiteShell>
  );
}
