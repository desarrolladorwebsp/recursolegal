export function SectionHeading({
  id,
  label,
  title,
  description,
}: {
  id: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="home-section-heading" data-reveal>
      <p className="section-label">{label}</p>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export function Subhero({ variant, title, description }: {
  variant: "areas" | "about";
  title: string;
  description: string;
}) {
  return (
    <section className={`subhero subhero-${variant}`}>
      <div className="wrap subhero-inner">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
