const fields = [
  ["area", "Área de consulta"],
  ["nombre", "Nombre"],
  ["correo", "Correo electrónico"],
  ["telefono", "Teléfono"],
  ["modalidad", "Modalidad de reunión"],
  ["fecha", "Fecha de preferencia"],
  ["horario", "Franja horaria"],
  ["mensaje", "Mensaje"],
] as const;

export function contactDraftUrl(recipient: string, data: FormData) {
  const lines = fields.flatMap(([name, label]) => {
    const value = data.get(name);
    return typeof value === "string" && value.trim() ? [`${label}: ${value.trim()}`] : [];
  });
  const subject = encodeURIComponent("Consulta inicial · Recurso Legal");
  const body = encodeURIComponent(lines.join("\r\n"));

  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}
