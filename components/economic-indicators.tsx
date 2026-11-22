"use client";

import { useEffect, useRef, useState } from "react";

const officialValues = "https://www.sii.cl/valores_y_fechas/index_valores_y_fechas.html";
const endpoint = "https://mindicador.cl/api";
const indicators = [
  { key: "uf", name: "UF", decimals: 2, dateOptions: { day: "numeric", month: "short", year: "numeric" } },
  { key: "utm", name: "UTM", decimals: 0, dateOptions: { month: "long", year: "numeric" } },
] as const;

type Indicator = { valor: number; fecha: string };
type Series = Partial<Record<(typeof indicators)[number]["key"], Indicator>>;

function readSeries(data: unknown): Series {
  if (!data || typeof data !== "object") return {};
  const source = data as Record<string, Partial<Indicator> | undefined>;
  const series: Series = {};

  for (const { key } of indicators) {
    const metric = source[key];
    if (typeof metric?.valor === "number" && Number.isFinite(metric.valor) && metric.valor > 0 &&
        typeof metric.fecha === "string" && Number.isFinite(Date.parse(metric.fecha))) {
      series[key] = { valor: metric.valor, fecha: metric.fecha };
    }
  }
  return series;
}

export function EconomicIndicators() {
  const block = useRef<HTMLElement>(null);
  const [series, setSeries] = useState<Series | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let timer: number | undefined;
    let active = true;

    async function load() {
      timer = window.setTimeout(() => controller.abort(), 6_000);
      try {
        const response = await fetch(endpoint, { signal: controller.signal, credentials: "omit" });
        if (!response.ok) throw new Error("Indicadores no disponibles");
        const data = readSeries(await response.json());
        if (active) setSeries(data);
      } catch {
        if (active) setSeries({});
      } finally {
        window.clearTimeout(timer);
      }
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
      controller.abort();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className="footer-indicators" ref={block} aria-labelledby="indicadores-titulo">
      <h2 id="indicadores-titulo">Indicadores económicos</h2>
      <dl className="indicator-grid">
        {indicators.map(({ key, name, decimals, dateOptions }) => {
          const metric = series?.[key];
          return (
            <div key={key}>
              <dt>{name}</dt>
              <dd>{metric ? new Intl.NumberFormat("es-CL", {
                style: "currency", currency: "CLP", minimumFractionDigits: decimals, maximumFractionDigits: decimals,
              }).format(metric.valor) : series === null ? "—" : "No disponible"}</dd>
              {metric ? (
                <dd><time dateTime={metric.fecha}>{new Intl.DateTimeFormat("es-CL", {
                  ...dateOptions, timeZone: "America/Santiago",
                }).format(new Date(metric.fecha))}</time></dd>
              ) : null}
            </div>
          );
        })}
      </dl>
      <a href={officialValues}>Consultar valores oficiales <span aria-hidden="true">↗</span></a>
      <p>Fuente automática: mindicador.cl</p>
    </section>
  );
}
