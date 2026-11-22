"use client";

import { useEffect } from "react";

export function SiteEffects() {
  useEffect(() => {
    const header = document.querySelector(".site-header");
    const socialRail = document.querySelector(".social-rail");
    const menu = document.querySelector<HTMLDetailsElement>(".site-menu");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const threshold = 10;
    let lastPosition = Math.max(0, window.scrollY);

    function updateNavigation() {
      const position = Math.max(0, window.scrollY);
      const distance = position - lastPosition;
      header?.classList.toggle("is-scrolled", position > threshold);

      if (position <= threshold) {
        socialRail?.classList.remove("is-hidden");
      } else if (Math.abs(distance) >= threshold) {
        socialRail?.classList.toggle("is-hidden", distance > 0);
      } else {
        return;
      }

      lastPosition = position;
    }

    function closeMenuOnNavigation(event: MouseEvent) {
      if (menu && event.target instanceof Element && event.target.closest("a")) menu.open = false;
    }

    function closeMenuOnEscape(event: KeyboardEvent) {
      if (!menu?.open || event.key !== "Escape") return;
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }

    menu?.addEventListener("click", closeMenuOnNavigation);
    menu?.addEventListener("keydown", closeMenuOnEscape);
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window && !reducedMotion.matches) {
      observer = new IntersectionObserver((entries, source) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          source.unobserve(entry.target);
        }
      }, { threshold: 0.12 });

      for (const target of document.querySelectorAll("[data-reveal]")) {
        if (target.getBoundingClientRect().top >= window.innerHeight) observer.observe(target);
      }
    }

    return () => {
      window.removeEventListener("scroll", updateNavigation);
      menu?.removeEventListener("click", closeMenuOnNavigation);
      menu?.removeEventListener("keydown", closeMenuOnEscape);
      observer?.disconnect();
    };
  }, []);

  return null;
}
