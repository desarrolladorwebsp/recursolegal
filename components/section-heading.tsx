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

export function Subhero({ variant, label, title, description }: {
  variant: "areas" | "about";
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className={`subhero subhero-${variant}`}>
      <div className="wrap subhero-inner">
        <p className="section-label">{label}</p>
        <h1>{title}</h1>
        {variant === "about" ? <h2>Quiénes somos</h2> : null}
        <p>{description}</p>
      </div>
    </section>
  );
}
