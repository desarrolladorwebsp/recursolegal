"use client";

import type { LatLngBoundsExpression, Map as LeafletMap } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { site, sitePath } from "../lib/site";

const destination: [number, number] = [-33.45397646, -70.631850584];
const arrivalZoom = 17;
const mapImages: {
  file: `/${string}`;
  bounds: LatLngBoundsExpression;
  showFrom: number;
}[] = [
  {
    file: "/assets/ubicacion/regional.webp",
    bounds: [[-36.59788913307021, -75.9375], [-29.53522956294847, -67.5]],
    showFrom: 7,
  },
  {
    file: "/assets/ubicacion/santiago.webp",
    bounds: [[-33.578014746143985, -70.83984375], [-33.35806161277886, -70.400390625]],
    showFrom: 9,
  },
  {
    file: "/assets/ubicacion/santa-elena.webp",
    bounds: [[-33.45894275368762, -70.63934326171875], [-33.44977658311845, -70.6256103515625]],
    showFrom: 13,
  },
];

type FlightState = "waiting" | "loading" | "flying" | "arrived" | "unavailable";

export function LocationMap() {
  const panelRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [flight, setFlight] = useState(0);
  const [state, setState] = useState<FlightState>("waiting");
  const [showStreetMap, setShowStreetMap] = useState(false);
  const arrived = state === "arrived";

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (!("IntersectionObserver" in window)) {
      setFlight((current) => current || 1);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setFlight((current) => current || 1);
      observer.disconnect();
    }, { threshold: 0.25 });

    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = mapRef.current;
    if (!container || flight === 0) return;

    let disposed = false;
    let map: LeafletMap | undefined;
    setState("loading");

    async function startFlight(element: HTMLDivElement) {
      const [leaflet] = await Promise.all([
        import("leaflet"),
        ...mapImages.map(({ file }) => {
          const image = new Image();
          image.src = sitePath(file);
          return image.decode();
        }),
      ]);
      if (disposed) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const camera = leaflet.map(element, {
        attributionControl: false,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        keyboard: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        minZoom: 7,
        maxZoom: 19,
        maxBounds: mapImages[0].bounds,
        zoomAnimation: !reduceMotion,
      });
      map = camera;
      camera.setView(reduceMotion ? destination : [-33.8, -71.7], reduceMotion ? arrivalZoom : 7);

      for (const { file, bounds, showFrom } of mapImages) {
        const layer = leaflet.imageOverlay(sitePath(file), bounds, {
          alt: "",
          className: showFrom === 7 ? "" : "location-satellite-detail",
        }).addTo(camera);
        const updateOpacity = () => {
          layer.setOpacity(Math.max(0, Math.min(1, camera.getZoom() - showFrom + 1)));
        };
        updateOpacity();
        camera.on("zoom", updateOpacity);
      }

      const finish = () => {
        leaflet.circleMarker(destination, {
          className: "location-satellite-pin",
          radius: 9,
          weight: 3,
          fillOpacity: 1,
          interactive: false,
        }).addTo(camera);
        leaflet.control.zoom({ zoomInTitle: "Acercar", zoomOutTitle: "Alejar" }).addTo(camera);
        camera.dragging.enable();
        camera.keyboard.enable();
        camera.touchZoom.enable();
        camera.doubleClickZoom.enable();
        setState("arrived");
      };

      if (reduceMotion) {
        finish();
      } else {
        setState("flying");
        camera.once("moveend", finish);
        camera.flyTo(destination, arrivalZoom, { duration: 5.5 });
      }
    }

    void startFlight(container).catch(() => {
      if (disposed) return;
      map?.remove();
      map = undefined;
      setState("unavailable");
    });

    return () => {
      disposed = true;
      map?.remove();
    };
  }, [flight]);

  return (
    <>
      <div className="location-controls">
        <span className="location-chip">Santiago</span>
        <button className="location-replay" type="button" onClick={() => setFlight((current) => current + 1)}>
          Volver a localizar <span aria-hidden="true">↻</span>
        </button>
      </div>
      <article className="location-reference" ref={panelRef}>
        <figure className="location-radar" data-flight-state={state}>
          <div className="location-radar-grid" aria-hidden="true" />
          <div className="location-satellite" ref={mapRef} role="region" aria-label="Vista aérea de Santa Elena, Santiago" inert={!arrived} />
          <span role="status" className="location-flight-status">
            {state === "loading" && "Cargando fotografía aérea de Santiago…"}
            {state === "flying" && "Localizando Santa Elena, Santiago…"}
            {state === "unavailable" && "Vista aérea no disponible. Puedes consultar la ubicación en Google Maps."}
          </span>
          {(arrived || state === "flying") && (
            <div className="location-attribution">
              <a href="https://www.earthdata.nasa.gov/data/tools/gibs">NASA Earthdata</a>
              <span aria-hidden="true"> · </span>
              <a href="https://www.sectra.gob.cl/info-territorial/region-metropolitana-de-santiago/">SECTRA 2012</a>
              <span aria-hidden="true"> / </span>
              <a href="https://map.openaerialmap.org/">OpenAerialMap</a>
              <span aria-hidden="true"> · </span>
              <a href="https://creativecommons.org/licenses/by/4.0/" aria-label="Licencia Creative Commons de la fotografía aérea recortada y adaptada">CC BY 4.0</a>
            </div>
          )}
          {arrived && (
            <figcaption className="location-radar-caption">
              <strong>Recurso Legal</strong>
              <span>{site.location.address}</span>
              <small>Referencia cartográfica de Santa Elena 941</small>
              <a href={site.location.href}>Ver ubicación en Google Maps <span aria-hidden="true">↗</span></a>
            </figcaption>
          )}
        </figure>
        <div className="location-meta">
          <a href={site.location.href}>Ver ubicación en Google Maps <span aria-hidden="true">↗</span></a>
          <button type="button" aria-expanded={showStreetMap} aria-controls="ubicacion-mapa"
            onClick={() => setShowStreetMap((current) => !current)}>
            {showStreetMap ? "Ocultar mapa de calles" : "Mostrar mapa de calles"}
          </button>
        </div>
        <div id="ubicacion-mapa" hidden={!showStreetMap}>
          {showStreetMap && (
            <iframe className="location-map" title="Mapa de la ubicación de referencia en Santiago, Chile"
              src={site.location.embed} width={600} height={400} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
          )}
        </div>
      </article>
    </>
  );
}
