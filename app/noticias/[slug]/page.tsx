import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPanel, EditorialHeading } from "../../../components/editorial";
import { SiteShell } from "../../../components/site-shell";
import { guides } from "../../../lib/resources";
import { site } from "../../../lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: `${site.url}/noticias/${guide.slug}.html` },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  return (
    <SiteShell current="news">
      <article className="editorial-section">
        <div className="wrap">
          <a className="back-link" href="/noticias.html">← Noticias jurídicas</a>
          <p className="editorial-category">{guide.category}</p>
          <EditorialHeading title={guide.title} intro={guide.summary} />
          <div className="resource-layout">
            <div className="editorial-prose">
              {guide.sections.map(({ title, text }) => (
                <section key={title} data-reveal><h2>{title}</h2><p>{text}</p></section>
              ))}
              <section>
                <h2>Fuentes oficiales</h2>
                <ul>{guide.sources.map(({ label, href }) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
              </section>
            </div>
            <ContactPanel />
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
