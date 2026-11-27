import { pageMetadata, seoPages } from "../../lib/seo";
import { SiteShell } from "../../components/site-shell";
import { sitePath } from "../../lib/site";
import styles from "./news.module.css";

export const metadata = pageMetadata(seoPages.news);

const posts = [
  {
    category: "Derechos y reclamos",
    image: {
      path: "/assets/noticias/reclamo-institucional.webp",
      alt: "Una persona organiza formularios y documentos en una carpeta para preparar un reclamo.",
    },
    title: "Reclamar ante una institución: cómo preparar antecedentes sólidos",
    lead: "Antes de presentar un reclamo, ordenar los hechos y respaldarlos documentalmente puede marcar la diferencia.",
    paragraphs: [
      "Identifica el organismo competente y revisa si exige una gestión previa ante la empresa o institución involucrada.",
      "Prepara una cronología de los hechos, contratos, comunicaciones, comprobantes y respuestas recibidas. Conserva originales y copias.",
      "Revisa los plazos aplicables: varían según la materia y la vía elegida. Un reclamo administrativo no siempre reemplaza una acción judicial ni suspende sus plazos.",
    ],
  },
  {
    category: "Derecho laboral",
    image: {
      path: "/assets/noticias/conflictos-laborales.webp",
      alt: "Un trabajador revisa un contrato junto a una asesora jurídica.",
    },
    title: "Conflictos laborales: cuándo acudir a la Dirección del Trabajo",
    lead: "Remuneraciones, jornada, condiciones laborales y término de contrato pueden requerir distintas vías de actuación.",
    paragraphs: [
      "La Dirección del Trabajo recibe consultas, denuncias y solicitudes de fiscalización dentro de sus atribuciones.",
      "Para una consulta, reúne contrato, anexos, liquidaciones, registros de jornada, comunicaciones y documentos relacionados con el conflicto.",
      "En algunos casos, la solución requiere actuaciones ante tribunales laborales y existen plazos breves. La vía apropiada depende de los antecedentes.",
    ],
  },
  {
    category: "Consumidores",
    image: {
      path: "/assets/noticias/derechos-consumidores.webp",
      alt: "Una persona compara una boleta con el resumen de una compra en su teléfono.",
    },
    title: "Problemas con una empresa: SERNAC y otras vías de protección",
    lead: "Un cobro improcedente, un incumplimiento o una respuesta insatisfactoria no siempre se resuelven por el mismo canal.",
    paragraphs: [
      "Conserva boletas, contratos, publicidad, correos y números de seguimiento del reclamo. Explica qué ocurrió y qué solución solicitas.",
      "SERNAC puede gestionar reclamos y ejercer las atribuciones que la ley le entrega, pero no decide todas las controversias ni reemplaza a los tribunales.",
      "Según el caso, también pueden intervenir organismos sectoriales, como la CMF o una superintendencia, o corresponder acciones ante tribunales.",
    ],
  },
] as const;

export default function NewsPage() {
  const contactHref = sitePath("/#contacto");

  return (
    <SiteShell current="news">
      <section className={`${styles.container} ${styles.blog}`} aria-labelledby="blog-title" id="actualidad">
        <header className={styles.header}>
          <div>
            <p className={`section-label ${styles.eyebrow}`}>Blog / Recurso Legal Defensa</p>
            <h1 id="blog-title">Blog de noticias <span>jurídicas.</span></h1>
            <p className={styles.intro}>Un espacio para entender tus derechos, conocer las vías de reclamación y actuar con información. Contenido de orientación general, explicado con claridad.</p>
          </div>
          <a className={styles.contactAction} href={contactHref}>Contáctanos ahora <span aria-hidden="true">↗</span></a>
        </header>
        <div className={styles.grid}>
          {posts.map(({ category, image, title, lead, paragraphs }) => (
            <article className={styles.post} key={category}>
              <img className={styles.postImage} src={sitePath(image.path)} alt={image.alt}
                width={960} height={540} loading="lazy" decoding="async" />
              <div className={styles.meta}><span>{category}</span><span>Guía práctica</span></div>
              <h2>{title}</h2>
              <p className={styles.lead}>{lead}</p>
              <details className={styles.details}>
                <summary>Leer artículo <span aria-hidden="true">↗</span></summary>
                <div className={styles.postBody}>
                  {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <a href={contactHref}>Consultar con RECURSO LEGAL <span aria-hidden="true">↗</span></a>
                </div>
              </details>
            </article>
          ))}
        </div>
        <p className={styles.note}>Estos artículos son guías generales, no noticias de última hora ni asesoría jurídica personalizada. La normativa, los procedimientos y los plazos deben revisarse según cada caso.</p>
      </section>
      <div className={`${styles.container} ${styles.followUp}`}>
        <a className={styles.contactAction} href={contactHref}>Conversemos sobre tu caso <span aria-hidden="true">↗</span></a>
      </div>
    </SiteShell>
  );
}
