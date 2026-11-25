import { practices } from "../lib/content";
import { consultationFields, otherConsultationArea, meetingTimeSlots } from "../lib/contact-draft";
import { clientConfirmation, teamNotification, type ConsultationDetails } from "../lib/server/consultation-email";
import { meetingModes, site } from "../lib/site";

const maxBodyBytes = 12_000;
const fieldLengths = {
  area: 100, nombre: 100, correo: 200, telefono: 40, mensaje: 800,
  modalidad: 30, fecha: 10, horario: 10,
} satisfies Record<keyof ConsultationDetails, number>;
const areas = new Set<string>([...practices.map(({ title }) => title), otherConsultationArea]);
const emailPattern = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;
const requestIdPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const rateWindowMs = 15 * 60_000;
const attempts = new Map<string, { count: number; expires: number }>();

function respond(status: number, code: string, headers?: Record<string, string>) {
  return Response.json({ code }, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function originAllowed(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (origin === site.url || origin === "https://www.recursolegal.cl") return true;
  if (process.env.VERCEL === "1") {
    return Boolean(process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL &&
      origin === `https://${process.env.VERCEL_URL}`);
  }
  const url = new URL(request.url);
  return (url.hostname === "localhost" || url.hostname === "127.0.0.1") && origin === url.origin;
}

async function readBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get("content-length")) > maxBodyBytes) throw new RangeError();
  if (!request.body) throw new SyntaxError();
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let length = 0;
  let payload = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxBodyBytes) {
      await reader.cancel();
      throw new RangeError();
    }
    payload += decoder.decode(value, { stream: true });
  }
  return JSON.parse(payload + decoder.decode());
}

function readDetails(raw: Record<string, unknown>): ConsultationDetails | null {
  const details = {} as ConsultationDetails;
  for (const [key] of consultationFields) {
    const value = raw[key] ?? "";
    if (typeof value !== "string" || value.length > fieldLengths[key]) return null;
    const normalized = value.replace(/\r\n?/g, "\n").trim();
    const allowedWhitespace = key === "mensaje" ? normalized.replace(/[\n\t]/g, "") : normalized;
    if (/[\x00-\x1f\x7f]/.test(allowedWhitespace)) return null;
    details[key] = normalized;
  }

  if (!details.nombre || !emailPattern.test(details.correo) || !areas.has(details.area)) return null;
  if (details.modalidad && !meetingModes.some(({ label }) => label === details.modalidad)) return null;
  if (details.horario && !meetingTimeSlots.some((slot) => slot === details.horario)) return null;
  if (details.fecha && (!/^\d{4}-\d{2}-\d{2}$/.test(details.fecha) || !Number.isFinite(Date.parse(details.fecha)) ||
    new Date(details.fecha).toISOString().slice(0, 10) !== details.fecha)) return null;
  return details;
}

function limitReached(request: Request, email: string) {
  const client = request.headers.get("x-vercel-forwarded-for") ?? "local";
  const now = Date.now();
  for (const [key, attempt] of attempts) {
    if (attempt.expires <= now) attempts.delete(key);
  }
  const limits = [[`ip:${client}`, 6], [`email:${email.toLowerCase()}`, 3]] as const;
  if (attempts.size >= 10_000 || limits.some(([key, limit]) => (attempts.get(key)?.count ?? 0) >= limit)) return true;

  for (const [key] of limits) {
    const attempt = attempts.get(key);
    if (attempt) attempt.count++;
    else attempts.set(key, { count: 1, expires: now + rateWindowMs });
  }
  return false;
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") return respond(405, "method_not_allowed", { Allow: "POST" });
    if (!originAllowed(request)) return respond(403, "origin_not_allowed");
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("content-type") ?? "")) {
      return respond(415, "invalid_content_type");
    }

    let data: unknown;
    try {
      data = await readBody(request);
    } catch (error) {
      return error instanceof RangeError ? respond(413, "too_large") : respond(400, "invalid_submission");
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) return respond(400, "invalid_submission");
    const raw = data as Record<string, unknown>;
    if (raw.website || typeof raw.requestId !== "string" || !requestIdPattern.test(raw.requestId)) {
      return respond(400, "invalid_submission");
    }

    const details = readDetails(raw);
    if (!details) return respond(400, "invalid_submission");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return respond(503, "mail_unavailable");
    if (limitReached(request, details.correo)) {
      return respond(429, "try_later", { "Retry-After": String(rateWindowMs / 1000) });
    }

    const from = process.env.RESEND_FROM_EMAIL || `Recurso Legal <${site.email}>`;
    try {
      const result = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `recurso-legal-consultation/${raw.requestId}`,
        },
        body: JSON.stringify([
          { ...teamNotification(details), from, to: [site.email], reply_to: details.correo },
          { ...clientConfirmation(), from, to: [details.correo], reply_to: site.email },
        ]),
        signal: AbortSignal.timeout(10_000),
      });

      if (result.ok) {
        const receipt = await result.json();
        if (Array.isArray(receipt?.data) && receipt.data.length === 2 &&
          receipt.data.every((email: { id?: string } | null) => typeof email?.id === "string")) return respond(200, "accepted");
      }
      // Log only the provider status. A response body can contain private form data.
      console.error("Resend consultation batch failed", result.status);
    } catch {
      console.error("Resend consultation batch could not be confirmed");
    }
    return respond(502, "delivery_unconfirmed");
  },
};
