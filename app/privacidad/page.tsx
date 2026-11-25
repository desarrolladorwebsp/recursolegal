import type { Metadata } from "next";
import { ContactPanel, EditorialHeading } from "../../components/editorial";
import { SiteShell } from "../../components/site-shell";
import { site } from "../../lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo funcionan los canales de contacto y servicios externos de Recurso Legal.",
  alternates: { canonical: `${site.url}/privacidad.html` },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <SiteShell current="legal">
      <section className="editorial-section">
        <div className="wrap">
          <EditorialHeading title="Política de privacidad" intro="Información sobre el formulario de consulta, los canales de contacto y los servicios externos del sitio." />
          <div className="resource-layout">
            <div className="editorial-prose">
              <p className="editorial-note">Borrador para revisión del estudio antes de publicar.</p>
              <section>
                <h2>Formulario de consulta</h2>
                <p>Cuando envías el formulario desde el sitio, Resend transmite la consulta al estudio y envía una confirmación a la dirección que indicaste. El acuse no incluye el mensaje ni las preferencias que ingresaste. Si eliges preparar un borrador, tu proveedor de correo transmite los datos cuando tú decides enviarlo.</p>
              </section>
              <section>
                <h2>Canales de contacto</h2>
                <p>El correo, el teléfono y WhatsApp permiten comunicarse con el estudio para coordinar una primera conversación. Para ese primer contacto, comparte un resumen y reserva los documentos y datos sensibles para el canal que acuerdes con el equipo.</p>
              </section>
              <section>
                <h2>Servicios externos</h2>
                <p>La página incluye un mapa de Google Maps, valores de UF y UTM de mindicador.cl y enlaces a redes sociales y sitios oficiales. Sus servicios se rigen por las condiciones y políticas de cada proveedor.</p>
              </section>
              <section>
                <h2>Consultas sobre privacidad</h2>
                <p>Puedes escribir a <a href={`mailto:${site.email}`}>{site.email}</a>. La versión definitiva deberá identificar al responsable del tratamiento y detallar sus finalidades, destinatarios, conservación y canales de atención.</p>
              </section>
            </div>
            <ContactPanel />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
