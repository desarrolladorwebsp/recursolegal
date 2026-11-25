# Recurso Legal

Sitio institucional de Next.js, React y TypeScript. Next.js genera HTML estático para Vercel y cPanel. El dominio del sitio es `recursolegal.cl` y el correo es `contacto@recursolegal.cl`.

## Desarrollo local

Con Node.js 22 o posterior y npm instalados, ejecuta `npm ci` y `npm run dev`. La vista local abre en [localhost:3000](http://localhost:3000/).

Usa `npm run typecheck` para comprobar los tipos y `npm run build` para generar `out/`. Para revisar la exportación sin Next.js, sirve `out/` con `python3 -m http.server 8765 --bind 127.0.0.1 --directory out`.

## Publicación en cPanel

1. Confirma los datos de contacto y la dirección antes de trasladar el sitio a otro alojamiento.
2. Ejecuta `npm run package:cpanel` para regenerar el ZIP local. Este comando requiere la utilidad `zip`. Extrae el archivo en la raíz documental del dominio, con HTTPS habilitado. El hosting solo necesita servir archivos estáticos.
3. Conserva `.htaccess`, que se genera durante la compilación para aplicar los encabezados de seguridad. Tras la publicación, revisa Inicio, Áreas legales, Nosotros, Preguntas frecuentes, Noticias, el mapa y los canales de contacto.

La exportación conserva las rutas `/index.html`, `/areas-legales.html`, `/nosotros.html`, `/preguntas-frecuentes.html`, `/noticias.html`, `/privacidad.html` y `/normativas.html`. Las guías tienen sus propias rutas en `/noticias/`.

En cPanel se usa el botón «Preparar un borrador en mi correo». La agenda puede incluir preferencias de fecha y horario. El estudio confirma la disponibilidad por contacto. El mapa se carga desde Google Maps y los indicadores de mindicador.cl, con enlace al SII.

Privacidad y aviso legal son borradores para revisar antes de publicar. Las reseñas quedan pendientes de vincular al perfil oficial del estudio.

## Dónde editar

- `app/` contiene las páginas y sus metadatos. `app/globals.css` contiene la paleta, tipografía y estilos compartidos.
- `components/` contiene el encabezado, pie, accesos móviles, tarjetas, formulario, mapa y comportamiento visual.
- `lib/content.ts` contiene áreas y perfiles. `lib/resources.ts` contiene preguntas, guías, organismos y las etapas del caso ficticio. `lib/site.ts` contiene el dominio, contactos, ubicación y redes.
- `public/assets/` contiene el video, imágenes WebP y las fuentes WOFF2 con sus licencias. El video de portada contiene un fragmento breve y respeta la preferencia de reducir movimiento.
- `propuestas-visuales-recurso-legal.png` contiene el mockup de referencia.

## Paleta aprobada

La primera propuesta de la lámina `propuestas-acento-recurso-legal.png` es **Azul acero `#8EACC8`**. Se usa en botones principales y estados activos, con texto azul marino `#0B1E33`. Sobre fondos claros se reserva también para líneas decorativas. Los colores base son azul marino `#0B1E33`, plata `#DAE3EC` y marfil `#F8F6F2`.

## Vista previa antes de publicar

Ejecuta `npm run preview:build -- NNNNNN` con un código de seis dígitos para abrir la revisión en `/mockup-NNNNNN/`. Si omites el código, el comando generará uno. La exportación queda en `out-preview/` y el paquete en `recurso-legal-vista-previa.zip`. Para probarla localmente, sirve `out-preview/` con un servidor HTTP.

Ese paquete muestra únicamente «De momento no muestres más nada» en la raíz. El sitio completo se puede recorrer desde el enlace de revisión, que no se anuncia en la portada y lleva instrucciones para excluirlo de buscadores. El código de seis dígitos no es una contraseña. Para restringir el acceso, protege la carpeta de revisión con autenticación en cPanel.

## Publicación en Vercel

La rama `main` despliega el sitio completo en [recursolegal.cl](https://recursolegal.cl/). Vercel ejecuta `npm run build` y sirve la exportación estática de `out/`. Los enlaces de la antigua vista de revisión redirigen a las páginas públicas correspondientes.

### Correo del formulario

- Vercel ejecuta `api/consultation.ts` en el servidor. El sitio sigue siendo una exportación estática. `npm run dev` sirve el sitio, y el entorno de desarrollo de Vercel permite probar también la función.
- Define `RESEND_API_KEY` como variable sensible en el entorno de Vercel que corresponda. Usa una clave de solo envío del dominio verificado. Para desarrollo local, guarda la clave en `.env.local`, excluido de Git.
- Por defecto el remitente es `Recurso Legal <contacto@recursolegal.cl>`. Si la cuenta de Resend usa otro dominio verificado, define `RESEND_FROM_EMAIL` con el nombre y la dirección de envío autorizados. El buzón del estudio y la respuesta del acuse siguen siendo `contacto@recursolegal.cl`.
- Una solicitud genera dos mensajes independientes. El estudio recibe los datos y puede responder al visitante. El visitante recibe un acuse con el pie corporativo y puede responder al estudio. Resend deduplica reintentos de la misma solicitud durante 24 horas.
- Las plantillas están en `lib/server/consultation-email.tsx`. El logo PNG se sirve desde el sitio público. Mantén su URL disponible y comprueba el aspecto en las aplicaciones de correo antes de habilitar el envío en producción.
