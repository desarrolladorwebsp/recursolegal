import { chileanDate, type IndicatorTables } from "../economic-indicators";
import snapshot from "./sii-indicator-snapshot.json";

const months = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const officialTables = "https://www.sii.cl/valores_y_fechas";

async function readOfficialTable(indicator: keyof IndicatorTables, year: string) {
  try {
    const response = await fetch(`${officialTables}/${indicator}/${indicator}${year}.htm`, {
      signal: AbortSignal.timeout(4_000),
    });
    return response.ok ? await response.text() : "";
  } catch {
    return "";
  }
}

function readUf(html: string, year: string) {
  const uf: IndicatorTables["uf"] = {};
  const tables = html.matchAll(/<div\b[^>]*\bid=['"]mes_([a-z]+)['"][^>]*>[\s\S]*?<table\b[^>]*>([\s\S]*?)<\/table>/gi);

  for (const [, month, table] of tables) {
    const index = months.indexOf(month.toLowerCase());
    if (index === -1) continue;

    const prefix = `${year}-${String(index + 1).padStart(2, "0")}`;
    const days = table.matchAll(/<th\b[^>]*>\s*<strong>\s*(\d{1,2})\s*<\/strong>\s*<\/th>\s*<td\b[^>]*>\s*([\d.]+,\d{2})\s*<\/td>/gi);

    for (const [, day, value] of days) {
      uf[`${prefix}-${day.padStart(2, "0")}`] = Number(value.replaceAll(".", "").replace(",", "."));
    }
  }

  return uf;
}

function readUtm(html: string, year: string) {
  const utm: IndicatorTables["utm"] = {};
  const rows = html.matchAll(/<tr\b[^>]*>\s*<th\b[^>]*>\s*([a-z]+)\s*<\/th>\s*<td\b[^>]*>\s*([\d.]+)\s*<\/td>/gi);

  for (const [, month, value] of rows) {
    const index = months.indexOf(month.toLowerCase());
    if (index === -1) continue;

    utm[`${year}-${String(index + 1).padStart(2, "0")}`] = Number(value.replaceAll(".", ""));
  }

  return utm;
}

export async function loadIndicatorTables(): Promise<IndicatorTables> {
  const year = chileanDate().slice(0, 4);
  const [ufHtml, utmHtml] = await Promise.all([
    readOfficialTable("uf", year),
    readOfficialTable("utm", year),
  ]);

  return {
    // The snapshot contains published SII values. Consumers select the exact calendar period.
    uf: { ...snapshot.uf, ...readUf(ufHtml, year) },
    utm: { ...snapshot.utm, ...readUtm(utmHtml, year) },
  };
}
