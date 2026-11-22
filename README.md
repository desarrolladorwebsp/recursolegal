# Recurso Legal

Sitio institucional de Next.js, React y TypeScript. Next.js genera HTML estático para cPanel. El dominio del sitio es `recursoslegal.cl` y el correo es `contacto@recursolegal.cl`.

## Desarrollo local

Con Node.js 22 o posterior y npm instalados, ejecuta `npm ci` y `npm run dev`. La vista local abre en [localhost:3000](http://localhost:3000/).

Usa `npm run typecheck` para comprobar los tipos y `npm run build` para generar `out/`. Para revisar la exportación sin Next.js, sirve `out/` con `python3 -m http.server 8765 --bind 127.0.0.1 --directory out`.

## Publicación en cPanel

1. Reemplaza los perfiles ficticios por los datos autorizados del equipo y confirma los contactos y la dirección.
2. Ejecuta `npm run package:cpanel` para regenerar el ZIP local. Este comando requiere la utilidad `zip`. Extrae el archivo en la raíz documental del dominio, con HTTPS habilitado. El hosting solo necesita servir archivos estáticos.
3. Conserva `.htaccess`, que se genera durante la compilación para aplicar los encabezados de seguridad. Tras la publicación, revisa Inicio, Áreas legales, Nosotros, Preguntas frecuentes, Noticias, el mapa y los canales de contacto.

La exportación conserva las rutas `/index.html`, `/areas-legales.html`, `/nosotros.html`, `/preguntas-frecuentes.html`, `/noticias.html`, `/privacidad.html` y `/normativas.html`. Las guías tienen sus propias rutas en `/noticias/`.

El formulario abre un borrador en la aplicación de correo del visitante. La agenda recoge preferencias de fecha y horario para ese borrador. El estudio confirma la disponibilidad por contacto. El mapa se carga desde Google Maps y los indicadores de mindicador.cl, con enlace al SII.

Privacidad y aviso legal son borradores para revisar antes de publicar. Las reseñas quedan pendientes de vincular al perfil oficial del estudio.

## Dónde editar

- `app/` contiene las páginas y sus metadatos. `app/globals.css` contiene la paleta, tipografía y estilos compartidos.
- `components/` contiene el encabezado, pie, accesos móviles, tarjetas, formulario, mapa y comportamiento visual.
- `lib/content.ts` contiene áreas y perfiles. `lib/resources.ts` contiene preguntas, guías, organismos y las etapas del caso ficticio. `lib/site.ts` contiene el dominio, contactos, ubicación y redes.
- `public/assets/` contiene el video, imágenes WebP y las fuentes WOFF2 con sus licencias. El video de portada contiene un fragmento breve y respeta la preferencia de reducir movimiento.
- `propuestas-visuales-recurso-legal.png` contiene el mockup de referencia.

## Paleta aprobada

La primera propuesta de la lámina `propuestas-acento-recurso-legal.png` es **Azul acero `#8EACC8`**. Se usa en botones principales y estados activos, con texto azul marino `#0B1E33`. Sobre fondos claros se reserva también para líneas decorativas. Los colores base son azul marino `#0B1E33`, plata `#DAE3EC` y marfil `#F8F6F2`.
