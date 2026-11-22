# Recurso Legal

Versión institucional para revisión. El sitio utiliza HTML, CSS y JavaScript nativos. Los archivos para publicar están en `public/`. El archivo local `recurso-legal-cpanel.zip` contiene únicamente esos archivos. Para generarlo desde la versión confirmada en Git, ejecuta `git archive --format=zip --output=recurso-legal-cpanel.zip HEAD:public`.

## Revisar localmente

Desde la carpeta del proyecto, ejecuta `python3 -m http.server 8765 --bind 127.0.0.1 --directory public` y abre [la vista local](http://127.0.0.1:8765/).

## Preparar la publicación

1. Sustituye los perfiles ficticios de `public/nosotros.html` por los datos autorizados del equipo.
2. Verifica los canales de contacto y confirma la dirección de Santiago antes de presentarla como oficina del estudio. El formulario de la portada es una vista previa deshabilitada. Si se activa, aprueba la información de privacidad, configura el remitente `contacto@recursolegal.cl` y comprueba el aviso al estudio y el acuse al visitante. El dominio del sitio es `recursoslegal.cl`.
3. Con el hosting elegido, habilita HTTPS para el dominio y extrae `recurso-legal-cpanel.zip` en la raíz documental del dominio en cPanel. Si haces cambios después de generar este paquete, sube los archivos actualizados de `public/`, incluido `.htaccess`, y conserva la estructura de `assets/`. Comprueba que HTTPS y los encabezados de seguridad estén activos en el servidor elegido.
4. Prueba las tres páginas, los enlaces de áreas y la reproducción del video en el dominio.

## Editar contenido

- `public/index.html` contiene la portada, contacto, ubicación y reuniones, y el directorio de áreas.
- `public/areas-legales.html` contiene las descripciones de las siete áreas. Conserva cada identificador si editas los títulos.
- `public/nosotros.html` contiene la presentación y el equipo provisional.
- `public/assets/estilos.css` contiene la paleta y los estilos compartidos.
- `public/assets/hero.mp4` es la copia optimizada del video entregado. La portada reproduce un fragmento breve sin controles y muestra una imagen fija cuando se prefiere reducir el movimiento. `portada.webp` es su imagen de respaldo y `sala.webp` es el recorte usado en Nosotros.
- `public/assets/arquitectura.webp` es una imagen arquitectónica generada para ilustrar el sitio.
- `propuestas-visuales-recurso-legal.png` contiene el mockup aprobado como referencia. Se conserva fuera de la raíz pública.
