import { renderToStaticMarkup } from "react-dom/server";
import type { CSSProperties, ReactNode } from "react";
import { consultationFields } from "../contact-draft";
import { site, socials } from "../site";

const navy = site.themeColor;
const panel = "#00263d";
const silver = "#d9d9d9";
const white = "#ffffff";
const font = "Arial, Helvetica, sans-serif";
const bodyText: CSSProperties = { color: navy, fontSize: 16, lineHeight: "25px", margin: "0 0 18px" };
const footerLink: CSSProperties = { color: white, textDecoration: "underline" };

const darkStyles = `
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  @media (prefers-color-scheme: dark) {
    .email-bg { background-color: ${navy} !important; }
    .email-content { background-color: ${panel} !important; }
    .email-heading, .email-copy { color: ${white} !important; }
    .email-label { color: ${silver} !important; }
  }
  [data-ogsc] .email-bg { background-color: ${navy} !important; }
  [data-ogsc] .email-content { background-color: ${panel} !important; }
  [data-ogsc] .email-heading, [data-ogsc] .email-copy { color: ${white} !important; }
  [data-ogsc] .email-label { color: ${silver} !important; }
  @media screen and (max-width: 480px) {
    .email-inset { padding-left: 22px !important; padding-right: 22px !important; }
    .email-heading { font-size: 29px !important; line-height: 34px !important; }
  }
`;

const confirmation = "Gracias por escribirnos. Nuestro equipo revisará tu consulta y se pondrá en contacto contigo para coordinar los próximos pasos.";
const schedule = "Si indicaste una fecha o modalidad de reunión, la disponibilidad se confirmará por separado.";
const reply = "Si necesitas agregar algo, puedes responder a este correo.";
const unexpected = "Si no enviaste una consulta, puedes ignorar este mensaje.";

export type ConsultationDetails = Record<(typeof consultationFields)[number][0], string>;

function CorporateEmail({ title, preview, children }: { title: string; preview: string; children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <title>{title}</title>
        <style>{darkStyles}</style>
      </head>
      <body className="email-bg" style={{ backgroundColor: silver, fontFamily: font, margin: 0, padding: 0 }}>
        <div style={{ display: "none", maxHeight: 0, overflow: "hidden", opacity: 0, msoHide: "all" } as CSSProperties}>
          {preview}
        </div>
        <table role="presentation" width="100%" cellSpacing={0} cellPadding={0}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "24px 12px" }}>
                <table role="presentation" width="600" cellSpacing={0} cellPadding={0} style={{ width: "100%", maxWidth: 600 }}>
                  <tbody>
                    <tr>
                      <td className="email-inset" style={{ backgroundColor: navy, color: white, padding: "27px 40px", borderBottom: `3px solid ${silver}` }}>
                        <a href={site.url} style={footerLink}>
                          {/* The static PNG preserves the original logo in email clients without WebP support. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`${site.url}/assets/logo-correo-recurso-legal.png`} alt="Recurso Legal · Estudio Jurídico"
                            width="240" height="41" style={{ display: "block", width: "100%", maxWidth: 240, height: "auto", border: 0, color: white }} />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="email-content email-inset" style={{ backgroundColor: white, padding: "36px 40px 34px", color: navy, overflowWrap: "anywhere" }}>
                        <p className="email-label" style={{ color: navy, fontSize: 12, fontWeight: 700, letterSpacing: "2px", margin: "0 0 13px" }}>CONSULTA INICIAL</p>
                        <h1 className="email-heading" style={{ color: navy, fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 36, fontWeight: 400, lineHeight: "42px", margin: "0 0 21px" }}>{title}</h1>
                        {children}
                      </td>
                    </tr>
                    <tr>
                      <td className="email-inset" style={{ backgroundColor: navy, color: white, padding: "24px 40px", fontSize: 14, lineHeight: "23px" }}>
                        <strong style={{ fontSize: 15 }}>Recurso Legal · Estudio Jurídico</strong>
                        <p style={{ margin: "8px 0 12px" }}>
                          <a href={`mailto:${site.email}`} style={footerLink}>{site.email}</a><br />
                          Teléfono <a href={site.phone.href} style={footerLink}>{site.phone.number}</a><br />
                          WhatsApp <a href={site.whatsapp.href} style={footerLink}>{site.whatsapp.number}</a>
                        </p>
                        <p style={{ margin: 0, lineHeight: "28px" }}>
                          {socials.map(({ name, href }) => (
                            <a key={name} href={href} style={{ ...footerLink, display: "inline-block", marginRight: 14 }}>{name}</a>
                          ))}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

const footerText = [
  "Recurso Legal · Estudio Jurídico",
  site.email,
  `Teléfono ${site.phone.number}`,
  `WhatsApp ${site.whatsapp.number} — ${site.whatsapp.href}`,
  ...socials.map(({ name, href }) => `${name} — ${href}`),
].join("\n");

function renderEmail(element: ReactNode) {
  return `<!doctype html>${renderToStaticMarkup(element)}`;
}

export function clientConfirmation() {
  const title = "Recibimos tu consulta";
  return {
    subject: `${title} · Recurso Legal`,
    html: renderEmail(
      <CorporateEmail title={title} preview="Tu consulta llegó a Recurso Legal.">
        {[confirmation, schedule, reply, unexpected].map((paragraph) => (
          <p key={paragraph} className="email-copy" style={bodyText}>{paragraph}</p>
        ))}
      </CorporateEmail>,
    ),
    text: [title, confirmation, schedule, reply, unexpected, footerText].join("\n\n"),
  };
}

export function teamNotification(details: ConsultationDetails) {
  const title = "Nueva consulta web";
  const values = consultationFields.flatMap(([key, label]) => details[key] ? [[label, details[key]]] : []);
  const intro = "Puedes responder a este correo para comunicarte con la persona que envió la consulta.";
  return {
    subject: `${title} · Recurso Legal`,
    html: renderEmail(
      <CorporateEmail title={title} preview="Se recibió una consulta desde el sitio web.">
        <p className="email-copy" style={bodyText}>{intro}</p>
        <dl className="email-copy" style={{ ...bodyText, margin: 0 }}>
          {values.map(([label, value]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <dt style={{ fontWeight: 700 }}>{label}</dt>
              <dd style={{ margin: 0 }}>
                {value.split("\n").map((line, index) => (
                  <span key={index}>{index > 0 && <br />}{line}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </CorporateEmail>,
    ),
    text: [title, intro, values.map(([label, value]) => `${label}: ${value}`).join("\n"), footerText].join("\n\n"),
  };
}
