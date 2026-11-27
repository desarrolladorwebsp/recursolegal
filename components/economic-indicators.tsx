"use client";

import { useEffect, useRef, useState } from "react";
import { chileanDate, indicatorTimeZone, type IndicatorTables } from "../lib/economic-indicators";
import { sitePath } from "../lib/site";

const officialValues = "https://www.sii.cl/valores_y_fechas/index_valores_y_fechas.html";
const staticEndpoint = sitePath("/indicadores.json");
const liveEndpoint = process.env.NEXT_PUBLIC_RECURSO_INDICATORS_ENDPOINT;
const endpoints = liveEndpoint ? [liveEndpoint, staticEndpoint] : [staticEndpoint];
const indicators = [
  { key: "uf", name: "UF · diaria", decimals: 2, dateOptions: { day: "numeric", month: "short", year: "numeric" } },
  { key: "utm", name: "UTM · mensual", decimals: 0, dateOptions: { month: "long", year: "numeric" } },
] as const;

type Indicator = { value: number; date: string };
type Series = Partial<Record<(typeof indicators)[number]["key"], Indicator>>;

function readSeries(data: unknown): Series {
  if (!data || typeof data !== "object") return {};
  const tables = data as Partial<IndicatorTables>;
  const today = chileanDate();
  const series: Series = {};

  for (const { key } of indicators) {
    const period = key === "uf" ? today : today.slice(0, 7);
    const value = tables[key]?.[period];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      series[key] = { value, date: period };
    }
  }
  return series;
}

export function EconomicIndicators() {
  const block = useRef<HTMLElement>(null);
  const [series, setSeries] = useState<Series | null>(null);

  useEffect(() => {
    let request: AbortController | undefined;
    let active = true;

    async function load() {
      let current: Series = {};

      for (const endpoint of endpoints) {
        if (!active) return;
        const controller = new AbortController();
        request = controller;
        const timeout = window.setTimeout(() => controller.abort(), 7_000);
        try {
          const response = await fetch(endpoint, { signal: controller.signal });
          if (response.ok) current = { ...readSeries(await response.json()), ...current };
        } catch {
          // The exported table can still supply values if the live request fails.
        } finally {
          window.clearTimeout(timeout);
        }
        if (current.uf && current.utm) break;
      }

      if (active) setSeries(current);
    }

    const element = block.current;
    let observer: IntersectionObserver | undefined;
    if (element && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (!entries.some(({ isIntersecting }) => isIntersecting)) return;
        observer?.disconnect();
        void load();
      }, { rootMargin: "160px" });
      observer.observe(element);
    } else {
      void load();
    }

    return () => {
      active = false;
      observer?.disconnect();
      request?.abort();
    };
  }, []);

  return (
    <section className="footer-indicators" ref={block} aria-labelledby="indicadores-titulo">
      <h2 id="indicadores-titulo">Indicadores económicos</h2>
      <dl className="indicator-grid">
        {indicators.map(({ key, name, decimals, dateOptions }) => {
          const metric = series?.[key];
          const date = metric && new Date(`${metric.date}${key === "utm" ? "-01" : ""}T12:00:00Z`);
          return (
            <div key={key}>
              <dt>{name}</dt>
              <dd>{metric ? new Intl.NumberFormat("es-CL", {
                style: "currency", currency: "CLP", minimumFractionDigits: decimals, maximumFractionDigits: decimals,
              }).format(metric.value) : series === null ? "—" : "No disponible"}</dd>
              {metric && date ? (
                <dd><time dateTime={metric.date}>{new Intl.DateTimeFormat("es-CL", {
                  ...dateOptions, timeZone: indicatorTimeZone,
                }).format(date)}</time></dd>
              ) : null}
            </div>
          );
        })}
      </dl>
      <a href={officialValues}>Consultar valores oficiales <span aria-hidden="true">↗</span></a>
      <p>Fuente oficial: Servicio de Impuestos Internos</p>
    </section>
  );
}
