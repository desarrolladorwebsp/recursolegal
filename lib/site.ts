export const site = {
  url: "https://recursoslegal.cl",
  themeColor: "#06162c",
  email: "contacto@recursolegal.cl",
  phone: { href: "tel:+56920431512", number: "+56 9 2043 1512" },
  whatsapp: { href: "https://wa.me/56935213992", number: "+56 9 3521 3992" },
  location: {
    address: "Santa Elena 941 B, Santiago",
    href: "https://www.google.com/maps/search/?api=1&query=Santa%20Elena%20941%20B%2C%20Santiago%2C%20Chile",
    embed: "https://www.google.com/maps?q=Santa%20Elena%20941%20B%2C%20Santiago%2C%20Chile&output=embed",
  },
} as const;

export const navigation = [
  { id: "home", label: "Inicio", href: "/index.html" },
  { id: "areas", label: "Áreas de trabajo", href: "/areas-legales.html" },
  { id: "faq", label: "Preguntas frecuentes", href: "/preguntas-frecuentes.html" },
  { id: "about", label: "Nosotros", href: "/nosotros.html" },
  { id: "news", label: "Blog de noticias", href: "/noticias.html" },
  { id: "contact", label: "Contacto", href: "/index.html#contacto" },
] as const;

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/recurso-legal" },
  { name: "Instagram", href: "https://www.instagram.com/rlegal_cl/" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61596714573640" },
  { name: "YouTube", href: "https://www.youtube.com/@RecursoLegalcl" },
] as const;

export const meetingModes = [
  { label: "Reunión presencial", icon: "person" },
  { label: "Videollamada", icon: "video" },
] as const;

export function sitePath(route: `/${string}`) {
  return `${process.env.NEXT_PUBLIC_RECURSO_BASE_PATH ?? ""}${route}`;
}
