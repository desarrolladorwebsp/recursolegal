export const indicatorTimeZone = "America/Santiago";

export type IndicatorTables = Record<"uf" | "utm", Partial<Record<string, number>>>;

const calendar = new Intl.DateTimeFormat("sv-SE", {
  timeZone: indicatorTimeZone, year: "numeric", month: "2-digit", day: "2-digit",
});

export function chileanDate(date = new Date()) {
  return calendar.format(date);
}
