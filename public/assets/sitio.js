"use strict";

const socialRail = document.querySelector(".social-rail");

if (socialRail) {
  const scrollThreshold = 10;
  let lastPosition = Math.max(0, window.scrollY);

  window.addEventListener("scroll", () => {
    const position = Math.max(0, window.scrollY);
    const distance = position - lastPosition;

    if (position <= scrollThreshold) {
      socialRail.classList.remove("is-hidden");
    } else if (Math.abs(distance) >= scrollThreshold) {
      socialRail.classList.toggle("is-hidden", distance > 0);
    } else {
      return;
    }

    lastPosition = position;
  }, { passive: true });
}

const video = document.querySelector("#video-portada");

if (video) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const previewDuration = 4_800;
  let pauseTimer;

  function stopVideo() {
    window.clearTimeout(pauseTimer);
    video.pause();
  }

  // Keep autoplay short so the decorative video needs no on-screen controls.
  video.addEventListener("playing", () => {
    pauseTimer = window.setTimeout(stopVideo, previewDuration);
  }, { once: true });
  video.addEventListener("error", () => {
    stopVideo();
    video.hidden = true;
  }, { once: true });
  reducedMotion.addEventListener("change", ({ matches }) => {
    if (matches) stopVideo();
  });

  if (!reducedMotion.matches) {
    video.src = video.dataset.video;
    video.play().catch(() => { video.hidden = true; });
  }
}
