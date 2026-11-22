"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!video || motion.matches) return;

    let active = true;

    function stopOnReducedMotion(event: MediaQueryListEvent) {
      if (event.matches) videoRef.current?.pause();
    }

    motion.addEventListener("change", stopOnReducedMotion);
    video.src = "/assets/hero.mp4";
    void video.play().catch(() => {
      if (active) video.hidden = true;
    });

    return () => {
      active = false;
      video.pause();
      motion.removeEventListener("change", stopOnReducedMotion);
    };
  }, []);

  return <video ref={videoRef} className="hero-video" poster="/assets/portada.webp" preload="none" muted playsInline aria-hidden="true" />;
}
